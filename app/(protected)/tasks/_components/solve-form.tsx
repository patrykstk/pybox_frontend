"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { Editor } from "@monaco-editor/react";
import { LoadingSpinner } from "@/app/(protected)/tasks/_components/loading-spinner";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Task } from "@/interfaces/task";
import { answerTask } from "@/server/answer-task";
import { answerSchema } from "@/schemas/answer-schema";
import { useState } from "react";
import { defaultCode } from "@/constants/default-code";

const SolveForm = ({ task }: { task: Task }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, title, content } = task;

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      code: defaultCode,
    },
  });

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    setIsSubmitting(true);
    const response = await answerTask(values, id);

    if (response) router.push("/home");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-3xl">Zadanie pod tytułem: {title}</h1>
        <p className="text-lg">{content}</p>
        <Editor
          language="python"
          defaultLanguage="python"
          theme="vs-dark"
          defaultValue={defaultCode}
          className="h-72 w-full"
          loading={<LoadingSpinner />}
          value={form.watch("code")}
          onChange={(value) => form.setValue("code", value || "")}
        />

        <Button
          className="bg-emerald-500 mb-10"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Przekierowywanie..." : "Prześlij odpowiedź"}
        </Button>
      </form>
    </Form>
  );
};

export { SolveForm };
