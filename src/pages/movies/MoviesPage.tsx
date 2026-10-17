import { CustomPagination } from "@/components/CustomPagination";
import { PageHeader } from "@/components/PageHeader";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { MoviesGrid } from "@/features/media/components/MoviesGrid";
import { getDiscoverMovies } from "@/features/media/services/service";
import { MediasFilterForm } from "@/features/media/components/MediaFilterForm";
import { Search } from "lucide-react";

import { Suspense } from "react";
import {
  Await,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from "react-router";

export function MoviesPage() {
  const { moviesPromise } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <>
      <PageHeader
        subtitle="Discover movies with watching."
        buttonSection={
          <InputGroup className="max-w-lg ml-auto lg:py-6">
            <InputGroupInput placeholder="Search movies..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        }
      >
        Movies
      </PageHeader>
      <MediasFilterForm mediaType="movie" />
      <Suspense fallback={<MediaGridSkeleton />} key={searchParams.toString()}>
        <Await resolve={moviesPromise}>
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
    </>
  );
}

function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const filter = Object.fromEntries(searchParams);
  return { moviesPromise: getDiscoverMovies(filter) };
}
export const moviesPageRoute = {
  element: <MoviesPage />,
  loader,
};
