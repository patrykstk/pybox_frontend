"use client";

import { useEffect, useState } from "react";
import { TaskTableContent } from "@/app/(protected)/tasks/_components/task-table/task-table-content";
import { getMyTasks } from "@/server/get-my-tasks";
import { getUserData } from "@/server/get-user-data";
import type { level } from "@/types/level";
import { useQuery } from "@tanstack/react-query";
import { TaskFilters } from "@/app/(protected)/tasks/_components/task-table/task-filters";
import { TaskPagination } from "@/app/(protected)/tasks/_components/task-table/task-pagination";

const MyTaskTable = () => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<level | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(),
  });

  useEffect(() => {
    if (userData) {
      setUserId(userData.id);
    }
  }, [userData]);

  const {
    data: tasksData,
    isLoading: isLoadingTasks,
    isFetching,
  } = useQuery({
    queryKey: ["myTasks", userId, search, level, tags, page],
    queryFn: () =>
      getMyTasks({
        page,
        userID: userId as number,
        search,
        level,
        tags,
      }),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  const tasks = tasksData?.data || [];
  const totalPages = tasksData?.last_page || 1;
  const prevPageUrl = tasksData?.prev_page_url || null;
  const nextPageUrl = tasksData?.next_page_url || null;

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

  if (isLoadingUser || (isLoadingTasks && !isFetching)) {
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
        <TaskTableContent tasks={tasks} variant="edit" />
      )}

      <TaskPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        prevPageUrl={prevPageUrl}
        nextPageUrl={nextPageUrl}
      />
    </div>
  );
};

export { MyTaskTable };
