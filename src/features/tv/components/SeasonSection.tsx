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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getImageURL } from "@/services/baseImageURL";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDaysIcon,
  ClapperboardIcon,
  ImageIcon,
  StarIcon,
} from "lucide-react";
import { Await } from "react-router";
import { SkeletonArray } from "@/components/Skeleton";
import { formatDate, formatPlural } from "@/utils/formatter";
import type { SeasonSchema } from "../constants/types";
import { GridTemplate } from "@/components/GridTemplate";

type CastSectionProps = {
  title: string;
  to: string;
  seasonsPromise: Promise<SeasonSchema[]>;
};

export function SeasonSection({ title, seasonsPromise }: CastSectionProps) {
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
    <section className="w-full min-w-0 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="relative text-lg font-semibold capitalize text-accent-foreground after:absolute after:-left-3 after:top-0 after:h-full after:w-1 after:rounded-full after:bg-rose-700">
          {title}
        </h2>
        <SeasonsModal seasonsPromise={seasonsPromise} />
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="relative w-full min-w-0 px-8"
      >
        <CarouselContent className="-ml-4">
          <Suspense
            fallback={
              <SkeletonArray length={8}>
                <CarouselItem className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <SeasonCardSkeleton />
                </CarouselItem>
              </SkeletonArray>
            }
          >
            <Await resolve={seasonsPromise}>
              {(seasons) =>
                seasons.map((season) => (
                  <CarouselItem
                    key={`${season.id}`}
                    className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <SeasonCard season={season} />
                  </CarouselItem>
                ))
              }
            </Await>
          </Suspense>
        </CarouselContent>

        {canScrollPrev && (
          <CarouselPrevious className="-left-3 cursor-pointer" />
        )}

        {canScrollNext && <CarouselNext className="-right-3 cursor-pointer" />}
      </Carousel>
    </section>
  );
}

type SeasonCardProps = {
  season: SeasonSchema;
};

export function SeasonCard({ season }: SeasonCardProps) {
  return (
    <Card className="h-full min-w-0 overflow-hidden gap-0 py-0">
      <div className="aspect-2/3 w-full overflow-hidden bg-muted">
        {season.poster_path ? (
          <img
            src={getImageURL(season.poster_path)}
            alt={season.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="size-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardHeader className="gap-2 p-3">
        <CardTitle className="truncate text-sm sm:text-base">
          {season.name}
        </CardTitle>

        <CardDescription className="flex flex-col gap-2 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5">
            <ClapperboardIcon className="size-4 shrink-0" />
            {formatPlural(season.episode_count, {
              singular: "Episode",
              plural: "Episodes",
            })}
          </span>

          <span className="flex items-center gap-1.5">
            <CalendarDaysIcon className="size-4 shrink-0" />
            {formatDate(season.air_date, { dateStyle: "medium" })}
          </span>

          <span className="flex items-center gap-1.5">
            <StarIcon className="size-4 shrink-0 fill-yellow-500 text-yellow-500" />
            {season.vote_average.toFixed(1)}
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function SeasonCardSkeleton() {
  return (
    <Card className="h-full min-w-0 overflow-hidden gap-0 py-0">
      <Skeleton className="aspect-2/3 w-full rounded-none" />

      <CardHeader className="gap-2 p-3">
        <Skeleton className="h-4 w-3/4" />

        <CardDescription className="flex flex-col gap-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/4" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

type SeasonModalProps = {
  seasonsPromise: Promise<SeasonSchema[]>;
};

function SeasonsModal({ seasonsPromise }: SeasonModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="shrink-0 text-rose-700">
          View All
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[85dvh] flex-col gap-4 overflow-hidden sm:max-w-5xl">
        <DialogHeader className="shrink-0">
          <DialogTitle>All Seasons</DialogTitle>
          <DialogDescription>
            Browse all available seasons of this TV show.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <GridTemplate>
            <Suspense
              fallback={
                <SkeletonArray length={9}>
                  <SeasonCardSkeleton />
                </SkeletonArray>
              }
            >
              <Await resolve={seasonsPromise}>
                {(seasons) =>
                  seasons.map((season) => (
                    <SeasonCard key={season.id} season={season} />
                  ))
                }
              </Await>
            </Suspense>
          </GridTemplate>
        </div>
      </DialogContent>
    </Dialog>
  );
}
