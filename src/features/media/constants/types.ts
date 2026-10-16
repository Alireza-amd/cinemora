import z from "zod";
import type {
  genreSchema,
  mediaSchema,
  movieSchema,
  mediaFilterSchema,
  tvShowSchema,
} from "./schema";

export type MovieSchema = z.infer<typeof movieSchema>;
export type TVSchema = z.infer<typeof tvShowSchema>;
export type MediaSchema = z.infer<typeof mediaSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type MediaFilterSchema = z.infer<typeof mediaFilterSchema>;
export enum MoviesFilterKey {
  Genre = "with_genres",
  ReleaseYear = "primary_release_year",
  Rating = "vote_average.gte",
  Language = "with_original_language",
  SortBy = "sort_by",
}
export enum TVShowsFilterKey {
  Genre = "with_genres",
  ReleaseYear = "first_air_date_year",
  Rating = "vote_average.gte",
  Language = "with_original_language",
  SortBy = "sort_by",
}
