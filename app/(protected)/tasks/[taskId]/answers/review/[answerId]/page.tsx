"use client";

import { useParams, useRouter } from "next/navigation";
import { RatingForm } from "@/app/(protected)/tasks/[taskId]/answers/review/[answerId]/_components/rating-form/rating-form";
import { useState } from "react";
import { ErrorForm } from "@/app/(protected)/tasks/[taskId]/answers/review/[answerId]/_components/error-form";
import { SubmittedForm } from "@/app/(protected)/tasks/[taskId]/answers/review/[answerId]/_components/submitted-form";
import { useQuery } from "@tanstack/react-query";
import { getTaskWithAnswer } from "@/server/get-task-with-answer";
import { Loader2 } from "lucide-react";
import { TaskDetails } from "@/app/(protected)/tasks/[taskId]/answers/review/[answerId]/_components/task-details";

const ReviewAnswerPage = () => {
  const router = useRouter();
  const params = useParams();
  const { taskId, answerId } = params as { taskId: string; answerId: string };
  const [rating, setRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { data, status } = useQuery({
    queryKey: ["taskDetails", taskId, answerId],
    queryFn: () => getTaskWithAnswer(Number(taskId), Number(answerId)),
  });

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleGoBack = () => {
    router.push(`/tasks/${taskId}/answers/review`);
  };

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <ErrorForm onGoBack={() => window.history.back()} answerId={answerId} />
    );
  }

  return (
    <div className="space-y-6">
      <TaskDetails task={data.task} answer={data.answer} />
      {submitted ? (
        <SubmittedForm rating={rating} onGoBack={handleGoBack} />
      ) : (
        <RatingForm
          answerId={answerId}
          rating={rating}
          setRating={setRating}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ReviewAnswerPage;
