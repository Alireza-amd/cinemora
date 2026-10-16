import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Suspense, useEffect, useState } from "react";
import { Await, Link } from "react-router";
import { MediaCard, MediaCardSkeleton } from "./MediaCard";
import { SkeletonArray } from "@/components/Skeleton";
import type { MovieSchema } from "../constants/types";

type MovieSectionProps = {
  title: string;
  to: string;
  MoviesPromise: Promise<{ results: MovieSchema[] }>;
};

export function MovieSection({ title, to, MoviesPromise }: MovieSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollButtons();

    api.on("select", updateScrollButtons);
    api.on("reInit", updateScrollButtons);

    return () => {
      api.off("select", updateScrollButtons);
      api.off("reInit", updateScrollButtons);
    };
  }, [api]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="relative after:absolute after:h-full after:w-1 after:bg-rose-700 after:-left-3 text-accent-foreground text-lg capitalize">
          {title}
        </h1>
        <Button asChild variant="link" className="text-rose-700">
          <Link to={to}>View All</Link>
        </Button>
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full px-12"
      >
        <CarouselContent>
          <Suspense
            fallback={
              <SkeletonArray length={8}>
                <CarouselItem className="w-full md:basis-1/2 lg:basis-1/3">
                  <MediaCardSkeleton />
                </CarouselItem>
              </SkeletonArray>
            }
          >
            <Await resolve={MoviesPromise}>
              {(movies) =>
                movies.results.map((movie) => (
                  <CarouselItem
                    key={movie.id}
                    className="w-full md:basis-1/2 lg:basis-1/3"
                  >
                    <MediaCard {...movie} media_type="movie" />
                  </CarouselItem>
                ))
              }
            </Await>
          </Suspense>
        </CarouselContent>
        {canScrollPrev && (
          <CarouselPrevious className="left-0 cursor-pointer" />
        )}
        {canScrollNext && <CarouselNext className="right-0 cursor-pointer" />}
      </Carousel>
    </div>
  );
}
