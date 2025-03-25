import { TaskTableContent } from "@/app/(protected)/tasks/_components/task-table/task-table-content";
import { getMyTasks } from "@/server/get-my-tasks";

const TaskTable = async () => {
  const tasks = await getMyTasks({ page: 1, userID: 3 });
  return (
    <div>
      <TaskTableContent tasks={tasks?.data ?? []} />
    </div>
  );
};

export default TaskTable;
