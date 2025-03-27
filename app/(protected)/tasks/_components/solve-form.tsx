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

const SolveForm = ({ task }: { task: Task }) => {
  const router = useRouter();

  const { id, title, content, input, code, level, tags } = task;

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      code: code,
    },
  });

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    const response = await answerTask(values, id);

    if (response) router.push("/home");
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-3xl">
          Rozwiązywanie zadania: <span className="font-extrabold">{title}</span>
        </h1>
        <p>{content}</p>
        <Editor
          language="python"
          defaultLanguage="python"
          theme="vs-dark"
          className="h-72 w-full"
          loading={<LoadingSpinner />}
          value={form.watch("code")}
          onChange={(value) => form.setValue("code", value || "")}
        />

        <Button className="bg-emerald-500 mb-10" type="submit">
          Prześlij odpowiedź
        </Button>
      </form>
    </Form>
  );
};

export { SolveForm };
