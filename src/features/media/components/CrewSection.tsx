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
import type { CrewSchema } from "../constants/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageURL } from "@/services/baseImageURL";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";
import { GridTemplate } from "@/components/GridTemplate";

type CrewSectionProps = {
  title: string;
  crewPromise: Promise<CrewSchema[]>;
};

export function CrewSection({ title, crewPromise }: CrewSectionProps) {
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

        <CrewsModal CrewsPromise={crewPromise} />
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
                <CarouselItem className="basis-1/2 pl-4 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <CrewCardSkeleton />
                </CarouselItem>
              </SkeletonArray>
            }
          >
            <Await resolve={crewPromise}>
              {(crews) =>
                crews.map((crew) => (
                  <CarouselItem
                    key={`${crew.id}-${crew.job}`}
                    className="basis-1/2 pl-4 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <CrewCard crew={crew} />
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

type CrewCardProps = {
  crew: CrewSchema;
};

export function CrewCard({ crew }: CrewCardProps) {
  return (
    <Card className="h-full min-w-0 overflow-hidden gap-0 py-0">
      <div className="aspect-2/3 w-full overflow-hidden bg-muted">
        {crew.profile_path ? (
          <img
            src={getImageURL(crew.profile_path)}
            alt={crew.name}
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
          {crew.name}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-xs sm:text-sm">
          {crew.job || "Unknown Job"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function CrewCardSkeleton() {
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

type CrewsModalProps = {
  CrewsPromise: Promise<CrewSchema[]>;
};

function CrewsModal({ CrewsPromise }: CrewsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="shrink-0 text-rose-700">
          View All
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[85dvh] flex-col gap-4 overflow-hidden sm:max-w-5xl">
        <DialogHeader className="shrink-0">
          <DialogTitle>All Crews</DialogTitle>
          <DialogDescription>
            Browse all available crews of this TV show.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <GridTemplate>
            <Suspense
              fallback={
                <SkeletonArray length={9}>
                  <CrewCardSkeleton />
                </SkeletonArray>
              }
            >
              <Await resolve={CrewsPromise}>
                {(crews) =>
                  crews.map((crew) => (
                    <CrewCard key={`${crew.id}-${crew.job}`} crew={crew} />
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
