import { requireUser } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { fail, ok, readJson } from "@/lib/server/response";

type Body = {
  serviceId?: string;
  packageId?: string;
  addressId?: string;
  address?: {
    label?: string;
    fullAddress?: string;
    city?: string;
    district?: string;
    notes?: string;
  };
  bookingDate?: string;
  bookingTime?: string;
  paymentMethod?: string;
  addOns?: { addOnId?: string; name?: string; quantity?: number }[];
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
  if (!body.serviceId || !body.packageId || !body.bookingDate || !body.bookingTime || !body.paymentMethod) return fail("Data booking belum lengkap.");

  const service = await prisma.service.findFirst({ where: { OR: [{ id: body.serviceId }, { slug: body.serviceId }], isActive: true } });
  if (!service) return fail("Layanan tidak ditemukan.", 404);

  const pkg = await prisma.servicePackage.findFirst({
    where: {
      serviceId: service.id,
      isActive: true,
      OR: [
        { id: body.packageId },
        { id: `${service.slug}-${body.packageId}` },
        { name: body.packageId },
      ],
    },
  });
  if (!pkg) return fail("Paket tidak ditemukan.", 404);

  let addressId = body.addressId;
  if (!addressId && body.address?.fullAddress) {
    const address = await prisma.address.create({
      data: {
        userId: auth.user.id,
        label: body.address.label ?? "Alamat booking",
        recipientName: auth.user.name,
        phone: auth.user.phone,
        fullAddress: body.address.fullAddress,
        city: body.address.city,
        district: body.address.district,
        notes: body.address.notes,
      },
    });
    addressId = address.id;
  }
  if (!addressId) {
    const address = await prisma.address.findFirst({ where: { userId: auth.user.id }, orderBy: { isDefault: "desc" } });
    if (!address) return fail("Alamat belum tersedia.");
    addressId = address.id;
  }

  const addOnIds = body.addOns?.map((item) => item.addOnId).filter(Boolean) as string[] | undefined;
  const addOnNames = body.addOns?.map((item) => item.name).filter(Boolean) as string[] | undefined;
  const addOns = body.addOns?.length
    ? await prisma.addOn.findMany({
      where: {
        serviceId: service.id,
        isActive: true,
        OR: [
          ...(addOnIds?.length ? [{ id: { in: addOnIds } }] : []),
          ...(addOnNames?.length ? [{ name: { in: addOnNames } }] : []),
        ],
      },
    })
    : [];
  const addOnTotal = addOns.reduce((sum, item) => sum + Number(item.price), 0);
  const subtotal = Number(pkg.price) + addOnTotal;

  const order = await prisma.order.create({
    data: {
      orderCode: `ORD-${Date.now()}`,
      customerId: auth.user.id,
      serviceId: service.id,
      packageId: pkg.id,
      addressId,
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
    include: { service: true, package: true, addOns: true, payments: true, address: true, customer: true, worker: true },
  });
  return ok(order, { status: 201 });
}
