import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
export function AppShell({ children, compactHeader = false }: { children: React.ReactNode; compactHeader?: boolean }) { return <ProtectedRoute role="customer"><Header compact={compactHeader}/>{children}<BottomNavigation/></ProtectedRoute>; }
