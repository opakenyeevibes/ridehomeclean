import { Bath, BedDouble, Bike, Building2, Car, Crown, House, Leaf, SlidersHorizontal, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CategoryStyleKey =
  | "home"
  | "room"
  | "bathroom"
  | "outdoor"
  | "car"
  | "motor"
  | "deepClean"
  | "office"
  | "premium"
  | "custom";

export type CategoryStyle = {
  bg: string;
  icon: string;
  iconName: string;
  iconComponent: LucideIcon;
};

export const categoryStyles: Record<CategoryStyleKey, CategoryStyle> = {
  home: {
    bg: "#DFF7EA",
    icon: "#1F8A70",
    iconName: "House",
    iconComponent: House,
  },
  room: {
    bg: "#EAF0FF",
    icon: "#3763A8",
    iconName: "Bed",
    iconComponent: BedDouble,
  },
  bathroom: {
    bg: "#DFF7F8",
    icon: "#237C89",
    iconName: "Bath",
    iconComponent: Bath,
  },
  outdoor: {
    bg: "#F0F8D8",
    icon: "#5D8B2F",
    iconName: "Leaf",
    iconComponent: Leaf,
  },
  car: {
    bg: "#FFF0D9",
    icon: "#C46A2D",
    iconName: "Car",
    iconComponent: Car,
  },
  motor: {
    bg: "#F3EAFE",
    icon: "#7B4EB3",
    iconName: "Bike",
    iconComponent: Bike,
  },
  deepClean: {
    bg: "#FFE8E1",
    icon: "#C65B48",
    iconName: "Sparkles",
    iconComponent: Sparkles,
  },
  office: {
    bg: "#E7F2FF",
    icon: "#2D6F9F",
    iconName: "Building2",
    iconComponent: Building2,
  },
  premium: {
    bg: "#FFF4C7",
    icon: "#9A7A12",
    iconName: "Crown",
    iconComponent: Crown,
  },
  custom: {
    bg: "#F2F4F7",
    icon: "#475467",
    iconName: "SlidersHorizontal",
    iconComponent: SlidersHorizontal,
  },
};
