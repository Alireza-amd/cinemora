import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";
import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { isLoadingUser, user } = useAuth();
  const location = useLocation();

  if (isLoadingUser) return <LoadingSpinner className="w-24 h-24" />;

  if (user == null)
    return <Navigate to="/sign-in" replace state={{ location }} />;

  return children;
}
