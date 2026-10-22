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
      <CarouselContent className="md:py-12 lg:py-14">
        {trendMedias.map((trendMedia, index) => {
          const isActive = activeIndex === index;
          const isTVShow = trendMedia.media_type === "tv";
          return (
            <CarouselItem
              key={trendMedia.id}
              className="lg:basis-1/3 md:basis-1/2"
            >
              <Card
                style={{
                  backgroundImage: `url(${getImageURL(trendMedia.backdrop_path)})`,
                }}
                className={cn(
                  "relative aspect-video overflow-hidden bg-cover bg-center border-0 transition-all duration-500",
                  isActive
                    ? "md:scale-110 lg:scale-140 opacity-100"
                    : "md:scale-90 lg:scale-60 opacity-60",
                )}
              >
                <CardContent className="absolute inset-0 flex flex-col items-start justify-start bg-linear-to-t from-black/90 via-black/20 to-transparent p-6 select-none">
                  <span className="text-rose-700 text-sm flex">
                    <FlameIcon className="w-4 h-4" />
                    TRNENDING NOW
                  </span>
                  <div className="mt-auto">
                    <Link to={`/${trendMedia.media_type}/${trendMedia.id}`}>
                      <h1 className="text-white font-bold text-2xl text-wrap flex items-center gap-2">
                        {isTVShow ? trendMedia.name : trendMedia.title}
                        <Badge className="bg-rose-700 text-white">
                          {isTVShow ? "TV SHOW" : "MOVIE"}
                        </Badge>
                      </h1>
                    </Link>
                    <div className="flex flex-col">
                      <div className="flex gap-1 items-center">
                        <StarIcon
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        />
                        <span className="text-yellow-500 font-bold scale-115">
                          {trendMedia.vote_average.toFixed(1)}
                        </span>
                        <span className="text-white">/10</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-500 text-black font-bold"
                      >
                        IMDB
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-2 z-20 cursor-pointer bg-black/70 text-white border-white hover:bg-black hover:text-white" />
      <CarouselNext className="right-2 z-20 cursor-pointer bg-black/70 text-white border-white hover:bg-black hover:text-white" />
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
      <CarouselContent className="md:py-12 lg:py-14">
        {Array.from({ length: 5 }).map((_, index) => {
          const isActive = activeIndex === index;

          return (
            <CarouselItem
              key={index}
              className="lg:basis-1/3 md:basis-1/2 cursor-pointer"
            >
              <Card
                className={cn(
                  "relative aspect-video overflow-hidden bg-cover bg-center border-0 transition-all duration-500 bg-black/80 animate-pulse",
                  isActive
                    ? "md:scale-110 lg:scale-140 opacity-100"
                    : "md:scale-90 lg:scale-60 opacity-60",
                )}
              >
                <CardContent className="absolute inset-0 flex flex-col items-start justify-start bg-linear-to-t from-black/90 via-black/20 to-transparent p-6">
                  <span className="text-rose-700 text-sm flex">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-20 h-4" />
                  </span>
                  <div className="mt-auto flex flex-col gap-1">
                    <Skeleton className="w-36 h-5" />
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1 items-center">
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="w-12 h-4" />
                      </div>
                      <Skeleton className="w-12 h-4" />
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
        className="left-2 z-20 cursor-pointer bg-black/70 text-white border-white hover:bg-black hover:text-white animate-pulse"
      />
      <CarouselNext
        disabled
        className="right-2 z-20 cursor-pointer bg-black/70 text-white border-white hover:bg-black hover:text-white animate-pulse"
      />
    </Carousel>
  );
}
