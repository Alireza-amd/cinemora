import {
  genreSchema,
  productionCompanySchema,
  productionCountrySchema,
} from "@/features/media/constants/commonSchema";
import z from "zod";

export const tvShowSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  genre_ids: z.array(z.number()),
  first_air_date: z.preprocess(
    (value) => (value === "" ? null : value),
    z.coerce.date().nullable(),
  ),
});

export const seasonSchema = z.object({
  id: z.number(),
  name: z.string(),
  air_date: z.coerce.date(),
  episode_count: z.number(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
});

export const tvShowDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  first_air_date: z.preprocess(
    (value) => (value === "" ? null : value),
    z.coerce.date().nullable(),
  ),
  last_air_date: z.preprocess(
    (value) => (value === "" ? null : value),
    z.coerce.date().nullable(),
  ),
  vote_count: z.number(),
  genres: z.array(genreSchema),
  production_companies: z.array(productionCompanySchema).nullable(),
  production_countries: z.array(productionCountrySchema).nullable(),
  status: z.string(),
  original_language: z.string(),
  seasons: z.array(seasonSchema),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
});
