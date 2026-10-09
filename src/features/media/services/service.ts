import { baseApi } from "@/services/baseApi";
import { mediaSchema, movieSchema, tvShowSchema } from "../constants/schema";
import z from "zod";

export function getTrendMedias() {
  return baseApi.get("/trending/all/day").then((resolve) => {
    return z.object({ results: z.array(mediaSchema) }).parseAsync(resolve.data);
  });
}
export function getTrendMovies() {
  return baseApi.get("/trending/movie/week").then((resolve) => {
    return z.object({ results: z.array(movieSchema) }).parseAsync(resolve.data);
  });
}
export function getPopularMovies() {
  return baseApi.get("/movie/popular").then((resolve) => {
    return z.object({ results: z.array(movieSchema) }).parseAsync(resolve.data);
  });
}
export function getTopRatedMovies() {
  return baseApi.get("/movie/top_rated").then((resolve) => {
    return z.object({ results: z.array(movieSchema) }).parseAsync(resolve.data);
  });
}
export function getPopularTVShows() {
  return baseApi.get("/tv/popular").then((resolve) => {
    return z
      .object({ results: z.array(tvShowSchema) })
      .parseAsync(resolve.data);
  });
}
export function getTopRatedTVShows() {
  return baseApi.get("/tv/top_rated").then((resolve) => {
    return z
      .object({ results: z.array(tvShowSchema) })
      .parseAsync(resolve.data);
  });
}
