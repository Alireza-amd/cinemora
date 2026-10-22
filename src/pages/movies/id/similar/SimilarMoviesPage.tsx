import { CustomPagination } from "@/components/CustomPagination";
import { PageHeader } from "@/components/PageHeader";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { MoviesGrid } from "@/features/movie/components/MoviesGrid";
import {
  getMovieById,
  getSimilarMovies,
} from "@/features/movie/services/service";
import { Suspense } from "react";
import {
  Await,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from "react-router";

function SimilarMoviesPage() {
  const { similarMoviesPromise, moviePromise } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="container mx-auto px-6 my-6">
      <PageHeader>
        <Suspense fallback={"Similar Movies"} key={searchParams.toString()}>
          <Await resolve={moviePromise}>
            {(movie) => `Similar Movies to ${movie.title}`}
          </Await>
        </Suspense>
      </PageHeader>
      <Suspense fallback={<MediaGridSkeleton />} key={searchParams.toString()}>
        <Await resolve={similarMoviesPromise}>
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

function loader({ request, params }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const { id } = params;
  const filter = Object.fromEntries(searchParams);

  if (id == null) throw new Error("Id didn't found");

  return {
    similarMoviesPromise: getSimilarMovies(id, filter),
    moviePromise: getMovieById(id),
  };
}

export const similarMoviesPageRoute = {
  element: <SimilarMoviesPage />,
  loader,
};
