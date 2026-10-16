import { useContext } from "react";
import { GenreContext } from "../context/GenresContext";

export function useGenres() {
  const value = useContext(GenreContext);

  if (value == null)
    throw new Error("useGrenres must be used between GernesProvider.");

  return value;
}
