import { create } from "zustand";
import { persist } from "zustand/middleware";
const LOCAL_STORAGE_FAVORITE_MEDIA_KEY = "FAVORITE_MEDIAS";

type FavoriteMedia = {
  id: number;
  mediaType: "movie" | "tv";
};
type FavoriteMediaState = {
  favoriteMedias: FavoriteMedia[];
};

export const useFavoriteMediaStore = create<FavoriteMediaState>()(
  persist(
    (set, get) => ({
      favoriteMedias: [],
    }),
    { name: LOCAL_STORAGE_FAVORITE_MEDIA_KEY },
  ),
);

export function removeMediaFromFavorite({ id, mediaType }: FavoriteMedia) {
  useFavoriteMediaStore.setState((state) => ({
    favoriteMedias: state.favoriteMedias.filter(
      (current) => current.id !== id || current.mediaType !== mediaType,
    ),
  }));
}
export function addMediaToFavorite({ id, mediaType }: FavoriteMedia) {
  useFavoriteMediaStore.setState((state) => {
    const isExist = state.favoriteMedias.some(
      (current) => current.id === id && current.mediaType === mediaType,
    );

    if (isExist) return state;

    return { favoriteMedias: [...state.favoriteMedias, { id, mediaType }] };
  });
}
