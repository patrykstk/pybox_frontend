import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GoToAnswerButtonProps {
  taskId: string;
}

const GoToAnswersButton = ({ taskId }: GoToAnswerButtonProps) => {
  return (
    <Link href={`/tasks/${taskId}/answers/review/`}>
      <Button>Przejdź do odpowiedzi</Button>
    </Link>
  );
};

export { GoToAnswersButton };
