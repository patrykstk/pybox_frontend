"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TaskPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevPageUrl: string | null;
  nextPageUrl: string | null;
}

const TaskPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  prevPageUrl,
  nextPageUrl,
}: TaskPaginationProps) => {
  const generatePaginationItems = () => {
    const items = [];

    items.push(
      <PaginationItem key="first">
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;

      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (prevPageUrl) {
                const prevPage = new URL(prevPageUrl).searchParams.get("page");
                if (prevPage) {
                  onPageChange(parseInt(prevPage, 10));
                }
              }
            }}
            className={prevPageUrl ? "" : "pointer-events-none opacity-50"}
          />
        </PaginationItem>

        {generatePaginationItems()}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (nextPageUrl) {
                const nextPage = new URL(nextPageUrl).searchParams.get("page");
                if (nextPage) {
                  onPageChange(parseInt(nextPage, 10));
                }
              }
            }}
            className={nextPageUrl ? "" : "pointer-events-none opacity-50"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { TaskPagination };
