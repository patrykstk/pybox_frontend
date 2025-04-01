"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { taskSchema } from "@/schemas/task-schema";
import { TaskField } from "@/app/(protected)/tasks/_components/task";
import { Input } from "@/components/ui/input";
import { DifficultySelector } from "@/app/(protected)/tasks/_components/difficulty-selector";
import { TagsSelector } from "@/app/(protected)/tasks/_components/tags-selector";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@monaco-editor/react";
import { LoadingSpinner } from "@/app/(protected)/tasks/_components/loading-spinner";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Task } from "@/interfaces/task";
import { updateTask } from "@/server/update-task";
import { deleteTask } from "@/server/delete-task";

const UpdateForm = ({ task }: { task: Task }) => {
  const router = useRouter();

  const { id, title, content, input, code, level, tags } = task;

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: title,
      level: level,
      tags: tags,
      content: content,
      input: input,
      code: code,
    },
  });

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    const response = await updateTask(values, id);
    if (response) router.push("/home");
  }

  async function onDelete() {
    const response = await deleteTask(task.id);
    if (response) router.push("/home");
    console.log("Koniec funkcji delete");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-10 w-full">
          <TaskField
            index={1}
            title="Nazwa testu"
            description="Wprowadź nazwe zadania, pod którym zostanie ono wyświetlone dla użytkownika."
            name="title"
            required
          >
            <Input />
          </TaskField>
          <TaskField
            index={2}
            title="Poziom trudności"
            description="Wybór odpowiedniego poziomu trudności ma kluczowe znaczenie dla dopasowania zadania do umiejętności rozwiązujących. Wybierz spośród czterech dostępnych poziomów, aby zadanie było odpowiednie do aktualnych kompetencji uczestników, umożliwiając im rozwój lub wyzwanie w odpowiedniej formie."
            name="level"
            required
          >
            <DifficultySelector />
          </TaskField>
          <TaskField index={3} title="Tagi" name="tags">
            <TagsSelector />
          </TaskField>
          <TaskField
            index={4}
            title="Treść zadania"
            description="W tej sekcji wprowadź szczegółowy opis zadania, uwzględniając wymagania, oczekiwane wyniki oraz wszelkie istotne informacje, które będą potrzebne do jego rozwiązania. Pamiętaj, aby wyjaśnić, jakie kroki należy podjąć, aby rozwiązać zadanie, oraz jakie są kryteria jego oceny."
            name="content"
            required
          >
            <Textarea className="min-h-24" />
          </TaskField>
          <TaskField
            index={5}
            title="Dane wejściowe"
            description="Jeżeli są, to należy je oddzielić średnikiem ;"
            name="input"
          >
            <Input />
          </TaskField>

          <TaskField
            index={6}
            title="Przykładowe rozwiązanie"
            description="W tej sekcji należy wpisać przykładowe rozwiązanie zadania, które będzie używane do weryfikacji poprawności wyników. W przypadku zadań programistycznych, kod powinien być napisany w wybranym języku (np. Python), a także spełniać określone wymagania testowe. Możesz dodać dodatkowe uwagi dotyczące możliwych błędów lub wskazówek do rozwiązania."
            name="code"
            required
          >
            <Editor
              language="python"
              defaultLanguage="python"
              theme="vs-dark"
              className="h-72 w-full"
              loading={<LoadingSpinner />}
            />
          </TaskField>
          <div className="w-full flex flex-row gap-x-5 items-center justify-center">
            <Button className="bg-emerald-500" type="submit">
              Zaaktualizuj test
            </Button>
            <Button className="bg-red-600" onClick={onDelete}>
              Usuń test
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { UpdateForm };
