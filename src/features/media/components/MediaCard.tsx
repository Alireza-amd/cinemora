import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "lucide-react";
import { Link } from "react-router";
import type { MediaSchema } from "../constants/types";
import { formatDate } from "@/utils/formatter";
import { getImageURL } from "@/services/baseImageURL";
import { useGenres } from "../hooks/useGenres";
import FavoriteButton from "./FavoriteButton";

type MediaCardProps = {
  showMediaType?: boolean;
} & MediaSchema;

export function MediaCard({ showMediaType = false, ...media }: MediaCardProps) {
  const {
    id,
    media_type: mediaType,
    poster_path,
    vote_average,
    genre_ids,
  } = media;
  const isMovie = mediaType === "movie";
  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  const { tvGenres, movieGenres } = useGenres();
  const mediaTypeGenres = isMovie ? movieGenres : tvGenres;
  const mediaGenres = mediaTypeGenres.filter(({ id }) =>
    genre_ids.includes(id),
  );

  return (
    <Card
      className="relative bg-center bg-cover aspect-3/4 overflow-hidden group"
      style={{
        backgroundImage: `url(${getImageURL(poster_path)})`,
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
        style={{
          backgroundImage: `url(${getImageURL(poster_path)})`,
        }}
      />
      <div className="flex items-center px-4">
        {showMediaType && (
          <Badge className="bg-rose-700 text-white p-3 text-xs sm:text-sm font-bold">
            {mediaType}
          </Badge>
        )}
        <FavoriteButton id={id} mediaType={mediaType} title={title} />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 via-20% to-black/0" />
      <Link to={`/${mediaType}/${id}`}>
        <CardHeader className="absolute bottom-0 left-0 right-0 p-4">
          <CardTitle className="text-base sm:text-lg lg:text-xl text-white">
            {title}
          </CardTitle>
          <CardDescription className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm">
            <div className="hidden lg:flex flex-wrap gap-1 line-clamp-1">
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
              <StarIcon
                fill="currentColor"
                className="size-3 sm:size-4 text-yellow-600"
              />
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
      <Skeleton className="aspect-3/4 w-full bg-black/15" />
      <div className="flex items-center justify-between px-4 absolute left-0 right-0 top-4">
        {showMediaType && <Skeleton className="w-1/5 h-6" />}
        <Skeleton className="w-8 h-8" />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 via-20% to-black/0" />
      <CardHeader className="absolute bottom-0 left-0 right-0 p-4">
        <CardTitle className="text-base sm:text-lg lg:text-xl">
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
