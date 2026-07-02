import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const packageTemplates = [
  { id: "basic", name: "Basic Care", multiplier: 1, duration: "2 jam", description: "Perawatan ringan untuk kebutuhan rutin sehari-hari.", features: ["Area utama dirawat", "Debu dan kotoran ringan", "Perapian dasar"] },
  { id: "fresh", name: "Fresh Care", multiplier: 1.55, duration: "3 jam", description: "Perawatan lebih menyeluruh agar area terasa segar dan nyaman.", features: ["Semua layanan Basic Care", "Area detail prioritas", "Finishing dan pengecekan"] },
  { id: "deep", name: "Deep Care", multiplier: 2.1, duration: "4–5 jam", description: "Perawatan mendalam untuk sudut dan noda yang jarang tersentuh.", features: ["Semua layanan Fresh Care", "Noda membandel", "Detail furnitur dan sudut"] },
  { id: "premium", name: "Premium Care", multiplier: 2.65, duration: "5–6 jam", description: "Layanan prioritas dengan partner berpengalaman dan hasil maksimal.", features: ["Semua layanan Deep Care", "Partner prioritas", "Pengecekan hasil menyeluruh"] },
  { id: "custom", name: "Custom Care", multiplier: 3.2, duration: "Sesuai kebutuhan", description: "Paket fleksibel yang disesuaikan dengan kebutuhan lokasimu.", features: ["Konsultasi kebutuhan", "Ruang lingkup fleksibel", "Estimasi transparan"] },
];

const serviceSeed = [
  ["home-cleaning", "Home Care", "Home Care", "house", 75000, "2–3 jam", "Layanan bersih rumah panggilan dari Ride N Care. Partner datang ke lokasi kamu untuk membantu rumah terasa lebih rapi, bersih, dan nyaman."],
  ["room-cleaning", "Kamar", "Home Care", "bed", 45000, "1–2 jam", "Perawatan kamar panggilan untuk membantu membersihkan debu, merapikan area tidur, dan membuat kamar terasa lebih nyaman."],
  ["bathroom", "Kamar Mandi", "Home Care", "bath", 55000, "1–2 jam", "Perawatan kamar mandi untuk membersihkan kerak ringan, lantai, dinding, dan area sanitasi agar kembali segar dan nyaman digunakan."],
  ["garden", "Outdoor", "Outdoor Care", "leaf", 85000, "2–3 jam", "Layanan bersih area luar rumah seperti halaman, teras, taman kecil, dan area sekitar rumah."],
  ["car-wash", "Auto Care", "Auto Care", "car", 65000, "60–90 mnt", "Layanan perawatan kendaraan panggilan. Partner Ride N Care datang ke lokasi kamu untuk membersihkan mobil atau motor sesuai paket yang dipilih."],
  ["bike-wash", "Motor Care", "Auto Care", "bike", 30000, "45 mnt", "Layanan perawatan motor ringan di lokasi kamu, mulai dari pencucian bodi hingga perapian area kendaraan."],
  ["deep-clean", "Deep Clean", "Premium Care", "sparkles", 225000, "4–6 jam", "Perawatan mendalam untuk rumah atau ruang yang membutuhkan penanganan detail, termasuk sudut dan noda yang jarang tersentuh."],
  ["office", "Office Care", "Office Care", "building", 275000, "4–6 jam", "Layanan care untuk kantor, toko, studio, atau ruang usaha kecil agar tetap rapi, bersih, dan nyaman digunakan."],
  ["premium", "Premium", "Premium Care", "crown", 350000, "6–8 jam", "Layanan prioritas untuk kebutuhan deep cleaning, request khusus, dan jadwal fleksibel."],
  ["custom", "Custom", "Premium Care", "sliders", 50000, "Sesuai kebutuhan", "Ceritakan kebutuhan khususmu dan tim Ride N Care akan membantu menyusun ruang lingkup layanan yang paling sesuai."],
] as const;

async function upsertUser({ email, role, name, phone }: { email: string; role: UserRole; name: string; phone: string }) {
  const passwordHash = await bcrypt.hash(role === "admin" ? "Admin12345!" : "Password123!", 12);
  return prisma.user.upsert({
    where: { email },
    update: { name, phone, role, passwordHash, status: "active" },
    create: { email, role, name, phone, passwordHash, status: "active" },
  });
}

async function main() {
  const admin = await upsertUser({ email: "admin@ridencare.local", role: "admin", name: "Admin Ride N Care", phone: "081234567892" });
  const customerA = await upsertUser({ email: "alya@example.com", role: "customer", name: "Alya Putri", phone: "081234567890" });
  const customerB = await upsertUser({ email: "raka@example.com", role: "customer", name: "Raka Pratama", phone: "081298765432" });

  for (const customer of [customerA, customerB]) {
    const address = await prisma.address.upsert({
      where: { id: `${customer.id}-default-address` },
      update: {},
      create: {
        id: `${customer.id}-default-address`,
        userId: customer.id,
        label: "Rumah",
        recipientName: customer.name,
        phone: customer.phone,
        fullAddress: customer.id === customerA.id ? "Jl. Siliwangi No. 28, Cianjur, Jawa Barat" : "Jl. Pasir Gede Raya, Cianjur, Jawa Barat",
        city: "Cianjur",
        district: "Cianjur",
        isDefault: true,
      },
    });
    await prisma.customerProfile.upsert({
      where: { userId: customer.id },
      update: { defaultAddressId: address.id },
      create: { userId: customer.id, defaultAddressId: address.id },
    });
  }

  const workers = await Promise.all([
    upsertUser({ email: "budi@partner.test", role: "worker", name: "Budi Santoso", phone: "081234567891" }),
    upsertUser({ email: "dewi@partner.test", role: "worker", name: "Dewi Anggraini", phone: "081377712345" }),
    upsertUser({ email: "rizky@partner.test", role: "worker", name: "Rizky Firmansyah", phone: "082112348765" }),
    upsertUser({ email: "sinta@partner.test", role: "worker", name: "Sinta Maharani", phone: "085712340987" }),
    upsertUser({ email: "agus@partner.test", role: "worker", name: "Agus Prasetyo", phone: "082200001111" }),
  ]);

  for (const [index, worker] of workers.entries()) {
    await prisma.workerProfile.upsert({
      where: { userId: worker.id },
      update: {},
      create: {
        userId: worker.id,
        skills: index < 2 ? ["Home Care", "Deep Clean"] : index === 2 ? ["Auto Care", "Motor Care"] : ["Premium Care", "Office Care"],
        status: index === 3 ? "offline" : "available",
        rating: 4.8 + index * 0.02,
        completedJobs: 100 + index * 45,
        earningsTotal: 15000000 + index * 3250000,
        verifiedAt: new Date(),
      },
    });
  }

  for (const [index, [slug, name, category, icon, price, duration, description]] of serviceSeed.entries()) {
    const service = await prisma.service.upsert({
      where: { slug },
      update: { name, category, icon, startingPrice: price, duration, description, isActive: true, sortOrder: index + 1 },
      create: { slug, name, category, icon, startingPrice: price, duration, description, isActive: true, sortOrder: index + 1, rating: 4.8, totalReviews: 428 + index * 88 },
    });

    for (const [packageIndex, template] of packageTemplates.entries()) {
      await prisma.servicePackage.upsert({
        where: { id: `${slug}-${template.id}` },
        update: {},
        create: {
          id: `${slug}-${template.id}`,
          serviceId: service.id,
          name: template.name,
          description: template.description,
          price: Math.round(price * template.multiplier),
          duration: template.duration,
          includes: template.features,
          isActive: true,
          sortOrder: packageIndex + 1,
        },
      });
    }

    for (const [addOnIndex, addOn] of ["Care kulkas", "Care pakaian", "Care balkon / teras"].entries()) {
      await prisma.addOn.upsert({
        where: { id: `${slug}-addon-${addOnIndex + 1}` },
        update: {},
        create: { id: `${slug}-addon-${addOnIndex + 1}`, serviceId: service.id, name: addOn, description: "Layanan tambahan sesuai kebutuhan.", price: 20000 + addOnIndex * 5000, isActive: true },
      });
    }
  }

  await prisma.promo.upsert({
    where: { code: "CARE25" },
    update: {},
    create: { code: "CARE25", title: "Care datang langsung ke lokasi kamu", description: "Diskon 25% untuk layanan pertama.", discountType: "percentage", discountValue: 25, maxDiscount: 50000, minOrder: 50000, isActive: true },
  });

  await prisma.banner.upsert({
    where: { id: "default-main-banner" },
    update: {},
    create: { id: "default-main-banner", internalTitle: "Homepage Main Promo - First Care", bannerType: "main_banner", mode: "template", isActive: true, sortOrder: 1, badgeText: "FIRST CARE", headline: "Care datang langsung ke lokasi kamu", description: "Diskon 25% untuk layanan pertama.", ctaLabel: "Pakai Promo", ctaLink: "/services/home-cleaning", promoCode: "CARE25", helperText: "Berlaku untuk customer baru.", icon: "sparkles", accentStyle: "coral", templateVariant: "promo" },
  });
  await prisma.banner.upsert({
    where: { id: "default-side-banner" },
    update: {},
    create: { id: "default-side-banner", internalTitle: "Side Trust Card - Partner Terverifikasi", bannerType: "side_banner", mode: "template", isActive: true, sortOrder: 1, badgeText: "TRUSTED CARE", headline: "Partner pilihan. Care terpercaya.", description: "Semua partner melewati verifikasi dan standar layanan Ride N Care.", ctaLabel: "Pelajari", ctaLink: "/help", icon: "shield", accentStyle: "yellow", templateVariant: "trust" },
  });

  const homeCare = await prisma.service.findUniqueOrThrow({ where: { slug: "home-cleaning" }, include: { packages: true } });
  const address = await prisma.address.findFirstOrThrow({ where: { userId: customerA.id } });
  await prisma.order.upsert({
    where: { orderCode: "ORD-001" },
    update: {},
    create: {
      orderCode: "ORD-001",
      customerId: customerA.id,
      workerId: workers[0].id,
      serviceId: homeCare.id,
      packageId: homeCare.packages[1].id,
      addressId: address.id,
      status: "worker_assigned",
      bookingDate: new Date("2026-07-02"),
      bookingTime: "10:00",
      paymentMethod: "QRIS",
      subtotal: 125000,
      totalPrice: 125000,
      customerNotes: "Tolong fokus area ruang tamu dan kamar mandi.",
    },
  });

  await prisma.notification.create({ data: { userId: admin.id, title: "Seed selesai", message: "Database Ride N Care siap digunakan.", type: "system" } });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
