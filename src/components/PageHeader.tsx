import { cn } from "cn";
import type { ReactNode } from "react";

type PageHeaderProps = {
  children: ReactNode;
  subtitle?: string;
  buttonSection?: ReactNode;
};
export function PageHeader({
  children,
  subtitle,
  buttonSection,
}: PageHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h1
          className={cn(
            "font-bold text-3xl sm:text-5xl",
            subtitle ? "mb-4" : "mb-8",
          )}
        >
          {children}
        </h1>
        {buttonSection && (
          <div className="flex items-center justify-center gap-2">
            {buttonSection}
          </div>
        )}
      </div>
      {subtitle && <p className="mb-8 text-xl">{subtitle}</p>}
    </>
  );
}
