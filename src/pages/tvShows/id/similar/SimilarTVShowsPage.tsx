import { CustomPagination } from "@/components/CustomPagination";
import { PageHeader } from "@/components/PageHeader";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { TVShowsGrid } from "@/features/tv/components/TVShowsGrid";
import {
  getSimilarTVShows,
  getTVShowsById,
} from "@/features/tv/services/service";
import { Suspense } from "react";
import {
  Await,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from "react-router";

function SimilarTVShowsPage() {
  const { similarTVShowsPromise, tvShowPromise } =
    useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="container mx-auto px-6 my-6">
      <PageHeader>
        <Suspense fallback={"Similar TVShows"} key={searchParams.toString()}>
          <Await resolve={tvShowPromise}>
            {(tvShow) => `Similar TVShows to ${tvShow.name}`}
          </Await>
        </Suspense>
      </PageHeader>
      <Suspense fallback={<MediaGridSkeleton />} key={searchParams.toString()}>
        <Await resolve={similarTVShowsPromise}>
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

function loader({ request, params }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const { id } = params;
  const filter = Object.fromEntries(searchParams);

  if (id == null) throw new Error("Id didn't found");

  return {
    similarTVShowsPromise: getSimilarTVShows(id, filter),
    tvShowPromise: getTVShowsById(id),
  };
}

export const similarTVShowsPageRoute = {
  element: <SimilarTVShowsPage />,
  loader,
};
