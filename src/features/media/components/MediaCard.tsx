import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HeartIcon, StarIcon } from "lucide-react";
import { Link } from "react-router";
import type { MediaSchema } from "../constants/types";
import { formatDate } from "@/utils/dateFormatter";
import { getImageURL } from "@/services/baseImageURL";
import {
  addMediaToFavorite,
  removeMediaFromFavorite,
  useFavoriteMediaStore,
} from "../stores/useFavoriteMediaStore";
import { toast } from "sonner";
import { useGenres } from "../hooks/useGenres";

type MediaCardProps = {
  showMediaType?: boolean;
} & MediaSchema;

export function MediaCard({ showMediaType = false, ...media }: MediaCardProps) {
  const {
    id,
    media_type: mediaType,
    backdrop_path,
    vote_average,
    genre_ids,
  } = media;
  const isMovie = mediaType === "movie";
  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  const isMediaInFavorites = useFavoriteMediaStore((state) =>
    state.favoriteMedias.some(
      (current) => current.id === id && current.mediaType === mediaType,
    ),
  );
  const { tvGenres, movieGenres } = useGenres();
  const mediaTypeGenres = isMovie ? movieGenres : tvGenres;
  const mediaGenres = mediaTypeGenres.filter(({ id }) =>
    genre_ids.includes(id),
  );

  return (
    <Card
      className="relative bg-center bg-cover aspect-video"
      style={{
        backgroundImage: `url(${getImageURL(backdrop_path)})`,
      }}
    >
      <div className="flex items-center px-4">
        {showMediaType && (
          <Badge className="bg-rose-700  text-white p-3 font-bold">
            {mediaType}
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="cursor-pointer z-20 ml-auto"
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
            className="w-4 h-4 text-red-700"
          />
        </Button>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black  via-black/80 via-20% to-black/0" />
      <Link to={`/${isMovie ? "movie" : "tv"}/${id}`}>
        <CardHeader className="absolute bottom-0 left-0 right-0 p-4">
          <CardTitle className="text-lg text-white">{title}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              <span>
                {releaseDate
                  ? formatDate(releaseDate, { year: "numeric" })
                  : "Release date unknown"}
              </span>
              {mediaGenres.map((genre) => (
                <span
                  key={genre.id}
                  className="hover:border-rose-700 border-transparent border-b-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <span className="flex gap-1 items-center">
              <StarIcon fill="currentColor" className="text-yellow-600" />
              <span className="text-white">{vote_average.toFixed(1)}</span>
            </span>
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}

export function MediaCardSkeleton({
  showMediaType = true,
}: {
  showMediaType?: boolean;
}) {
  return (
    <Card className="relative py-0">
      <Skeleton className="aspect-video w-full bg-black/15" />
      <div className="flex items-center justify-between px-4 absolute left-0 right-0 top-4">
        {showMediaType && <Skeleton className="w-1/5 h-6" />}
        <Skeleton className="w-8 h-8 " />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black  via-black/80 via-20% to-black/0" />

      <CardHeader className="absolute bottom-0 left-0 right-0 p-4">
        <CardTitle className="text-lg ">
          <Skeleton className="w-1/3 h-6" />
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <Skeleton className="w-1/4 h-6" />
          <div className="flex gap-1 items-center">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
