import { getTaskWithId } from "@/server/get-task-with-id";
import { SolveForm } from "@/app/(protected)/tasks/_components/solve-form";

const SolveTaskPage = async ({ params }: { params: { taskId: string } }) => {
  const myTask = await getTaskWithId(params.taskId);
  if (!myTask) return <div>pusto</div>;
  return (
    <div>
      <div>wjaaaat</div>
      <SolveForm task={myTask} />
    </div>
  );
};

export default SolveTaskPage;
