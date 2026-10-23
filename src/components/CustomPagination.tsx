import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";

type CustomPaginationProps = {
  page: number;
  totalPages: number;
};

export function CustomPagination({ page, totalPages }: CustomPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (totalPages <= 1) return null;

  function getPageUrl(targetPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", targetPage.toString());

    return params;
  }

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const pages = new Set<number>([
    1,
    ...(page > 1 ? [page - 1] : []),
    page,
    ...(page < totalPages ? [page + 1] : []),
  ]);

  const visiblePages = [...pages].sort((a, b) => a - b);

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setSearchParams(getPageUrl(page - 1));
              }}
            />
          </PaginationItem>
        )}

        {visiblePages.map((pageNumber, index) => {
          const previousPage = visiblePages[index - 1];
          const hasGap =
            previousPage !== undefined && pageNumber - previousPage > 1;

          return (
            <span key={pageNumber} className="contents">
              {hasGap && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    setSearchParams(getPageUrl(pageNumber));
                  }}
                  isActive={pageNumber === page}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            </span>
          );
        })}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setSearchParams(getPageUrl(page + 1));
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
