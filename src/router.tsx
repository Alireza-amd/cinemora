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
import { movieDetailsPageRoute } from "./pages/movies/id/MovieDetailsPage";
import { tvShowDetailsPageRoute } from "./pages/tvShows/id/TVShowsDetailPage";
import { ExploreGenresPage } from "./pages/genres/ExploreGenres";
import { popularMoviesPageRoute } from "./pages/movies/popular/PopularMoviesPage";
import { topRatedMoviesPageRoute } from "./pages/movies/topRated/TopRatedMoviesPage";
import { trendMoviesPageRoute } from "./pages/movies/trend/TrendMoviesPage";
import { popularTVShowsPageRoute } from "./pages/tvShows/popular/PopularTVShowsPage";
import { similarMoviesPageRoute } from "./pages/movies/id/similar/SimilarMoviesPage";
import { similarTVShowsPageRoute } from "./pages/tvShows/id/similar/SimilarTVShowsPage";

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
            path: "movie",
            children: [
              { index: true, ...moviesPageRoute },
              { path: "popular", ...popularMoviesPageRoute },
              { path: "top-rated", ...topRatedMoviesPageRoute },
              { path: "trend", ...trendMoviesPageRoute },
              {
                path: ":id",
                children: [
                  { index: true, ...movieDetailsPageRoute },
                  { path: "similar", ...similarMoviesPageRoute },
                ],
              },
            ],
          },
          {
            path: "tv",
            children: [
              { index: true, ...tvShowsPageRoute },
              { path: "popular", ...popularTVShowsPageRoute },
              {
                path: ":id",
                children: [
                  { index: true, ...tvShowDetailsPageRoute },
                  { path: "similar", ...similarTVShowsPageRoute },
                ],
              },
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
