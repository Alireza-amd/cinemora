import { cn } from "cn";
import type { ComponentProps } from "react";

type GridTemplateProps = ComponentProps<"div">;
export function GridTemplate({
  children,
  className,
  ...props
}: GridTemplateProps) {
  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
