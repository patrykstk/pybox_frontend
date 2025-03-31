import { getTaskWithId } from "@/server/get-task-with-id";
import { UpdateForm } from "@/app/(protected)/tasks/_components/update-form";
import { GoToAnswersButton } from "@/app/(protected)/tasks/_components/go-to-answers-button";

const TaskWithIdPage = async ({ params }: { params: { taskId: string } }) => {
  const resolvedParams = await params;
  const { taskId } = resolvedParams;

  const myTask = await getTaskWithId(taskId);

  if (!myTask) return <div>pusto, nie ma takiego testu</div>;

  return (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <h1 className="text-5xl uppercase font-bold">Aktualizacja zadania</h1>
        <h6 className="text-xl ">
          Wybierz dowolne pole które chcesz zmodyfikować.
        </h6>
      </div>

      <UpdateForm task={myTask} />
      <GoToAnswersButton taskId={taskId} />
    </div>
  );
};

export default TaskWithIdPage;
