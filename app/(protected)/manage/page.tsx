"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";

export default function TaskAnswersPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("/api/tasks", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.status === "success") {
          setTasks(data.data);
          if (data.data.length > 0) {
            setSelectedTask(data.data[0].id);
          }
        } else {
          setError(data.message || "Failed to fetch tasks");
        }
      } catch (err) {
        setError("An error occurred while fetching tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  useEffect(() => {
    const fetchAnswers = async () => {
      if (!selectedTask) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(`/api/task/${selectedTask}/answers`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.status === "success") {
          setAnswers(data.data);
        } else {
          setError(data.message || "Failed to fetch answers");
        }
      } catch (err) {
        setError("An error occurred while fetching answers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [selectedTask]);

  const handleDeleteAnswer = async (answerId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/answer/${answerId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === "success") {
        setAnswers(answers.filter((answer) => answer.id !== answerId));
        toast.success("Answer deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete answer");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the answer");
      console.error(err);
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button
              className="mt-4 w-full"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Task Answers</h1>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No tasks found</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs
          defaultValue={selectedTask?.toString()}
          onValueChange={(value) => setSelectedTask(Number.parseInt(value))}
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
                      ({task.level})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Loading answers...
                      </p>
                    </div>
                  ) : answers.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">
                      No answers for this task yet
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
                        {answers.map((answer) => (
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
                                ? "Pending"
                                : answer.is_correct
                                  ? "Yes"
                                  : "No"}
                            </TableCell>
                            <TableCell>
                              {answer.mark === null
                                ? "Not graded"
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
                                      Delete Answer
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      answer? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteAnswer(answer.id)
                                      }
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
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
