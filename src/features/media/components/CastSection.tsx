import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense, useEffect, useState } from "react";
import { Await } from "react-router";
import { SkeletonArray } from "@/components/Skeleton";
import type { CastSchema } from "../constants/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageURL } from "@/services/baseImageURL";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";

type CastSectionProps = {
  title: string;
  castPromise: Promise<CastSchema[]>;
};

export function CastSection({ title, castPromise }: CastSectionProps) {
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

        <CastModal CastPromise={castPromise} />
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="relative w-full min-w-0 sm:px-8"
      >
        <CarouselContent className="-ml-4">
          <Suspense
            fallback={
              <SkeletonArray length={8}>
                <CarouselItem className="basis-1/3 pl-4 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                  <CastCardSkeleton />
                </CarouselItem>
              </SkeletonArray>
            }
          >
            <Await resolve={castPromise}>
              {(casts) =>
                casts.length > 0 &&
                casts.map((cast) => (
                  <CarouselItem
                    key={`${cast.id}-${cast.character}`}
                    className="basis-1/3 pl-4 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                  >
                    <CastCard cast={cast} />
                  </CarouselItem>
                ))
              }
            </Await>
          </Suspense>
        </CarouselContent>

        {canScrollPrev && (
          <CarouselPrevious className="hidden sm:flex -left-3 cursor-pointer" />
        )}

        {canScrollNext && (
          <CarouselNext className="hidden sm:flex -right-3 cursor-pointer" />
        )}
      </Carousel>
    </section>
  );
}

type CastCardProps = {
  cast: CastSchema;
};

export function CastCard({ cast }: CastCardProps) {
  return (
    <Card className="h-full min-w-0 overflow-hidden gap-0 py-0">
      <div className="aspect-2/3 w-full overflow-hidden bg-muted">
        {cast.profile_path ? (
          <img
            src={getImageURL(cast.profile_path)}
            alt={cast.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <UserIcon className="size-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardHeader className="gap-1 p-3">
        <CardTitle className="truncate text-sm sm:text-base">
          {cast.name}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-xs sm:text-sm">
          {cast.character || "Unknown character"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function CastCardSkeleton() {
  return (
    <Card className="h-full min-w-0 overflow-hidden gap-0 py-0">
      <Skeleton className="aspect-2/3 w-full rounded-none" />

      <CardHeader className="gap-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
    </Card>
  );
}

type CastModalProps = {
  CastPromise: Promise<CastSchema[]>;
};

function CastModal({ CastPromise }: CastModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="shrink-0 text-rose-700">
          View All
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[85dvh] flex-col gap-4 overflow-hidden sm:max-w-5xl">
        <DialogHeader className="shrink-0">
          <DialogTitle>All Casts</DialogTitle>
          <DialogDescription>Browse all available Casts.</DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5">
            <Suspense
              fallback={
                <SkeletonArray length={9}>
                  <CastCardSkeleton />
                </SkeletonArray>
              }
            >
              <Await resolve={CastPromise}>
                {(casts) =>
                  casts.map((cast) => (
                    <CastCard
                      key={`${cast.id}-${cast.character}`}
                      cast={cast}
                    />
                  ))
                }
              </Await>
            </Suspense>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
