import type { Worker } from "@/types";

export const workers: Worker[] = [
  { id: "WRK-001", name: "Budi Santoso", phone: "081234567891", email: "budi@partner.test", role: "worker", skills: ["Home Care", "Deep Clean"], status: "available", rating: 4.8, completedJobs: 128, earningsToday: 250000, earningsTotal: 18450000, initials: "BS", approved: true },
  { id: "WRK-002", name: "Dewi Anggraini", phone: "081377712345", email: "dewi@partner.test", role: "worker", skills: ["Home Care", "Office Care"], status: "busy", rating: 4.94, completedJobs: 328, earningsToday: 285000, earningsTotal: 32650000, initials: "DA", approved: true },
  { id: "WRK-003", name: "Rizky Firmansyah", phone: "082112348765", role: "worker", skills: ["Auto Care", "Motor Care"], status: "available", rating: 4.88, completedJobs: 246, earningsToday: 190000, earningsTotal: 24750000, initials: "RF", approved: true },
  { id: "WRK-004", name: "Sinta Maharani", phone: "085712340987", role: "worker", skills: ["Premium Care", "Deep Clean"], status: "offline", rating: 4.92, completedJobs: 174, earningsToday: 0, earningsTotal: 21800000, initials: "SM", approved: false },
];

export const currentWorker = workers[0];
