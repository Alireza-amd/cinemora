import { Suspense } from "react";
import {
  HeroTrendMediaSlider,
  HeroTrendMediaSliderSkeleton,
} from "@/features/home/components/HeroSlider";
import { MovieSection } from "@/features/movie/components/MovieSection";
import { TVSection } from "@/features/tv/components/TVSection";
import { getTrendMedias } from "@/features/media/services/service";
import { Await, useLoaderData } from "react-router";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendMovies,
} from "@/features/movie/services/service";
import { getPopularTVShows } from "@/features/tv/services/service";

export function HomePage() {
  const {
    trendMediasPromise,
    trendMoviesPromise,
    popularMoviesPromise,
    popularTvShowsPromise,
    topRatedMoviesPromise,
  } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-6 my-6">
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
export const homePageRoute = {
  loader,
  element: <HomePage />,
};
