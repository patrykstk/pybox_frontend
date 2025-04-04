"use client";

import { type KeyboardEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { level } from "@/types/level";

interface TaskFiltersProps {
  onApplyFilters: (filters: {
    search: string;
    level: level | undefined;
    tags: string[];
  }) => void;
  onResetFilters: () => void;
  currentSearch: string;
  currentLevel: level | undefined;
  currentTags: string[];
}

const TaskFilters = ({
  onApplyFilters,
  onResetFilters,
  currentSearch,
  currentLevel,
  currentTags,
}: TaskFiltersProps) => {
  const [tempSearch, setTempSearch] = useState(currentSearch);
  const [tempLevel, setTempLevel] = useState<level | undefined>(currentLevel);
  const [tempTags, setTempTags] = useState<string[]>(currentTags);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setTempSearch(currentSearch);
    setTempLevel(currentLevel);
    setTempTags(currentTags);
  }, [currentSearch, currentLevel, currentTags]);

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tempTags.includes(tagInput.trim())) {
        setTempTags([...tempTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTempTags(tempTags.filter((t) => t !== tag));
  };

  const applyFilters = () => {
    onApplyFilters({
      search: tempSearch,
      level: tempLevel,
      tags: tempTags,
    });
  };

  const resetFilters = () => {
    setTempSearch("");
    setTempLevel(undefined);
    setTempTags([]);
    setTagInput("");
    onResetFilters();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Szukaj zadań..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <Select
          value={tempLevel}
          onValueChange={(value) =>
            setTempLevel(value === "all" ? undefined : (value as level))
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Poziom trudności" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie poziomy</SelectItem>
            <SelectItem value="easy">Łatwy</SelectItem>
            <SelectItem value="medium">Średni</SelectItem>
            <SelectItem value="hard">Trudny</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Dodaj tag i naciśnij Enter..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            className="w-full"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <Button
            onClick={applyFilters}
            className="w-full md:w-auto bg-yellow-400 text-black hover:bg-yellow-300"
          >
            Zastosuj filtry
          </Button>

          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full md:w-auto"
          >
            Resetuj filtry
          </Button>
        </div>
      </div>

      {tempTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tempTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 flex items-center justify-center"
            >
              {tag}
              <Button variant={"ghost"} onClick={() => removeTag(tag)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export { TaskFilters };
