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
import { searchPageRoute } from "./pages/search/SearchPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { FavoitesPage } from "./pages/favorites/FavoritePage";
import { movieDetailsPageRoute } from "./pages/movies/MovieDetailsPage";
import { tvShowDetailsPageRoute } from "./pages/tvShows/TVShowsDetailPage";
import { ExploreGenresPage } from "./pages/genres/ExploreGenres";

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
            children: [
              { index: true, ...moviesPageRoute },
              { path: ":id", ...movieDetailsPageRoute },
            ],
          },
          {
            path: "tv",
            children: [
              { index: true, ...tvShowsPageRoute },
              { path: ":id", ...tvShowDetailsPageRoute },
            ],
          },
          { path: "search", ...searchPageRoute },
          {
            path: "favorites",
            element: (
              <PrivateRoute>
                <FavoitesPage />
              </PrivateRoute>
            ),
          },
          {
            path: "genres",
            element: <ExploreGenresPage />,
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
