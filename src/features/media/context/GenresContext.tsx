import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Genre } from "../constants/types";
import { getGenres } from "../services/service";

type GenreContextType = {
  isLoading: boolean;
  movieGenres: Genre[];
  tvGenres: Genre[];
};

export const GenreContext = createContext<GenreContextType | null>(null);

export function GenreProvider({ children }: { children: ReactNode }) {
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTVGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { tvGenres: tvGenresPromise, movieGenres: movieGenresPromise } =
      getGenres();
    Promise.all([
      tvGenresPromise.then((data) => setTVGenres(data.genres)),
      movieGenresPromise.then((data) => setMovieGenres(data.genres)),
    ]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <GenreContext.Provider value={{ isLoading, movieGenres, tvGenres }}>
      {children}
    </GenreContext.Provider>
  );
}
