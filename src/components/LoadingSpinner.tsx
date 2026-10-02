import { cn } from "cn";
import { Loader, LoaderIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

export function LoadingSpinner({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Loader>) {
  return (
    <LoaderIcon className={cn("w-4 h-4 animate-spin", className)} {...props} />
  );
}
