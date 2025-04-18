"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DifficultyBadge } from "@/app/(protected)/tasks/_components/task-table/difficulty-badge";
import { Task } from "@/interfaces/models/task";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface TaskTableContentProps {
  tasks: Task[];
  variant: "solve" | "edit";
}

const TaskTableContent = ({ tasks, variant }: TaskTableContentProps) => {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Tytuł</TableHead>
          <TableHead>Poziom</TableHead>
          <TableHead>Autor</TableHead>
          <TableHead>Aktualizacja</TableHead>
          <TableHead>Tagi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TableRow
              key={task.id}
              onClick={
                variant === "edit"
                  ? () => router.push(`/tasks/my/${task.id}`)
                  : () => router.push(`/tasks/solve/${task.id}`)
              }
              className="cursor-pointer hover:bg-accent transition"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <DifficultyBadge variant={task.level} text={task.level} />
              </TableCell>
              <TableCell>
                {variant === "edit" ? (
                  <span>Ty</span>
                ) : (
                  <span>
                    {task.created_by.name} {task.created_by.surname}
                  </span>
                )}
              </TableCell>
              <TableCell>{formatDate(task.updated_at)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-8 text-muted-foreground"
            >
              Brak zadań do wyświetlenia
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { TaskTableContent };
