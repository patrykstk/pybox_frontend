import { LoadingSpinner } from "@/app/(protected)/tasks/_components/loading-spinner";
import { Editor } from "@monaco-editor/react";

interface TaskDetailsProps {
  task: { title: string; content: string } | null;
  answer: {
    user: { name: string; surname: string };
    code: string;
    created_at: string;
  } | null;
}

const TaskDetails = ({ task, answer }: TaskDetailsProps) => {
  if (!task || !answer) {
    return (
      <div className="text-red-500">Nie znaleziono zadania lub odpowiedzi.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{task.title}</h3>
        <p className="text-sm text-muted-foreground">
          Przesłane przez: {answer.user.name} {answer.user.surname} •{" "}
          {new Date(answer.created_at).toLocaleDateString("pl-PL")}
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-2">Treść zadania:</h4>
        <div className="bg-muted p-4 rounded-md">
          <p>{task.content}</p>
        </div>
        <h4 className="font-medium mb-2">Przesłany kod:</h4>
        <div className="bg-muted p-4 rounded-md">
          <Editor
            language="python"
            defaultLanguage="python"
            theme="vs-dark"
            options={{ domReadOnly: true, readOnly: true }}
            defaultValue={answer.code}
            className="h-72 w-full"
            loading={<LoadingSpinner />}
          />
        </div>
      </div>
    </div>
  );
};

export { TaskDetails };
