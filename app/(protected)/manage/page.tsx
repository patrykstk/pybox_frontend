"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { getModTasks } from "@/server/get-mod-tasks";
import { deleteAnswer, getTaskAnswers } from "@/server/get-task-answers";
import { DifficultyBadge } from "@/app/(protected)/tasks/_components/task-table/difficulty-badge";
import { getUserData } from "@/server/get-user-data";
import Forbidden from "@/components/forbidden";

export default function TaskAnswersPage() {
  const queryClient = useQueryClient();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(),
  });

  const {
    data: tasksData,
    isLoading: isTasksLoading,
    error: tasksError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const result = await getModTasks();
      return result;
    },
  });

  useEffect(() => {
    if (tasksData?.data?.length && !selectedTaskId) {
      setSelectedTaskId(tasksData.data[0].id);
    }
  }, [tasksData, selectedTaskId]);

  const { data: answersData, isLoading: isAnswersLoading } = useQuery({
    queryKey: ["answers", selectedTaskId],
    queryFn: async () => {
      if (!selectedTaskId) return null;
      return getTaskAnswers(selectedTaskId);
    },
    enabled: !!selectedTaskId,
  });

  const deleteMutation = useMutation({
    mutationFn: (answerId: number) => deleteAnswer(answerId),
    onSuccess: (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: ["answers", selectedTaskId],
        });

        toast.success("Pomyślnie usunięto odpowiedź");
      } else {
        toast.error(data?.message || "Błąd podczas usuwania odpowiedzi");
      }
    },
    onError: (error) => {
      toast.error("Błąd podczas usuwania");
      console.error(error);
    },
  });

  const handleDeleteAnswer = (answerId: number) => {
    deleteMutation.mutate(answerId);
  };

  const tasks = tasksData?.data || [];

  if (
    !isLoadingUser &&
    userData &&
    !userData.roles.includes("manager") &&
    !userData.roles.includes("moderator")
  ) {
    return <Forbidden />;
  }

  if (isTasksLoading && !tasksData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Ładowanie zadań...</p>
        </div>
      </div>
    );
  }

  if (tasksError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load tasks</p>
            <Button
              className="mt-4 w-full"
              onClick={() => window.location.reload()}
            >
              Spróbuj ponownie
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Odpowiedzi do zadań</h1>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Nie znaleziono żadnych zadań
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs
          value={selectedTaskId?.toString()}
          onValueChange={(value) => setSelectedTaskId(Number.parseInt(value))}
          className="w-full"
        >
          <TabsList className="mb-4 flex flex-wrap h-auto">
            {tasks.map((task) => (
              <TabsTrigger
                key={task.id}
                value={task.id.toString()}
                className="mb-2"
              >
                {task.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tasks.map((task) => (
            <TabsContent key={task.id} value={task.id.toString()}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {task.title}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      <DifficultyBadge
                        text={
                          task.level.charAt(0).toUpperCase() +
                          task.level.slice(1)
                        }
                        variant={task.level}
                      />
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAnswersLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Ładuje odpowiedzi..
                      </p>
                    </div>
                  ) : !answersData?.data || answersData.data.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">
                      Jeszcze nikt tego zadania nie zrobił.
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Output</TableHead>
                          <TableHead>Correct</TableHead>
                          <TableHead>Mark</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {answersData.data.map((answer) => (
                          <TableRow key={answer.id}>
                            <TableCell>
                              {answer.user.name} {answer.user.surname}
                            </TableCell>
                            <TableCell className="font-mono text-xs max-w-[200px] truncate">
                              {answer.code}
                            </TableCell>
                            <TableCell className="font-mono text-xs max-w-[200px] truncate">
                              {answer.output || "N/A"}
                            </TableCell>
                            <TableCell>
                              {answer.is_correct === null
                                ? "Oczekuje"
                                : answer.is_correct
                                  ? "Tak"
                                  : "Nie"}
                            </TableCell>
                            <TableCell>
                              {answer.mark === null
                                ? "Brak oceny"
                                : answer.mark}
                            </TableCell>
                            <TableCell>
                              {new Date(answer.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Usuwanie odpowiedzi
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Czy napewno chcesz usunąć odpowiedź tego
                                      użytkownika?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Anuluj
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteAnswer(answer.id)
                                      }
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Usuń
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
