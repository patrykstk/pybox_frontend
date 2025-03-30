import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  Insane = "insane",
}

const difficultyLabels: Record<Difficulty, string> = {
  [Difficulty.Easy]: "Łatwy",
  [Difficulty.Medium]: "Średni",
  [Difficulty.Hard]: "Trudny",
  [Difficulty.Insane]: "Bardzo trudny",
};

const difficultyColors: Record<Difficulty, string> = {
  [Difficulty.Easy]: "bg-green-500 text-white hover:bg-green-600",
  [Difficulty.Medium]: "bg-yellow-500 text-black hover:bg-yellow-600",
  [Difficulty.Hard]: "bg-red-500 text-white hover:bg-red-600",
  [Difficulty.Insane]: "bg-red-700 text-red-300 hover:bg-red-900",
};

const DifficultySelector = () => {
  const { register, setValue, watch } = useFormContext();
  const selectedDifficulty = watch("level");

  return (
    <div className="flex flex-row gap-x-3">
      {Object.values(Difficulty).map((level) => {
        const isActive = selectedDifficulty === level;
        return (
          <Button
            key={level}
            type="button"
            className={cn(
              "px-4 py-2 rounded-lg cursor-pointer transition-all ease-in duration-150 text-sm",
              isActive
                ? difficultyColors[level]
                : "border border-white text-white hover:bg-white hover:text-black",
            )}
            onClick={() => setValue("level", level)}
          >
            {difficultyLabels[level]}
          </Button>
        );
      })}
      <Input type="hidden" {...register("level")} />
    </div>
  );
};

export { DifficultySelector };
