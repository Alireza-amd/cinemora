import z from "zod";

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  genre_ids: z.array(z.number()),
  release_date: z.coerce.date(),
});

export const tvShowSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  genre_ids: z.array(z.number()),
  first_air_date: z.coerce.date(),
});

export const mediaSchema = z.discriminatedUnion("media_type", [
  movieSchema.extend({ media_type: z.literal("movie") }),
  tvShowSchema.extend({ media_type: z.literal("tv") }),
]);
