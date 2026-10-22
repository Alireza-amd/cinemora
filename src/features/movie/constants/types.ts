import type z from "zod";
import type { movieDetailsSchema, movieSchema } from "./schema";

export enum MoviesFilterKey {
  Genre = "with_genres",
  ReleaseYear = "primary_release_year",
  Rating = "vote_average.gte",
  Language = "with_original_language",
  SortBy = "sort_by",
}
export type MovieSchema = z.infer<typeof movieSchema>;
export type MovieDetailsSchema = z.infer<typeof movieDetailsSchema>;
