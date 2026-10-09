import {
  HeroTrendMediaSlider,
  HeroTrendMediaSliderSkeleton,
} from "@/features/home/components/HeroSlider";
import { MovieSection } from "@/features/media/components/MovieSection";
import { TVSection } from "@/features/media/components/TVSection";
import {
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  getTrendMedias,
  getTrendMovies,
} from "@/features/media/services/service";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

export function HomePage() {
  const {
    trendMediasPromise,
    trendMoviesPromise,
    popularMoviesPromise,
    popularTvShowsPromise,
    topRatedMoviesPromise,
  } = useLoaderData<typeof loader>();
  return (
    <div className="my-6">
      {
        <Suspense fallback={<HeroTrendMediaSliderSkeleton />}>
          <Await resolve={trendMediasPromise}>
            {(trendMedias) => (
              <HeroTrendMediaSlider trendMedias={trendMedias.results} />
            )}
          </Await>
        </Suspense>
      }
      <div className="grid grid-cols-1 my-6 gap-4">
        <MovieSection
          to="/"
          title="trending now"
          MoviesPromise={trendMoviesPromise}
        />
        <MovieSection
          to="/"
          title="popular movies"
          MoviesPromise={popularMoviesPromise}
        />
        <MovieSection
          to="/"
          title="top rated movies"
          MoviesPromise={topRatedMoviesPromise}
        />
        <TVSection
          to="/"
          title="popular TV shows"
          TVShowsPromise={popularTvShowsPromise}
        />
      </div>
    </div>
  );
}

function loader() {
  return {
    trendMediasPromise: getTrendMedias(),
    trendMoviesPromise: getTrendMovies(),
    popularMoviesPromise: getPopularMovies(),
    topRatedMoviesPromise: getTopRatedMovies(),
    popularTvShowsPromise: getPopularTVShows(),
  };
}
export const HomePageRoute = {
  loader,
  element: <HomePage />,
};
