import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CastSection } from "@/features/media/components/CastSection";
import { CrewSection } from "@/features/media/components/CrewSection";
import FavoriteButton from "@/features/media/components/FavoriteButton";
import {
  MediaFacts,
  MediaFactsSkeleton,
} from "@/features/media/components/MediaFacts";
import {
  ProductionInfo,
  ProductionInfoSkeleton,
} from "@/features/media/components/ProductionInfo";
import { SeasonSection } from "@/features/tv/components/SeasonSection";
import { TVSection } from "@/features/tv/components/TVSection";
import { getTVShowCredits } from "@/features/media/services/service";
import { getImageURL } from "@/services/baseImageURL";
import { formatDate, formatPlural } from "@/utils/formatter";
import {
  CalendarIcon,
  GlobeIcon,
  NotepadTextIcon,
  StarIcon,
  VideotapeIcon,
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
  getSimilarTVShows,
  getTVShowsById,
} from "@/features/tv/services/service";

function TVShowDetailsPage() {
  const { id } = useParams();

  const {
    tvShowPromise,
    similarTVShowsPromise,
    castPromise,
    crewPromise,
    seasonsPromise,
  } = useLoaderData<typeof loader>();

  if (tvShowPromise == null || similarTVShowsPromise == null) {
    return null;
  }

  return (
    <>
      <Suspense fallback={<TVShowHeroSkeleton />} key={id}>
        <Await resolve={tvShowPromise}>
          {(tvShow) => (
            <div className="relative isolate overflow-hidden bg-background">
              <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${getImageURL(tvShow.backdrop_path)})`,
                }}
              />

              <div className="absolute inset-0 -z-10 bg-black/65 backdrop-blur-[2px]" />

              <div className="mx-auto flex min-h-125 max-w-7xl flex-col items-center gap-8 px-6 py-10 text-white md:min-h-137.5 md:flex-row md:items-center md:gap-10 lg:gap-16 lg:px-10">
                <div className="relative w-2/3 max-w-70 shrink-0 md:w-1/3 lg:w-1/4">
                  <img
                    src={getImageURL(tvShow.poster_path)}
                    alt={`${tvShow.name} poster`}
                    className="aspect-2/3 w-full rounded-lg border border-white/20 object-cover shadow-2xl shadow-black/50"
                  />

                  <FavoriteButton
                    id={tvShow.id}
                    title={tvShow.name}
                    mediaType="movie"
                    className="absolute right-3 top-3"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-5">
                  <h1 className="text-center text-3xl font-bold leading-tight sm:text-4xl md:text-left lg:text-5xl">
                    {tvShow.name}
                  </h1>

                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80 md:justify-start">
                    {tvShow.first_air_date && (
                      <span>
                        {formatDate(tvShow.first_air_date, {
                          year: "numeric",
                        })}
                      </span>
                    )}

                    <span>
                      {formatPlural(tvShow.number_of_seasons, {
                        singular: "Season",
                        plural: "Seasons",
                      })}
                    </span>
                    <span>
                      {formatPlural(tvShow.number_of_episodes, {
                        singular: "Episode",
                        plural: "Episodes",
                      })}
                    </span>

                    <span className="text-green-700">{tvShow.status}</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                    {tvShow.genres.map((genre) => (
                      <Link key={genre.id} to={`/tv?with_genres=${genre.id}`}>
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
                        {tvShow.vote_average.toFixed(1)}
                      </span>

                      <span className="text-sm text-white/70">/ 10</span>
                    </div>

                    <span className="text-sm text-white/70">
                      {tvShow.vote_count.toLocaleString()} votes
                    </span>
                  </div>

                  <p className="max-w-3xl text-center leading-7 text-white/85 md:text-left">
                    {tvShow.overview}
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
              <Await resolve={tvShowPromise}>
                {(tvShow) => (
                  <ProductionInfo
                    productionCompanies={tvShow.production_companies}
                    productionCountries={tvShow.production_countries}
                  />
                )}
              </Await>
            </Suspense>
            <SeasonSection
              seasonsPromise={seasonsPromise}
              title="Seasons"
              to="seasons"
              key={`${id}-seasons`}
            />
            {/* CastSection handles its own loading skeleton */}
            <CastSection
              title="Casts"
              castPromise={castPromise}
              key={`${id}-cast`}
            />

            {/* CrewSection handles its own loading skeleton */}
            <CrewSection
              title="Crews"
              crewPromise={crewPromise}
              key={`${id}-crew`}
            />
          </div>

          {/* Movie Facts */}
          <Suspense fallback={<MediaFactsSkeleton />} key={id}>
            <Await resolve={tvShowPromise}>
              {(tvShow) => (
                <MediaFacts mediaType="tv">
                  <MediaFacts.Item
                    icon={NotepadTextIcon}
                    label="Status"
                    value={tvShow.status}
                  />

                  <MediaFacts.Item
                    icon={CalendarIcon}
                    label="First Air Date"
                    value={
                      tvShow.first_air_date
                        ? formatDate(tvShow.first_air_date, {
                            dateStyle: "medium",
                          })
                        : "_"
                    }
                  />

                  <MediaFacts.Item
                    icon={CalendarIcon}
                    label="Last Air Date"
                    value={
                      tvShow.last_air_date
                        ? formatDate(tvShow.last_air_date, {
                            dateStyle: "medium",
                          })
                        : "_"
                    }
                  />
                  <MediaFacts.Item
                    icon={VideotapeIcon}
                    label="Number Of Seasons"
                    value={`${tvShow.number_of_seasons}`}
                  />

                  <MediaFacts.Item
                    icon={VideotapeIcon}
                    label="Number Of Episodes"
                    value={`${tvShow.number_of_episodes}`}
                  />
                  <MediaFacts.Item
                    icon={GlobeIcon}
                    label="Original Language"
                    value={tvShow.original_language}
                  />
                </MediaFacts>
              )}
            </Await>
          </Suspense>
        </div>

        {/* MovieSection handles its own loading skeleton */}
        <TVSection
          key={id}
          TVShowsPromise={similarTVShowsPromise}
          title="Similar Movies"
          to="similar-movies"
        />
      </div>
    </>
  );
}

function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (id == null) {
    return {
      tvShowPromise: null,
      tvShowCreditsPromise: null,
      castPromise: null,
      crewPromise: null,
      similarTVShowsPromise: null,
    };
  }

  const tvShowCreditsPromise = getTVShowCredits(id);
  const tvShowPromise = getTVShowsById(id);

  return {
    tvShowPromise,
    seasonsPromise: tvShowPromise.then((res) => res.seasons),
    castPromise: tvShowCreditsPromise.then((res) => res.cast),
    crewPromise: tvShowCreditsPromise.then((res) => res.crew),
    similarTVShowsPromise: getSimilarTVShows(id),
  };
}

export const tvShowDetailsPageRoute = {
  loader,
  element: <TVShowDetailsPage />,
};

function TVShowHeroSkeleton() {
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
