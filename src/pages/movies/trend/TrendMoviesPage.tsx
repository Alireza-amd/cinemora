import { CustomPagination } from "@/components/CustomPagination";
import { PageHeader } from "@/components/PageHeader";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { MoviesGrid } from "@/features/movie/components/MoviesGrid";
import { getTrendMovies } from "@/features/movie/services/service";
import { Suspense } from "react";
import {
  Await,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from "react-router";

function TrendMoviesPage() {
  const { trendMoviesPromise } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="container mx-auto px-6 my-6">
      <PageHeader>Trend Movies</PageHeader>
      <Suspense fallback={<MediaGridSkeleton />} key={searchParams.toString()}>
        <Await resolve={trendMoviesPromise}>
          {(movies) => (
            <>
              <MoviesGrid movies={movies.results} />
              <CustomPagination
                page={movies.page}
                totalPages={movies.total_pages}
              />
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const filter = Object.fromEntries(searchParams);

  return { trendMoviesPromise: getTrendMovies(filter) };
}

export const trendMoviesPageRoute = {
  element: <TrendMoviesPage />,
  loader,
};
