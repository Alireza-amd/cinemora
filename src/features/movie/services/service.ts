import { baseApi } from "@/services/baseApi";
import z from "zod";
import { movieDetailsSchema, movieSchema } from "../constants/schema";
import { tmdbSchema } from "@/constants/schema";

export function getTrendMovies() {
  return baseApi
    .get("/trending/movie/week")
    .then((resolve) =>
      z.object({ results: z.array(movieSchema) }).parseAsync(resolve.data),
    );
}
export function getPopularMovies() {
  return baseApi
    .get("/movie/popular")
    .then((resolve) =>
      z.object({ results: z.array(movieSchema) }).parseAsync(resolve.data),
    );
}
export function getTopRatedMovies() {
  return baseApi
    .get("/movie/top_rated")
    .then((resolve) =>
      z.object({ results: z.array(movieSchema) }).parseAsync(resolve.data),
    );
}
export function getDiscoverMovies(params: Record<string, string>) {
  return baseApi
    .get("/discover/movie", { params })
    .then((res) =>
      tmdbSchema.extend({ results: z.array(movieSchema) }).parseAsync(res.data),
    );
}
export function getSearchMovies(params: Record<string, string>) {
  return baseApi
    .get("/search/movie", { params })
    .then((res) =>
      tmdbSchema.extend({ results: z.array(movieSchema) }).parseAsync(res.data),
    );
}

export function getMovieById(id: string) {
  return baseApi
    .get(`/movie/${id}`)
    .then((res) => movieDetailsSchema.parseAsync(res.data));
}
export function getSimilarMovies(id: string) {
  return baseApi
    .get(`/movie/${id}/similar`)
    .then((res) =>
      z.object({ results: z.array(movieSchema) }).parseAsync(res.data),
    );
}
