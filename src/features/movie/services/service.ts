import { baseApi } from "@/services/baseApi";
import z from "zod";
import { movieDetailsSchema, movieSchema } from "../constants/schema";
import { tmdbSchema } from "@/constants/schema";

export function getTrendMovies(params?: Record<string, string>) {
  return baseApi
    .get("/trending/movie/week", { params })
    .then((res) =>
      tmdbSchema.extend({ results: z.array(movieSchema) }).parseAsync(res.data),
    );
}
export function getPopularMovies(params?: Record<string, string>) {
  return baseApi
    .get("/movie/popular", { params })
    .then((res) =>
      tmdbSchema.extend({ results: z.array(movieSchema) }).parseAsync(res.data),
    );
}
export function getTopRatedMovies(params?: Record<string, string>) {
  return baseApi
    .get("/movie/top_rated", { params })
    .then((res) =>
      tmdbSchema.extend({ results: z.array(movieSchema) }).parseAsync(res.data),
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
export function getSimilarMovies(id: string, params?: Record<string, string>) {
  return baseApi
    .get(`/movie/${id}/similar`, { params })
    .then((res) =>
      tmdbSchema.extend({ results: z.array(movieSchema) }).parseAsync(res.data),
    );
}
