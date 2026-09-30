import { Outlet, ScrollRestoration } from "react-router";

export function RootLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="my-4 container mx-auto grid grid-cols-1">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </>
  );
}
