import { createBrowserRouter } from "react-router";
import { HomePageRoute } from "./pages/index/HomePage";
import { RootLayout } from "./layouts/RootLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AuthLayout } from "./features/auth/layouts/AuthLayout";
import { SignInPage } from "./features/auth/pages/SignInPage";
import { SignUpPage } from "./features/auth/pages/SignUpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, ...HomePageRoute },
          {
            element: <AuthLayout />,
            children: [
              { path: "sign-in", element: <SignInPage /> },
              { path: "sign-up", element: <SignUpPage /> },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
