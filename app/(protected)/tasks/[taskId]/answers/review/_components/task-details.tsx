import { useQuery } from "@tanstack/react-query";
import { getTaskWithAnswer } from "@/server/get-task-with-answer";

interface TaskDetailsProps {
  taskId: number;
  answerId: number;
}

const TaskDetails = ({ taskId, answerId }: TaskDetailsProps) => {
  const { data, status, error, isFetching } = useQuery({
    queryKey: ["taskDetails", taskId, answerId],
    queryFn: () => getTaskWithAnswer(taskId, answerId),
  });

  if (status === "pending") {
    return <div>Ładowanie...</div>;
  }

  if (status === "error") {
    return (
      <div>
        Błąd ładowania danych:{" "}
        {error instanceof Error ? error.message : "Nieznany błąd"}
      </div>
    );
  }

  if (!data) {
    return <div>Brak danych</div>;
  }

  const task = data.task;
  const answer = data.answer;

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

      <div>{isFetching ? "Aktualizacja w tle..." : " "}</div>
    </div>
  );
};

export default TaskDetails;
