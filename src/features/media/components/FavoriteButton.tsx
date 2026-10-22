import {
  addMediaToFavorite,
  removeMediaFromFavorite,
  useFavoriteMediaStore,
} from "../stores/useFavoriteMediaStore";
import { toast } from "sonner";
import { HeartIcon } from "lucide-react";
import { cn } from "cn";

export default function FavoriteButton({
  id,
  mediaType,
  title,
  className,
}: {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  className?: string;
}) {
  const isMediaInFavorites = useFavoriteMediaStore((state) =>
    state.favoriteMedias.some(
      (current) => current.id === id && current.mediaType === mediaType,
    ),
  );
  return (
    <button
      className={cn("flex cursor-pointer z-20 ml-auto", className)}
      onClick={
        isMediaInFavorites
          ? () => {
              removeMediaFromFavorite({ id, mediaType });

              toast.success("Removed succesfully", {
                description: `${title} removed from favorites.`,
              });
            }
          : () => {
              addMediaToFavorite({ id, mediaType });
              toast.success("Added succesfully", {
                description: `${title} added to favorites.`,
              });
            }
      }
    >
      <HeartIcon
        fill={isMediaInFavorites ? "currentColor" : "none"}
        className="w-6 h-6 text-red-700"
      />
    </button>
  );
}
