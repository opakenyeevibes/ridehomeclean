import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";

type Body = {
  serviceId?: string;
  packageId?: string;
  addressId?: string;
  bookingDate?: string;
  bookingTime?: string;
  paymentMethod?: string;
  addOns?: { addOnId: string; quantity?: number }[];
  promoCode?: string;
  customerNotes?: string;
};

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const where = auth.user.role === "admin" ? {} : auth.user.role === "worker" ? { workerId: auth.user.id } : { customerId: auth.user.id };
  return ok(await prisma.order.findMany({ where, orderBy: { createdAt: "desc" }, include: { service: true, package: true, address: true, worker: true, addOns: true } }));
}

export async function POST(request: Request) {
  const auth = await requireUser(["customer", "admin"]);
  if ("error" in auth) return auth.error;
  const body = await readJson<Body>(request);
  if (!body.serviceId || !body.packageId || !body.addressId || !body.bookingDate || !body.bookingTime || !body.paymentMethod) return fail("Data booking belum lengkap.");

  const pkg = await prisma.servicePackage.findUnique({ where: { id: body.packageId } });
  if (!pkg) return fail("Paket tidak ditemukan.", 404);
  const addOns = body.addOns?.length ? await prisma.addOn.findMany({ where: { id: { in: body.addOns.map((item) => item.addOnId) } } }) : [];
  const addOnTotal = addOns.reduce((sum, item) => sum + Number(item.price), 0);
  const subtotal = Number(pkg.price) + addOnTotal;

  const order = await prisma.order.create({
    data: {
      orderCode: `ORD-${Date.now()}`,
      customerId: auth.user.id,
      serviceId: body.serviceId,
      packageId: body.packageId,
      addressId: body.addressId,
      status: "created",
      bookingDate: new Date(body.bookingDate),
      bookingTime: body.bookingTime,
      paymentMethod: body.paymentMethod,
      subtotal,
      discount: 0,
      totalPrice: subtotal + 5000,
      promoCode: body.promoCode,
      customerNotes: body.customerNotes,
      addOns: { create: addOns.map((item) => ({ addOnId: item.id, name: item.name, price: item.price, quantity: body.addOns?.find((selected) => selected.addOnId === item.id)?.quantity ?? 1 })) },
      statusLogs: { create: { status: "created", note: "Pesanan dibuat", changedByUserId: auth.user.id } },
      payments: { create: { paymentMethod: body.paymentMethod, paymentStatus: "unpaid", amount: subtotal + 5000 } },
    },
    include: { service: true, package: true, addOns: true, payments: true },
  });
  return ok(order, { status: 201 });
}
