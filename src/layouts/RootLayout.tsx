import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/context/theme/ThemeProvider";

export function RootLayout() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </ThemeProvider>
  );
}
