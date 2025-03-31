"use client";

import { useEffect, useState } from "react";
import { TaskTableContent } from "@/app/(protected)/tasks/_components/task-table/task-table-content";
import { getMyTasks } from "@/server/get-my-tasks";
import { getUserData } from "@/server/get-user-data";
import { useQuery } from "@tanstack/react-query";

const MyTaskTable = () => {
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

  const { data: tasksData, isLoading: isLoadingTasks } = useQuery({
    queryKey: ["myTasks", userId, page],
    queryFn: () => getMyTasks({ page, userID: userId as number }),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  const tasks = tasksData?.data || [];

  if (isLoadingUser || isLoadingTasks) {
    return <div>Loading...</div>;
  }

  return <TaskTableContent tasks={tasks} variant="edit" />;
};

export { MyTaskTable };
