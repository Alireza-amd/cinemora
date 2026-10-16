import { createBrowserRouter } from "react-router";
import { homePageRoute } from "./pages/index/HomePage";
import { RootLayout } from "./layouts/RootLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AuthLayout } from "./features/auth/layouts/AuthLayout";
import { SignInPage } from "./features/auth/pages/SignInPage";
import { SignUpPage } from "./features/auth/pages/SignUpPage";
import { moviesPageRoute } from "./pages/movies/MoviesPage";
import { tvShowsPageRoute } from "./pages/tvShows/TVShowsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, ...homePageRoute },
          {
            element: <AuthLayout />,
            children: [
              { path: "sign-in", element: <SignInPage /> },
              { path: "sign-up", element: <SignUpPage /> },
            ],
          },
          {
            path: "movies",
            children: [{ index: true, ...moviesPageRoute }, { path: ":id" }],
          },
          {
            path: "tv-shows",
            children: [{ index: true, ...tvShowsPageRoute }, { path: ":id" }],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
