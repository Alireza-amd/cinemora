import { CustomPagination } from "@/components/CustomPagination";
import { PageHeader } from "@/components/PageHeader";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { TVShowsGrid } from "@/features/media/components/TVShowsGrid";
import { getDiscoverTVShows } from "@/features/media/services/service";
import { MediasFilterForm } from "@/features/media/components/MediaFilterForm";
import { Search } from "lucide-react";

import { Suspense } from "react";
import { Await, useLoaderData, type LoaderFunctionArgs } from "react-router";

export function TVShowsPage() {
  const { tvShowsPromise } = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader
        subtitle="Explore popular and highly rated series."
        buttonSection={
          <InputGroup className="max-w-lg ml-auto lg:py-6">
            <InputGroupInput placeholder="Search TV shows..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        }
      >
        TV Shows
      </PageHeader>
      <MediasFilterForm mediaType="tv" />
      <Suspense fallback={<MediaGridSkeleton />}>
        <Await resolve={tvShowsPromise}>
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
    </>
  );
}

function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const filter = Object.fromEntries(searchParams);
  return { tvShowsPromise: getDiscoverTVShows(filter) };
}
export const tvShowsPageRoute = {
  element: <TVShowsPage />,
  loader,
};
