import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 container mx-auto px-6">
            <Outlet />
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
