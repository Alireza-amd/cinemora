import { CustomPagination } from "@/components/CustomPagination";
import { PageHeader } from "@/components/PageHeader";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { MoviesGrid } from "@/features/movie/components/MoviesGrid";
import { getTopRatedMovies } from "@/features/movie/services/service";
import { Suspense } from "react";
import {
  Await,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from "react-router";

function TopRatedMoviesPage() {
  const { topRatedMoviesPromise } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="container mx-auto px-6 my-6">
      <PageHeader>Top Rated Movies</PageHeader>
      <Suspense fallback={<MediaGridSkeleton />} key={searchParams.toString()}>
        <Await resolve={topRatedMoviesPromise}>
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

  return { topRatedMoviesPromise: getTopRatedMovies(filter) };
}

export const topRatedMoviesPageRoute = {
  element: <TopRatedMoviesPage />,
  loader,
};
