"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import CodeDisplay from "./code-display";

interface User {
  id: number;
  name: string;
  surname: string;
}

interface Answer {
  code: string;
  output: string | null;
  is_correct: boolean | null;
  mark: number | null;
  created_at: string;
  updated_at: string;
  user: User;
}

interface AnswerDetailProps {
  answer: Answer;
  onClose: () => void;
}

export default function AnswerDetail({ answer, onClose }: AnswerDetailProps) {
  return (
    <div>
      <Button variant="ghost" onClick={onClose} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to answers
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Answer by {answer.user.name} {answer.user.surname}
            </CardTitle>
            <div className="flex items-center gap-3">
              {answer.is_correct === null ? (
                <Badge variant="outline">Pending</Badge>
              ) : answer.is_correct ? (
                <Badge variant="success">Correct</Badge>
              ) : (
                <Badge variant="destructive">Incorrect</Badge>
              )}

              {answer.mark !== null && (
                <Badge variant="secondary">Mark: {answer.mark}</Badge>
              )}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Submitted on {new Date(answer.created_at).toLocaleString()}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Code</h3>
            <CodeDisplay code={answer.code} language="python" />
          </div>

          {answer.output && (
            <div>
              <h3 className="text-lg font-medium mb-2">Output</h3>
              <CodeDisplay code={answer.output} language="plaintext" />
            </div>
          )}
        </CardContent>

        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date(answer.updated_at).toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
