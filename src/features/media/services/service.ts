import { baseApi } from "@/services/baseApi";
import { mediaSchema } from "../constants/schema";
import z from "zod";
import { genreSchema, mediaCreditSchema } from "../constants/commonSchema";

export function getTrendMedias() {
  return baseApi.get("/trending/all/day").then((res) => {
    const results = z
      .object({
        results: z.array(z.unknown()),
      })
      .parse(res.data).results;

    const validMedias = results.filter(
      (
        media,
      ): media is { media_type: "movie" | "tv" } & Record<string, unknown> =>
        typeof media === "object" &&
        media !== null &&
        "media_type" in media &&
        (media.media_type === "movie" || media.media_type === "tv"),
    );

    return z
      .object({
        results: z.array(mediaSchema),
      })
      .parseAsync({ results: validMedias });
  });
}

export function getGenres() {
  const movieGenres = baseApi
    .get("/genre/movie/list")
    .then((res) =>
      z.object({ genres: z.array(genreSchema) }).parseAsync(res.data),
    );
  const tvGenres = baseApi
    .get("/genre/tv/list")
    .then((res) =>
      z.object({ genres: z.array(genreSchema) }).parseAsync(res.data),
    );
  return { movieGenres, tvGenres };
}

export function getMovieCredits(id: string) {
  return baseApi.get(`/movie/${id}/credits`).then((res) => {
    return mediaCreditSchema.parseAsync(res.data);
  });
}

export function getTVShowCredits(id: string) {
  return baseApi.get(`/tv/${id}/credits`).then((res) => {
    return mediaCreditSchema.parseAsync(res.data);
  });
}
