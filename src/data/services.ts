import type { Service } from "@/types";
import { categoryStyles, type CategoryStyleKey } from "@/lib/categoryStyles";

const carePackages = [
  { id: "basic", name: "Basic Care", price: 0, duration: "2 jam", description: "Perawatan ringan untuk kebutuhan rutin sehari-hari.", features: ["Area utama dirawat", "Debu dan kotoran ringan", "Perapian dasar"] },
  { id: "fresh", name: "Fresh Care", price: 0, duration: "3 jam", description: "Perawatan lebih menyeluruh agar area terasa segar dan nyaman.", features: ["Semua layanan Basic Care", "Area detail prioritas", "Finishing dan pengecekan"], popular: true },
  { id: "deep", name: "Deep Care", price: 0, duration: "4–5 jam", description: "Perawatan mendalam untuk sudut dan noda yang jarang tersentuh.", features: ["Semua layanan Fresh Care", "Noda membandel", "Detail furnitur dan sudut"] },
  { id: "premium", name: "Premium Care", price: 0, duration: "5–6 jam", description: "Layanan prioritas dengan partner berpengalaman dan hasil maksimal.", features: ["Semua layanan Deep Care", "Partner prioritas", "Pengecekan hasil menyeluruh"] },
  { id: "custom", name: "Custom Care", price: 0, duration: "Sesuai kebutuhan", description: "Paket fleksibel yang disesuaikan dengan kebutuhan lokasimu.", features: ["Konsultasi kebutuhan", "Ruang lingkup fleksibel", "Estimasi transparan"] },
];

const addOns = [
  { id: "fridge", name: "Care kulkas", price: 30000, duration: "+30 mnt" },
  { id: "ironing", name: "Care pakaian", price: 25000, duration: "+45 mnt" },
  { id: "balcony", name: "Care balkon / teras", price: 20000, duration: "+30 mnt" },
];

type ServiceConfig = Pick<Service, "id" | "name" | "shortName" | "startingPrice" | "duration" | "tagline" | "category" | "description"> & {
  styleKey: CategoryStyleKey;
};

const make = ({ styleKey, ...config }: ServiceConfig): Service => ({
  ...config,
  icon: categoryStyles[styleKey].iconComponent,
  color: categoryStyles[styleKey].bg,
  accent: categoryStyles[styleKey].icon,
  rating: 4.8,
  totalReviews: Math.floor(config.startingPrice / 75) + 428,
  packages: carePackages.map((item, index) => ({ ...item, price: config.startingPrice + index * Math.round(config.startingPrice * .55) })),
  addOns,
});

export const services: Service[] = [
  make({ id: "home-cleaning", name: "Home Care", shortName: "Home Care", styleKey: "home", startingPrice: 75000, duration: "2–3 jam", tagline: "Rumah rapi, nyaman, dan terawat", category: "Home Care", description: "Layanan bersih rumah panggilan dari Ride Home Care. Partner datang ke lokasi kamu untuk membantu rumah terasa lebih rapi, bersih, dan nyaman." }),
  make({ id: "room-cleaning", name: "Care Kamar", shortName: "Kamar", styleKey: "room", startingPrice: 45000, duration: "1–2 jam", tagline: "Kamar nyaman untuk istirahat", category: "Home Care", description: "Perawatan kamar panggilan untuk membantu membersihkan debu, merapikan area tidur, dan membuat kamar terasa lebih nyaman." }),
  make({ id: "bathroom", name: "Care Kamar Mandi", shortName: "Kamar Mandi", styleKey: "bathroom", startingPrice: 55000, duration: "1–2 jam", tagline: "Lebih bersih dan segar", category: "Home Care", description: "Perawatan kamar mandi untuk membersihkan kerak ringan, lantai, dinding, dan area sanitasi agar kembali segar dan nyaman digunakan." }),
  make({ id: "garden", name: "Outdoor Care", shortName: "Outdoor", styleKey: "outdoor", startingPrice: 85000, duration: "2–3 jam", tagline: "Area luar kembali rapi", category: "Outdoor Care", description: "Layanan bersih area luar rumah seperti halaman, teras, taman kecil, dan area sekitar rumah." }),
  make({ id: "car-wash", name: "Auto Care", shortName: "Auto Care", styleKey: "car", startingPrice: 65000, duration: "60–90 mnt", tagline: "Kendaraan terawat di rumah", category: "Auto Care", description: "Layanan perawatan kendaraan panggilan. Partner Ride Home Home care datang ke lokasi kamu untuk membersihkan mobil atau motor sesuai paket yang dipilih." }),
  make({ id: "bike-wash", name: "Motor Care", shortName: "Motor Care", styleKey: "motor", startingPrice: 30000, duration: "45 mnt", tagline: "Motor bersih tanpa antre", category: "Auto Care", description: "Layanan perawatan motor ringan di lokasi kamu, mulai dari pencucian bodi hingga perapian area kendaraan." }),
  make({ id: "deep-clean", name: "Deep Care", shortName: "Deep Clean", styleKey: "deepClean", startingPrice: 225000, duration: "4–6 jam", tagline: "Care mendalam sampai sudut", category: "Premium Care", description: "Perawatan mendalam untuk rumah atau ruang yang membutuhkan penanganan detail, termasuk sudut dan noda yang jarang tersentuh." }),
  make({ id: "office", name: "Office Care", shortName: "Office Care", styleKey: "office", startingPrice: 275000, duration: "4–6 jam", tagline: "Ruang kerja nyaman dan terawat", category: "Office Care", description: "Layanan care untuk kantor, toko, studio, atau ruang usaha kecil agar tetap rapi, bersih, dan nyaman digunakan." }),
  make({ id: "premium", name: "Premium Care", shortName: "Premium", styleKey: "premium", startingPrice: 350000, duration: "6–8 jam", tagline: "Prioritas untuk kebutuhan spesial", category: "Premium Care", description: "Layanan prioritas untuk kebutuhan deep cleaning, request khusus, dan jadwal fleksibel." }),
  make({ id: "custom", name: "Custom Care", shortName: "Custom", styleKey: "custom", startingPrice: 50000, duration: "Sesuai kebutuhan", tagline: "Care yang mengikuti kebutuhanmu", category: "Premium Care", description: "Ceritakan kebutuhan khususmu dan tim Ride Home Care akan membantu menyusun ruang lingkup layanan yang paling sesuai." }),
];

export const getService = (id: string) => services.find((service) => service.id === id) ?? services[0];
