"use client";

import { useState } from "react";
import { TaskTableContent } from "@/app/(protected)/tasks/_components/task-table/task-table-content";
import { getTasks } from "@/server/get-tasks";
import { level } from "@/types/level";
import { useQuery } from "@tanstack/react-query";

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

  const tasks = data?.data || [];

  if (isLoading || isFetching) {
    return <div>Ładuje testy...</div>;
  }

  return <TaskTableContent tasks={tasks} variant="solve" />;
};

export { AllTaskTable };
