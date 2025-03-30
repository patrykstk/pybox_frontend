import { getTaskWithId } from "@/server/get-task-with-id";
import { SolveForm } from "@/app/(protected)/tasks/_components/solve-form";
import { getUserData } from "@/server/get-user-data";
import { getMyAnswerForTask } from "@/server/get-my-answer-for-task";

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
    return (
      <div>Już raz rozwiązałeś to zadanie. Otrzymałeś ocenę {answer.mark}</div>
    );
  }

  if (task?.created_by.id === user.id)
    return <div>co ty nie mozesz wykonac wlasnego zadania!</div>;

  if (!task) return <div>pusto</div>;
  return (
    <div>
      <div>wjaaaat</div>
      <SolveForm task={task} />
    </div>
  );
};

export default SolveTaskPage;
