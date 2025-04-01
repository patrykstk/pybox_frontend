import { getTaskWithId } from "@/server/get-task-with-id";
import { SolveForm } from "@/app/(protected)/tasks/_components/solve-form";
import { getUserData } from "@/server/get-user-data";
import { getMyAnswerForTask } from "@/server/get-my-answer-for-task";
import { DisableOwnTest } from "@/app/(protected)/tasks/_components/disable-own-test";
import { TestGrade } from "@/app/(protected)/tasks/_components/test-grade";
import { TaskNotFound } from "@/app/(protected)/tasks/_components/task-not-found";

const SolveTaskPage = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) => {
  const { taskId } = await params;

  const user = await getUserData();
  const task = await getTaskWithId(taskId);
  const answer = await getMyAnswerForTask(taskId);

  if (answer && answer.status === "success") {
    return <TestGrade mark={answer.mark} />;
  }

  if (task && user && Number(task.created_by.id) === user.id)
    return <DisableOwnTest />;

  if (!task) return <TaskNotFound />;

  return (
    <div className="flex flex-col w-full space-y-5">
      <h1 className="text-5xl uppercase font-bold">Rozwiązywanie zadania</h1>
      <SolveForm task={task} />
    </div>
  );
};

export default SolveTaskPage;
