import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute role="worker">{children}</ProtectedRoute>;
}
