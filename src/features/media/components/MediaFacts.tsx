import { SkeletonArray } from "@/components/Skeleton";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReactNode } from "react";

export function MediaFacts({
  children,
  mediaType,
}: {
  children: ReactNode;
  mediaType: "movie" | "tv";
}) {
  return (
    <Card className="p-4">
      <h2 className="mb-4 text-lg font-semibold capitalize">
        {mediaType} Facts
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {children}
      </div>
    </Card>
  );
}

type MediaFactItemProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function MediaFactItem({ icon: Icon, label, value }: MediaFactItemProps) {
  return (
    <div className="flex flex-col border-2 rounded-lg p-2 bg-accent hover:bg-rose-500">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <h3>{label}</h3>
      </div>
      <span className="text-rose-700">{value}</span>
    </div>
  );
}

MediaFacts.Item = MediaFactItem;

export function MediaFactsSkeleton() {
  return (
    <Card className="space-y-4 p-4">
      <Skeleton className="h-7 w-32" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <SkeletonArray length={6}>
          <div className="animate-pulse space-y-2 rounded-lg border p-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </SkeletonArray>
      </div>
    </Card>
  );
}
