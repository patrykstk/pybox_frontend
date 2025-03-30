import { getTaskWithId } from "@/server/get-task-with-id";
import { UpdateForm } from "@/app/(protected)/tasks/_components/update-form";
import { GoToAnswersButton } from "@/app/(protected)/tasks/_components/go-to-answers-button";

const TaskWithIdPage = async ({ params }: { params: { taskId: string } }) => {
  const myTask = await getTaskWithId(params.taskId);
  if (!myTask) return <div>pusto</div>;
  return (
    <div>
      <div>wjaaaat</div>
      <UpdateForm task={myTask} />
      <GoToAnswersButton taskId={params.taskId} />
    </div>
  );
};

export default TaskWithIdPage;
