"use client";

import { useEffect, useState } from "react";
import { TaskTableContent } from "@/app/(protected)/tasks/_components/task-table/task-table-content";
import { getTasks } from "@/server/get-tasks";
import { Task } from "@/interfaces/task";
import { level } from "@/types/level";

const AllTaskTable = () => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<level>("easy");
  const [tags, setTags] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks({ search, level, tags });
      setTasks(data?.data ?? []);
    };

    fetchTasks();
  }, [search, level, tags]);

  return (
    <div className="p-4">
      {/* Filtry */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Szukaj zadań..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Wszystkie poziomy</option>
          <option value="easy">Łatwy</option>
          <option value="medium">Średni</option>
          <option value="hard">Trudny</option>
          <option value="insane">bardzo Trudny</option>
        </select>

        <button
          onClick={() => {}}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filtruj: React & TypeScript
        </button>
      </div>

      {/* Tabela */}
      <TaskTableContent tasks={tasks} variant="solve" />
    </div>
  );
};

export { AllTaskTable };
