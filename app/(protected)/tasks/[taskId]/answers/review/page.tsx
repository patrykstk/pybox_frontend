"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { getAnswersForTask } from "@/server/get-answers-for-task";
import { Author } from "@/interfaces/author";

interface User {
  id: number;
  name: string;
  surname: string;
}

interface Answer {
  id: number;
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
  created_at: string;
  updated_at: string;
  user: User;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface ApiResponse {
  status: string;
  current_page: number;
  data: Answer[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Answer {
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
  created_at: string;
  user: Author;
}

interface Answers extends ApiResponse {
  data: Answer[];
}

export default function TestAnswers() {
  const router = useRouter();
  const params = useParams();
  const { taskId } = params as { taskId: string };

  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAnswers(currentPage);
  }, [currentPage]);

  const fetchAnswers = async (page: number) => {
    setLoading(true);
    try {
      const response = await getAnswersForTask(taskId);
      setAnswers(response);
    } catch (error) {
      console.error("Error fetching answers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewAnswer = (answer: Answer) => {
    //router.push(`/tasks/${taskId}/answers/review/${answer.id}`);
    router.push(`/tasks/${taskId}/answers/review/3`);
  };

  if (loading && !answers) {
    return <LoadingSkeleton />;
  }

  if (!answers) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p>Failed to load answers. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Test Answers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Answers for Task #{taskId}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Mark</th>
                  <th className="text-left py-3 px-4">Submitted</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {answers.data.map((answer) => (
                  <tr key={answer.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      {answer.user.name} {answer.user.surname}
                    </td>
                    <td className="py-3 px-4">
                      {answer.is_correct === null ? (
                        <Badge variant="outline">Pending</Badge>
                      ) : answer.is_correct ? (
                        <Badge>Correct</Badge>
                      ) : (
                        <Badge variant="destructive">Incorrect</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {answer.mark !== null ? answer.mark : "Not graded"}
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
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {answers.data.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No answers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
