"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { submitRating } from "@/server/rate-task";
import { LoadingSpinner } from "@/components/loading-spinner";
import { SubmittedForm } from "@/app/(protected)/tasks/[taskId]/answers/review/_components/submitted-form";
import { ErrorForm } from "@/app/(protected)/tasks/[taskId]/answers/review/_components/error-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskDetails from "@/app/(protected)/tasks/[taskId]/answers/review/_components/task-details";
import { RatingForm } from "@/app/(protected)/tasks/[taskId]/answers/review/_components/rating-form";

export default function ReviewAnswerPage() {
  const params = useParams();
  const { taskId, answerId } = params as { taskId: string; answerId: string };

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!answerId) {
      toast.error("Nie znaleziono ID odpowiedzi");
      return;
    }
    setLoading(false);
  }, [answerId]);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const result = await submitRating({ answerId, rating });

      if (result.success) {
        toast.success("Ocena została zapisana");
        setSubmitted(true);
        router.push(`/tasks/${taskId}/answers/review`);
      } else {
        toast.error(result.error || "Wystąpił błąd podczas zapisywania oceny");
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas zapisywania oceny");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (submitted)
    return (
      <SubmittedForm
        rating={rating}
        onGoBack={() => {
          router.push(`/tasks/${taskId}/answers/review`);
        }}
      />
    );
  if (!answerId)
    return <ErrorForm onGoBack={() => router.back()} answerId={answerId} />;

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Oceń odpowiedź</CardTitle>
        <CardDescription>Wybierz ocenę od 0 do 5 gwiazdek</CardDescription>
      </CardHeader>
      <CardContent>
        <TaskDetails taskId={Number(taskId)} answerId={Number(answerId)} />
        <RatingForm
          rating={rating}
          setRating={setRating}
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
}
