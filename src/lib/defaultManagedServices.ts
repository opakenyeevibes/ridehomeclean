import type { ManagedService } from "@/types";
import { services as defaultServices } from "@/data/services";
import type { CategoryStyleKey } from "@/lib/categoryStyles";

const serviceStyleById: Record<string, CategoryStyleKey> = {
  "home-cleaning": "home",
  "room-cleaning": "room",
  bathroom: "bathroom",
  garden: "outdoor",
  "car-wash": "car",
  "bike-wash": "motor",
  "deep-clean": "deepClean",
  office: "office",
  premium: "premium",
  custom: "custom",
};

export const defaultManagedServices: ManagedService[] = defaultServices.map((service, index) => ({
  id: service.id,
  name: service.name,
  shortName: service.shortName,
  category: service.category,
  description: service.description,
  tagline: service.tagline,
  rating: service.rating,
  totalReviews: service.totalReviews,
  startingPrice: service.startingPrice,
  duration: service.duration,
  packages: service.packages,
  addOns: service.addOns,
  active: service.active ?? true,
  sortOrder: index + 1,
  styleKey: serviceStyleById[service.id] ?? "custom",
}));
