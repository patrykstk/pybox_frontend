import { TaskTableContent } from "@/app/(protected)/tasks/_components/task-table/task-table-content";
import { getMyTasks } from "@/server/get-my-tasks";
import { getUserData } from "@/server/get-user-data";

const TaskTable = async () => {
  const user = await getUserData();
  const tasks = await getMyTasks({ page: 1, userID: user.id });
  return (
    <div>
      <TaskTableContent tasks={tasks?.data ?? []} />
    </div>
  );
};

export default TaskTable;
