import { CustomPagination } from "@/components/CustomPagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { MoviesGrid } from "@/features/movie/components/MoviesGrid";
import { TVShowsGrid } from "@/features/tv/components/TVShowsGrid";
import { Search, XIcon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import {
  Await,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from "react-router";
import { getSearchMovies } from "@/features/movie/services/service";
import { getSearchTVShows } from "@/features/tv/services/service";

const QUERY_KEY = "query";

export function SearchPage() {
  const { promiseSearchMovies, promiseSearchTVShows } =
    useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const query = searchParams.get(QUERY_KEY);
    return query != null ? query : "";
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (search) {
        newSearchParams.set(QUERY_KEY, search);
      }
      setSearchParams(newSearchParams);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search, setSearchParams]);

  function deletePageParam() {
    setSearchParams((currentSearchParams) => {
      currentSearchParams.delete("page");
      return currentSearchParams;
    });
  }

  return (
    <div className="container mx-auto px-6 my-6">
      <div className="flex flex-col items-center gap-2 mb-8 ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl gap-8 font-bold">
          Search CINEMORA
        </h1>
        <InputGroup className="max-w-lg lg:py-6">
          <InputGroupInput
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {search && (
            <InputGroupAddon align="inline-end">
              <button
                onClick={() => {
                  setSearch("");
                  setSearchParams({});
                }}
                className="border-2 rounded-full p-1 cursor-pointer hover:bg-rose-700 transition-colors duration-200"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </InputGroupAddon>
          )}
        </InputGroup>
        {search && (
          <p>
            Search results for{" "}
            <span className="font-bold text-rose-700">"{search}"</span>
          </p>
        )}
      </div>
      <Tabs defaultValue="movies" className="w-full">
        <TabsList className="self-center">
          <TabsTrigger onClick={deletePageParam} value="movies">
            Movies
          </TabsTrigger>
          <TabsTrigger onClick={deletePageParam} value="tv">
            TV Shows
          </TabsTrigger>
        </TabsList>
        <TabsContent value="movies">
          <Suspense
            key={searchParams.toString()}
            fallback={<MediaGridSkeleton />}
          >
            <Await resolve={promiseSearchMovies}>
              {(searchMovies) =>
                searchMovies.results.length === 0 ? (
                  <p>Sorry, {search} not found.</p>
                ) : (
                  <>
                    <MoviesGrid movies={searchMovies.results} />
                    <CustomPagination
                      page={searchMovies.page}
                      totalPages={searchMovies.total_pages}
                    />
                  </>
                )
              }
            </Await>
          </Suspense>
        </TabsContent>

        <TabsContent value="tv">
          <Suspense
            key={searchParams.toString()}
            fallback={<MediaGridSkeleton />}
          >
            <Await resolve={promiseSearchTVShows}>
              {(searchTVShows) =>
                searchTVShows.results.length === 0 ? (
                  <p>Sorry, {search} not found.</p>
                ) : (
                  <>
                    <TVShowsGrid tvShows={searchTVShows.results} />
                    <CustomPagination
                      page={searchTVShows.page}
                      totalPages={searchTVShows.total_pages}
                    />
                  </>
                )
              }
            </Await>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const filter = Object.fromEntries(searchParams);
  return {
    promiseSearchMovies: getSearchMovies(filter),
    promiseSearchTVShows: getSearchTVShows(filter),
  };
}

export const searchPageRoute = {
  element: <SearchPage />,
  loader,
};
