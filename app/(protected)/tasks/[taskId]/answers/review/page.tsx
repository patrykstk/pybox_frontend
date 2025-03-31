"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { getAnswersForTask } from "@/server/get-answers-for-task";
import { Answer } from "@/interfaces/answer";
import { ApiResponse } from "@/interfaces/api-response";

interface Answers extends ApiResponse {
  data: Answer[];
}
const TestAnswers = () => {
  const router = useRouter();
  const { taskId } = useParams() as { taskId: string };

  const {
    data: answers,
    isLoading,
    isError,
  } = useQuery<Answers>({
    queryKey: ["answers", taskId],
    queryFn: () => getAnswersForTask(taskId),
  });

  const handleViewAnswer = (answer: Answer) => {
    router.push(`/tasks/${taskId}/answers/review/${answer.id}`);
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError || !answers || answers.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p>Brak odpowiedzi dla tego zadania.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Odpowiedzi na zadanie</h1>
      <Card>
        <CardHeader>
          <CardTitle>Odpowiedzi do zadania o nr. #{taskId}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Użytkownik</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Ocena</th>
                  <th className="text-left py-3 px-4">Oddano</th>
                  <th className="text-right py-3 px-4">Przejdź do</th>
                </tr>
              </thead>
              <tbody>
                {answers.data.map((answer: Answer) => (
                  <tr key={answer.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      {answer.user.name} {answer.user.surname}
                    </td>
                    <td className="py-3 px-4">
                      {answer.is_correct === null ? (
                        <Badge variant="outline">Oczekuje na wykonanie</Badge>
                      ) : answer.is_correct ? (
                        <Badge variant="success">Correct</Badge>
                      ) : (
                        <Badge variant="destructive">Błędne</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {answer.mark !== null ? answer.mark : "Brak oceny"}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(answer.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewAnswer(answer)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Podgląd
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAnswers;

function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-8 w-48 mb-6" />
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
