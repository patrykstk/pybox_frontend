import { getTaskWithAnswer } from "@/server/get-task-with-answer";

interface TaskDetailsProps {
  taskId: number;
  answerId: number;
}

const TaskDetails = async ({ taskId, answerId }: TaskDetailsProps) => {
  const response = await getTaskWithAnswer(taskId, answerId);

  if (!response) {
    return <div></div>;
  }

  const task = response.task;
  const answer = response.answer;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{task?.title}</h3>
        <p className="text-sm text-muted-foreground">
          Przesłane przez: {answer?.user.name} {answer?.user.surname} •{" "}
          {new Date(answer?.created_at).toLocaleDateString("pl-PL")}
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-2">Treść zadania:</h4>
        <div className="bg-muted p-4 rounded-md">
          <p>{task?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
