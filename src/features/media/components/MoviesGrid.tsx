import { GridTemplate } from "@/components/GridTemplate";
import { MediaCard } from "./MediaCard";
import type { MovieSchema, TVSchema } from "../constants/types";

type MoviesGridProps = {
  movies: MovieSchema[];
};
export function MoviesGrid({ movies }: MoviesGridProps) {
  return (
    <GridTemplate>
      {movies.map((movie) => (
        <MediaCard {...movie} media_type="movie" key={movie.id} />
      ))}
    </GridTemplate>
  );
}
type MediaGridProps = {
  medias: (MovieSchema | TVSchema)[];
};
export function MediaGrid({ medias }: MediaGridProps) {
  return (
    <GridTemplate>
      {medias.map((media) => {
        if ("release_date" in media) {
          return <MediaCard {...media} media_type="movie" />;
        }
        return <MediaCard {...media} media_type="tv" />;
      })}
    </GridTemplate>
  );
}
