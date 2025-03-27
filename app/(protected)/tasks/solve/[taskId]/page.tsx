import { getTaskWithId } from "@/server/get-task-with-id";
import { SolveForm } from "@/app/(protected)/tasks/_components/solve-form";
import { getUserData } from "@/server/get-user-data";

const SolveTaskPage = async ({ params }: { params: { taskId: string } }) => {
  const user = await getUserData();
  const myTask = await getTaskWithId(params.taskId);

  if (myTask?.created_by.id === user.id)
    return <div>co ty nie mozesz wykonac wlasnego zadania!</div>;

  if (!myTask) return <div>pusto</div>;
  return (
    <div>
      <div>wjaaaat</div>
      <SolveForm task={myTask} />
    </div>
  );
};

export default SolveTaskPage;
