import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/context/theme/ThemeProvider";

export function RootLayout() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="my-4 container mx-auto grid grid-cols-1">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </ThemeProvider>
  );
}
