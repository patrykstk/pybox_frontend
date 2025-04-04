"use client";

import { useState } from "react";
import { TaskTableContent } from "@/app/(protected)/tasks/_components/task-table/task-table-content";
import { getTasks } from "@/server/get-tasks";
import type { level } from "@/types/level";
import { useQuery } from "@tanstack/react-query";
import { TaskPagination } from "@/app/(protected)/tasks/_components/task-table/task-pagination";
import { TaskFilters } from "@/app/(protected)/tasks/_components/task-table/task-filters";

const AllTaskTable = () => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<level | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["tasks", search, level, tags, page],
    queryFn: () => getTasks({ search, level, tags, page }),
    staleTime: 1000 * 60 * 5,
  });

  if (error) return <div>error</div>;

  const tasks = data?.data || [];

  const totalPages = data?.last_page || 1;
  const prevPageUrl = data?.prev_page_url || null;
  const nextPageUrl = data?.next_page_url || null;

  const handleApplyFilters = (filters: {
    search: string;
    level: level | undefined;
    tags: string[];
  }) => {
    setSearch(filters.search);
    setLevel(filters.level);
    setTags(filters.tags);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setLevel(undefined);
    setTags([]);
    setPage(1);
  };

  if (isLoading) {
    return <div>Ładowanie zadań...</div>;
  }

  return (
    <div className="space-y-6">
      <TaskFilters
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        currentSearch={search}
        currentLevel={level}
        currentTags={tags}
      />

      {isFetching ? (
        <div className="py-4 text-center text-muted-foreground">
          Odświeżanie danych...
        </div>
      ) : (
        <TaskTableContent tasks={tasks} variant="solve" />
      )}

      {totalPages > 1 && (
        <TaskPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          prevPageUrl={prevPageUrl}
          nextPageUrl={nextPageUrl}
        />
      )}
    </div>
  );
};

export { AllTaskTable };
