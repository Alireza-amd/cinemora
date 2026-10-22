import {
  genreSchema,
  productionCompanySchema,
  productionCountrySchema,
} from "@/features/media/constants/commonSchema";
import z from "zod";

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  genre_ids: z.array(z.number()),
  release_date: z.preprocess(
    (value) => (value === "" ? null : value),
    z.coerce.date().nullable(),
  ),
});
export const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  genres: z.array(genreSchema),
  release_date: z.preprocess(
    (value) => (value === "" ? null : value),
    z.coerce.date().nullable(),
  ),
  runtime: z.number(),
  production_companies: z.array(productionCompanySchema).nullable(),
  production_countries: z.array(productionCountrySchema).nullable(),
  budget: z.number(),
  revenue: z.number(),
  status: z.string(),
  original_language: z.string(),
});
