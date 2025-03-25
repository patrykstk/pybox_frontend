import { getTaskWithId } from "@/server/get-task-with-id";
import { UpdateForm } from "@/app/(protected)/tasks/_components/update-form";

const TaskWithIdPage = async ({ params }: { params: { taskId: string } }) => {
  const myTask = await getTaskWithId(params.taskId);
  if (!myTask) return <div>pusto</div>;
  return (
    <div>
      <div>wjaaaat</div>
      <UpdateForm task={myTask} />
    </div>
  );
};

export default TaskWithIdPage;
