import { GridTemplate } from "@/components/GridTemplate";
import { MediaCard } from "../../media/components/MediaCard";
import type { MovieDetailsSchema, MovieSchema } from "../constants/types";
import type { TVShowDetailsSchema } from "@/features/tv/constants/types";

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
  medias: (MovieDetailsSchema | TVShowDetailsSchema)[];
};
export function MediaGrid({ medias }: MediaGridProps) {
  return (
    <GridTemplate>
      {medias.map((media) => {
        if ("release_date" in media) {
          return (
            <MediaCard
              key={media.id}
              showMediaType
              {...media}
              genre_ids={media.genres.map(({ id }) => id)}
              media_type="movie"
            />
          );
        }
        return (
          <MediaCard
            key={media.id}
            showMediaType
            {...media}
            media_type="tv"
            genre_ids={media.genres.map(({ id }) => id)}
          />
        );
      })}
    </GridTemplate>
  );
}
