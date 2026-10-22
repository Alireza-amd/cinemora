import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CastSection } from "@/features/media/components/CastSection";
import { CrewSection } from "@/features/media/components/CrewSection";
import FavoriteButton from "@/features/media/components/FavoriteButton";
import {
  MediaFacts,
  MediaFactsSkeleton,
} from "@/features/media/components/MediaFacts";
import { MovieSection } from "@/features/movie/components/MovieSection";
import {
  ProductionInfo,
  ProductionInfoSkeleton,
} from "@/features/media/components/ProductionInfo";
import { getMovieCredits } from "@/features/media/services/service";
import { getImageURL } from "@/services/baseImageURL";
import { formatCurreny, formatDate, formatRuntime } from "@/utils/formatter";
import {
  CalendarIcon,
  ChartSplineIcon,
  CircleDollarSign,
  ClockIcon,
  GlobeIcon,
  NotepadTextIcon,
  StarIcon,
} from "lucide-react";
import { Suspense } from "react";
import {
  Await,
  Link,
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
} from "react-router";
import {
  getMovieById,
  getSimilarMovies,
} from "@/features/movie/services/service";

function MovieDetailsPage() {
  const { id } = useParams();

  const { moviePromise, similarMoviesPromise, castPromise, crewPromise } =
    useLoaderData<typeof loader>();

  if (moviePromise == null || similarMoviesPromise == null) {
    return null;
  }

  return (
    <>
      <Suspense fallback={<MovieHeroSkeleton />} key={id}>
        <Await resolve={moviePromise}>
          {(movie) => (
            <div className="relative isolate overflow-hidden bg-background">
              <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${getImageURL(movie.backdrop_path)})`,
                }}
              />

              <div className="absolute inset-0 -z-10 bg-black/65 backdrop-blur-[2px]" />

              <div className="mx-auto flex min-h-125 max-w-7xl flex-col items-center gap-8 px-6 py-10 text-white md:min-h-137.5 md:flex-row md:items-center md:gap-10 lg:gap-16 lg:px-10">
                <div className="relative w-2/3 max-w-70 shrink-0 md:w-1/3 lg:w-1/4">
                  <img
                    src={getImageURL(movie.poster_path)}
                    alt={`${movie.title} poster`}
                    className="aspect-2/3 w-full rounded-lg border border-white/20 object-cover shadow-2xl shadow-black/50"
                  />

                  <FavoriteButton
                    id={movie.id}
                    title={movie.title}
                    mediaType="movie"
                    className="absolute right-3 top-3"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-5">
                  <h1 className="text-center text-3xl font-bold leading-tight sm:text-4xl md:text-left lg:text-5xl">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80 md:justify-start">
                    {movie.release_date && (
                      <span>
                        {formatDate(movie.release_date, {
                          year: "numeric",
                        })}
                      </span>
                    )}

                    {movie.release_date && <span aria-hidden="true">•</span>}

                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                    {movie.genres.map((genre) => (
                      <Link
                        key={genre.id}
                        to={`/movie?with_genres=${genre.id}`}
                      >
                        <Badge
                          variant="outline"
                          className="border-white/30 text-white transition-colors hover:border-rose-500 hover:bg-rose-700"
                        >
                          {genre.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                    <div className="flex items-center gap-1">
                      <StarIcon
                        className="size-6 text-rose-600"
                        fill="currentColor"
                      />

                      <span className="text-2xl font-bold">
                        {movie.vote_average.toFixed(1)}
                      </span>

                      <span className="text-sm text-white/70">/ 10</span>
                    </div>

                    <span className="text-sm text-white/70">
                      {movie.vote_count.toLocaleString()} votes
                    </span>
                  </div>

                  <p className="max-w-3xl text-center leading-7 text-white/85 md:text-left">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>

      {/* Main Content */}
      <div className="mx-auto my-6 space-y-6 px-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Production Companies & Countries */}
            <Suspense fallback={<ProductionInfoSkeleton />} key={id}>
              <Await resolve={moviePromise}>
                {(movie) => (
                  <ProductionInfo
                    productionCompanies={movie.production_companies}
                    productionCountries={movie.production_countries}
                  />
                )}
              </Await>
            </Suspense>
            <CastSection
              title="Casts"
              castPromise={castPromise}
              key={`${id}-cast`}
            />
            <CrewSection
              title="Crews"
              crewPromise={crewPromise}
              key={`${id}-crew`}
            />
          </div>

          {/* Movie Facts */}
          <Suspense fallback={<MediaFactsSkeleton />} key={id}>
            <Await resolve={moviePromise}>
              {(movie) => (
                <MediaFacts mediaType="movie">
                  <MediaFacts.Item
                    icon={NotepadTextIcon}
                    label="Status"
                    value={movie.status}
                  />

                  <MediaFacts.Item
                    icon={CalendarIcon}
                    label="Release Date"
                    value={
                      movie.release_date
                        ? formatDate(movie.release_date, {
                            dateStyle: "medium",
                          })
                        : "_"
                    }
                  />

                  <MediaFacts.Item
                    icon={ClockIcon}
                    label="Runtime"
                    value={formatRuntime(movie.runtime)}
                  />

                  <MediaFacts.Item
                    icon={GlobeIcon}
                    label="Original Language"
                    value={movie.original_language}
                  />

                  <MediaFacts.Item
                    icon={CircleDollarSign}
                    label="Budget"
                    value={formatCurreny(movie.budget)}
                  />

                  <MediaFacts.Item
                    icon={ChartSplineIcon}
                    label="Revenue"
                    value={formatCurreny(movie.revenue)}
                  />
                </MediaFacts>
              )}
            </Await>
          </Suspense>
        </div>
        <MovieSection
          key={id}
          MoviesPromise={similarMoviesPromise}
          title="Similar Movies"
          to="similar"
        />
      </div>
    </>
  );
}

function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (id == null) {
    return {
      moviePromise: null,
      movieCreditsPromise: null,
      castPromise: null,
      crewPromise: null,
      similarMoviesPromise: null,
    };
  }

  const movieCreditsPromise = getMovieCredits(id);

  return {
    moviePromise: getMovieById(id),
    castPromise: movieCreditsPromise.then((res) => res.cast),
    crewPromise: movieCreditsPromise.then((res) => res.crew),
    similarMoviesPromise: getSimilarMovies(id),
  };
}

export const movieDetailsPageRoute = {
  loader,
  element: <MovieDetailsPage />,
};

function MovieHeroSkeleton() {
  return (
    <div className="bg-background">
      <div className="mx-auto flex min-h-125 max-w-7xl animate-pulse flex-col items-center gap-8 px-6 py-10 md:min-h-137.5 md:flex-row md:gap-10 lg:gap-16 lg:px-10">
        <Skeleton className="aspect-2/3 w-2/3 max-w-70 shrink-0 rounded-lg md:w-1/3 lg:w-1/4" />

        <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-5 md:items-start">
          <Skeleton className="h-10 w-3/4 max-w-lg" />
          <Skeleton className="h-5 w-40" />

          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <Skeleton className="h-8 w-32" />

          <div className="w-full max-w-3xl space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
