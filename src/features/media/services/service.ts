import { baseApi } from "@/services/baseApi";
import {
  genreSchema,
  mediaSchema,
  movieSchema,
  tvShowSchema,
} from "../constants/schema";
import z from "zod";
import { tmdbSchema } from "@/constants/schema";

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

export function getDiscoverMovies(params: Record<string, string>) {
  return baseApi.get("/discover/movie", { params }).then((res) => {
    return tmdbSchema
      .extend({ results: z.array(movieSchema) })
      .parseAsync(res.data);
  });
}
export function getDiscoverTVShows(params: Record<string, string>) {
  return baseApi.get("/discover/tv", { params }).then((res) => {
    return tmdbSchema
      .extend({ results: z.array(tvShowSchema) })
      .parseAsync(res.data);
  });
}
export function getSearchMovies(params: Record<string, string>) {
  return baseApi
    .get("/search/movie", { params })
    .then((res) =>
      tmdbSchema.extend({ results: z.array(movieSchema) }).parseAsync(res.data),
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
export function getMovieById(id: number) {
  return baseApi.get(`/movie/${id}`).then((res) => {
    const movie = {
      ...res.data,
      genre_ids: res.data.genres.map(
        (genre: { id: number; name: string }) => genre.id,
      ),
    };

    return movieSchema.parseAsync(movie);
  });
}
export function getTVShowsById(id: number) {
  return baseApi.get(`/tv/${id}`).then((res) => {
    const tvShow = {
      ...res.data,
      genre_ids: res.data.genres.map(
        (genre: { id: number; name: string }) => genre.id,
      ),
    };
    return tvShowSchema.parseAsync(tvShow);
  });
}
