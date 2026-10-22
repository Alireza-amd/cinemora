import { CustomPagination } from "@/components/CustomPagination";
import { PageHeader } from "@/components/PageHeader";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { TVShowsGrid } from "@/features/tv/components/TVShowsGrid";
import { getPopularTVShows } from "@/features/tv/services/service";
import { Suspense } from "react";
import {
  Await,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from "react-router";

function PopularTVShowsPage() {
  const { popularTVShowsPromise } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="container mx-auto px-6 my-6">
      <PageHeader>Popular Movies</PageHeader>
      <Suspense fallback={<MediaGridSkeleton />} key={searchParams.toString()}>
        <Await resolve={popularTVShowsPromise}>
          {(tvShows) => (
            <>
              <TVShowsGrid tvShows={tvShows.results} />
              <CustomPagination
                page={tvShows.page}
                totalPages={tvShows.total_pages}
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

  return { popularTVShowsPromise: getPopularTVShows(filter) };
}

export const popularTVShowsPageRoute = {
  element: <PopularTVShowsPage />,
  loader,
};
