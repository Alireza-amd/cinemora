import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FlameIcon, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { MediaSchema } from "@/features/media/constants/types";
import { getImageURL } from "@/services/baseImageURL";
import { Link } from "react-router";

type HeroSliderProps = {
  trendMedias: MediaSchema[];
};

export function HeroTrendMediaSlider({ trendMedias }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      setApi={(api) => {
        if (!api) return;

        setActiveIndex(api.selectedScrollSnap());

        api.on("select", () => {
          setActiveIndex(api.selectedScrollSnap());
        });
      }}
      className="w-full"
    >
      <CarouselContent className="py-4 md:py-12 lg:py-14">
        {trendMedias.map((trendMedia, index) => {
          const isActive = activeIndex === index;
          const isTVShow = trendMedia.media_type === "tv";
          const title = isTVShow ? trendMedia.name : trendMedia.title;

          return (
            <CarouselItem
              key={`${trendMedia.media_type}-${trendMedia.id}`}
              className={cn(
                "basis-[92%] sm:basis-4/5 md:basis-1/2 lg:basis-1/3",
                isActive ? "z-10" : "z-0",
              )}
            >
              <Card
                style={{
                  backgroundImage: `url(${getImageURL(
                    trendMedia.backdrop_path,
                  )})`,
                }}
                className={cn(
                  "relative aspect-4/3 sm:aspect-video overflow-hidden bg-cover bg-center border-0 transition-all duration-500",
                  isActive
                    ? "opacity-100 md:scale-120 lg:scale-135"
                    : "opacity-70 md:scale-80 lg:scale-65",
                )}
              >
                <CardContent className="absolute inset-0 flex flex-col items-start justify-start bg-linear-to-t from-black/95 via-black/30 to-transparent p-3 sm:p-4 md:p-6 select-none">
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-rose-500">
                    <FlameIcon className="size-4 shrink-0" />
                    TRENDING NOW
                  </span>

                  <div className="mt-auto w-full min-w-0">
                    <Link
                      to={`/${trendMedia.media_type}/${trendMedia.id}`}
                      className="block"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="min-w-0 wrap-break-words text-base font-bold text-white sm:text-xl md:text-2xl">
                          {title}
                        </h2>

                        <Badge className="shrink-0 bg-rose-700 text-[10px] text-white sm:text-xs">
                          {isTVShow ? "TV SHOW" : "MOVIE"}
                        </Badge>
                      </div>
                    </Link>

                    <div className="mt-2 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <div className="flex items-center gap-1">
                        <StarIcon
                          fill="currentColor"
                          className="size-4 shrink-0 text-yellow-500"
                        />

                        <span className="font-bold text-yellow-500">
                          {trendMedia.vote_average.toFixed(1)}
                        </span>

                        <span className="text-sm text-white">/10</span>
                      </div>

                      <Badge
                        variant="secondary"
                        className="bg-yellow-500 text-xs font-bold text-black"
                      >
                        IMDb
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious className="left-2 z-20 size-8 cursor-pointer border-white bg-black/70 text-white hover:bg-black hover:text-white sm:size-10" />

      <CarouselNext className="right-2 z-20 size-8 cursor-pointer border-white bg-black/70 text-white hover:bg-black hover:text-white sm:size-10" />
    </Carousel>
  );
}

export function HeroTrendMediaSliderSkeleton() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      setApi={(api) => {
        if (!api) return;

        setActiveIndex(api.selectedScrollSnap());

        api.on("select", () => {
          setActiveIndex(api.selectedScrollSnap());
        });
      }}
      className="w-full"
    >
      <CarouselContent className="py-4 md:py-12 lg:py-14">
        {Array.from({ length: 5 }).map((_, index) => {
          const isActive = activeIndex === index;

          return (
            <CarouselItem
              key={index}
              className="basis-[92%] sm:basis-4/5 md:basis-1/2 lg:basis-1/3"
            >
              <Card
                className={cn(
                  "relative aspect-4/3 animate-pulse overflow-hidden border-0 bg-black/80 sm:aspect-video",
                  "transition-all duration-500",
                  isActive
                    ? "opacity-100 md:scale-110 lg:scale-125"
                    : "opacity-70 md:scale-90 lg:scale-90",
                )}
              >
                <CardContent className="absolute inset-0 flex flex-col items-start justify-start bg-linear-to-t from-black/90 via-black/20 to-transparent p-3 sm:p-4 md:p-6">
                  <span className="flex items-center gap-1">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </span>

                  <div className="mt-auto flex w-full flex-col items-start gap-2">
                    <div className="flex w-full flex-wrap items-center gap-2">
                      <Skeleton className="h-5 w-36 max-w-full sm:h-6 sm:w-48" />
                      <Skeleton className="h-5 w-14" />
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-1">
                        <Skeleton className="size-4 rounded-full" />
                        <Skeleton className="h-4 w-10" />
                      </div>

                      <Skeleton className="h-5 w-12" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious
        disabled
        className="left-2 z-20 size-8 cursor-pointer border-white bg-black/70 text-white hover:bg-black hover:text-white sm:size-10"
      />

      <CarouselNext
        disabled
        className="right-2 z-20 size-8 cursor-pointer border-white bg-black/70 text-white hover:bg-black hover:text-white sm:size-10"
      />
    </Carousel>
  );
}
