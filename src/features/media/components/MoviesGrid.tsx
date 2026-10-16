import { GridTemplate } from "@/components/GridTemplate";
import { MediaCard } from "./MediaCard";
import type { MovieSchema } from "../constants/types";

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
