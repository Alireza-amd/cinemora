import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { Footer } from "./Footer";
import { GenreProvider } from "@/features/media/context/GenresContext";

const queryClient = new QueryClient();

export function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <GenreProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 ">
                <Outlet />
              </main>
              <Footer />
            </div>
            <ScrollRestoration />
            <Toaster />
          </GenreProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
