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

export const mediaSchema = z.discriminatedUnion("media_type", [
  movieSchema.extend({ media_type: z.literal("movie") }),
  tvShowSchema.extend({ media_type: z.literal("tv") }),
]);

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const mediaFilterSchema = z.object({
  genres: z.array(z.string()),
  releaseYear: z.string(),
  rating: z.string(),
  language: z.string(),
  sortBy: z.string(),
});
