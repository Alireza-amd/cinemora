import { baseApi } from "@/services/baseApi";
import z from "zod";
import { tvShowDetailsSchema, tvShowSchema } from "../constants/schema";
import { tmdbSchema } from "@/constants/schema";

export function getPopularTVShows() {
  return baseApi
    .get("/tv/popular")
    .then((resolve) =>
      z.object({ results: z.array(tvShowSchema) }).parseAsync(resolve.data),
    );
}
export function getTopRatedTVShows() {
  return baseApi
    .get("/tv/top_rated")
    .then((resolve) =>
      z.object({ results: z.array(tvShowSchema) }).parseAsync(resolve.data),
    );
}
export function getDiscoverTVShows(params: Record<string, string>) {
  return baseApi
    .get("/discover/tv", { params })
    .then((res) =>
      tmdbSchema
        .extend({ results: z.array(tvShowSchema) })
        .parseAsync(res.data),
    );
}

export function getSearchTVShows(params: Record<string, string>) {
  return baseApi
    .get("/search/tv", { params })
    .then((res) =>
      tmdbSchema
        .extend({ results: z.array(tvShowSchema) })
        .parseAsync(res.data),
    );
}

export function getTVShowsById(id: string) {
  return baseApi
    .get(`/tv/${id}`)
    .then((res) => tvShowDetailsSchema.parseAsync(res.data));
}
export function getSimilarTVShows(id: string) {
  return baseApi
    .get(`/tv/${id}/similar`)
    .then((res) =>
      z.object({ results: z.array(tvShowSchema) }).parseAsync(res.data),
    );
}
