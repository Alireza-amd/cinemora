import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaGridSkeleton } from "@/features/media/components/MediaGridSkeleton";
import { MediaGrid, MoviesGrid } from "@/features/media/components/MoviesGrid";
import { TVShowsGrid } from "@/features/media/components/TVShowsGrid";
import {
  getMovieById,
  getTVShowsById,
} from "@/features/media/services/service";
import { useFavoriteMediaStore } from "@/features/media/stores/useFavoriteMediaStore";
import { useQuery } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";

export function FavoitesPage() {
  return (
    <>
      <PageHeader subtitle="Your saved movies and TV shows.">
        <div className="flex gap-2">
          <HeartIcon className="w-8 h-8 text-rose-700" fill="currentColor" />
          Favorites
        </div>
      </PageHeader>
      <FavoriteMediaContent />
    </>
  );
}

function FavoriteMediaContent() {
  const favoriteMedias = useFavoriteMediaStore((state) => state.favoriteMedias);

  const allQuery = useQuery({
    queryKey: [
      "favorites",
      favoriteMedias.map(({ id, mediaType }) => [id, mediaType]),
    ],
    queryFn: () =>
      Promise.all(
        favoriteMedias.map((media) =>
          media.mediaType === "movie"
            ? getMovieById(media.id)
            : getTVShowsById(media.id),
        ),
      ),
  });

  const medias = allQuery.data ?? [];
  const movies = medias.filter((m) => "release_date" in m);
  const tvShows = medias.filter((m) => "first_air_date" in m);

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="movies">Movies</TabsTrigger>
        <TabsTrigger value="tv">TV Shows</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {allQuery.isLoading ? (
          <MediaGridSkeleton />
        ) : medias.length ? (
          <MediaGrid medias={medias} />
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </TabsContent>

      <TabsContent value="movies">
        {allQuery.isLoading ? (
          <MediaGridSkeleton />
        ) : movies.length ? (
          <MoviesGrid movies={movies} />
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </TabsContent>

      <TabsContent value="tv">
        {allQuery.isLoading ? (
          <MediaGridSkeleton />
        ) : tvShows.length ? (
          <TVShowsGrid tvShows={tvShows} />
        ) : (
          <p>No favorite TV shows yet.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
