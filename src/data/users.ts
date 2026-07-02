import type { User } from "@/types";

export const customers: User[] = [
  { id: "CUS-001", name: "Alya Putri", phone: "081234567890", email: "alya@example.com", role: "customer", memberSince: "2026", savedAddresses: 2, addresses: [
    { id: "ADR-001", label: "Rumah", address: "Jl. Siliwangi No. 28, Cianjur, Jawa Barat", notes: "Pagar hijau, bel di samping garasi.", primary: true },
    { id: "ADR-002", label: "Kantor", address: "Jl. Dr. Muwardi No. 17, Cianjur, Jawa Barat" },
  ] },
  { id: "CUS-002", name: "Raka Pratama", phone: "081298765432", email: "raka@example.com", role: "customer", memberSince: "2025", savedAddresses: 1, addresses: [{ id: "ADR-003", label: "Rumah", address: "Jl. Pasir Gede Raya, Cianjur", primary: true }] },
];

export const admins: User[] = [
  { id: "ADM-001", name: "Admin Ride N Care", phone: "081234567892", email: "admin@ridencare.test", role: "admin", addresses: [] },
];

export const users = customers;
export const currentCustomer = customers[0];
export const currentAdmin = admins[0];
