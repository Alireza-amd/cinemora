import { Outlet } from "react-router";
import authBackground from "@/asset/auth_background.jpg";
import logo from "@/asset/logo.png";

export function AuthLayout() {
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
        <Outlet />
      </div>
    </div>
  );
}
