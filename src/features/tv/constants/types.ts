import type z from "zod";
import type { seasonSchema, tvShowDetailsSchema, tvShowSchema } from "./schema";

export enum TVShowsFilterKey {
  Genre = "with_genres",
  ReleaseYear = "first_air_date_year",
  Rating = "vote_average.gte",
  Language = "with_original_language",
  SortBy = "sort_by",
}
export type TVSchema = z.infer<typeof tvShowSchema>;
export type TVShowDetailsSchema = z.infer<typeof tvShowDetailsSchema>;
export type SeasonSchema = z.infer<typeof seasonSchema>;
