import { GridTemplate } from "@/components/GridTemplate";
import { SkeletonArray } from "@/components/Skeleton";
import { MediaCardSkeleton } from "./MediaCard";

export function MediaGridSkeleton() {
  return (
    <GridTemplate>
      <SkeletonArray length={10}>
        <MediaCardSkeleton />
      </SkeletonArray>
    </GridTemplate>
  );
}
