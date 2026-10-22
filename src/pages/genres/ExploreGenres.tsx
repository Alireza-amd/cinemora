import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import genreContent from "@/features/genres/constants/genre-content.json";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGenres } from "@/features/media/hooks/useGenres";
import type { Genre } from "@/features/media/constants/types";
import { SkeletonArray } from "@/components/Skeleton";

export function ExploreGenresPage() {
  const { movieGenres, tvGenres, isLoading } = useGenres();

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6">
      <PageHeader subtitle="Explore movies and TV shows by genre.">
        Explore Genres
      </PageHeader>

      <Tabs defaultValue="movies" className="mt-8">
        <TabsList>
          <TabsTrigger value="movies">Movies</TabsTrigger>

          <TabsTrigger value="tv">TV Shows</TabsTrigger>
        </TabsList>

        <TabsContent value="movies">
          {isLoading ? (
            <GenreGridSkeleton />
          ) : (
            <GenreGrid genres={movieGenres} mediaType="movie" />
          )}
        </TabsContent>

        <TabsContent value="tv">
          {isLoading ? (
            <GenreGridSkeleton />
          ) : (
            <GenreGrid genres={tvGenres} mediaType="tv" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GenreGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 auto-rows-40  sm:auto-rows-50 lg:auto-rows-75 lg:grid-cols-3 xl:grid-cols-4">
      <SkeletonArray length={9}>
        <div className="animate-pulse rounded-2xl bg-muted" />
      </SkeletonArray>
    </div>
  );
}

type GenreGridProps = {
  genres: Genre[];
  mediaType: "movie" | "tv";
};

export function GenreGrid({ genres, mediaType }: GenreGridProps) {
  const navigate = useNavigate();

  const contentById = genreContent[mediaType] as Record<
    string,
    { image: string; description: string }
  >;

  return (
    <div className="grid auto-rows-45 grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-50 lg:auto-rows-75 lg:grid-cols-3 xl:grid-cols-4">
      {genres.map((genre) => {
        const content = contentById[genre.id.toString()];

        if (!content) return null;

        return (
          <GenreCard
            key={genre.id}
            name={genre.name}
            description={content.description}
            image={content.image}
            onClick={() => {
              navigate(`/${mediaType}?with_genres=${genre.id}`);
            }}
          />
        );
      })}
    </div>
  );
}

type GenreCardProps = {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
};

export function GenreCard({
  name,
  description,
  image,
  onClick,
}: GenreCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group cursor-pointer relative isolate flex min-h-0 w-full overflow-hidden rounded-2xl border border-white/10 bg-muted text-left"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 z-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 z-1 bg-black/30 backdrop-blur-xs transition-all duration-300 group-hover:bg-black/20 group-hover:backdrop-blur-none" />

      <div className="absolute inset-0 z-2 bg-linear-to-t from-black/90 via-black/35 to-black/10" />

      <div className="absolute inset-x-3 bottom-3 z-10 p-4 sm:inset-x-4 sm:bottom-4 sm:p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-bold tracking-tight text-rose-700 text-xl">
              {name}
            </h3>

            <p className="mt-2  text-sm  text-white/75">{description}</p>
          </div>

          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </button>
  );
}
