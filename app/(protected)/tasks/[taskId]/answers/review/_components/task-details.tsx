interface TaskDetailsProps {
  title: string;
  submittedBy: string;
  submittedAt: string;
  content: string;
}

const TaskDetails = ({
  title,
  submittedBy,
  submittedAt,
  content,
}: TaskDetailsProps) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">
        Przesłane przez: {submittedBy} •{" "}
        {new Date(submittedAt).toLocaleDateString("pl-PL")}
      </p>
    </div>

    <div>
      <h4 className="font-medium mb-2">Treść zadania:</h4>
      <div className="bg-muted p-4 rounded-md">
        <p>{content}</p>
      </div>
    </div>
  </div>
);

export default TaskDetails;
