import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/features/auth/context/AuthProvider";

export function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <ScrollRestoration />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
