import { createBrowserRouter } from "react-router";
import { HomePageRoute } from "./pages/index/HomePage";
import { RootLayout } from "./layouts/RootLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, ...HomePageRoute },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
