import { Navigate, Outlet, useLocation } from "react-router";
import authBackground from "@/asset/auth_background.jpg";
import logo from "@/asset/logo.png";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

export function AuthLayout() {
  const { isLoadingUser, user } = useAuth();
  const location = useLocation();

  if (user != null)
    return <Navigate to={location.state?.location ?? "/"} replace />;

  return (
    <div
      className="relative flex flex-col items-center justify-start gap-2 min-h-[calc(100vh-4rem)] bg-cover bg-center p-2"
      style={{
        backgroundImage: `url(${authBackground})`,
      }}
    >
      <div className="absolute inset-0 bg-black/80" />

      <img src={logo} alt="cinemora" className="relative w-80 h-auto" />

      <div className="z-10">
        {isLoadingUser ? <LoadingSpinner className="w-24 h-24" /> : <Outlet />}
      </div>
    </div>
  );
}
