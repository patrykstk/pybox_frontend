import { level } from "@/types/level";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  text: string;
  variant: level;
  className?: string;
}

const DifficultyBadge = ({
  text,
  variant,
  className,
}: DifficultyBadgeProps) => {
  const badgeStyling: Record<level, string> = {
    easy: "bg-green-500 text-green-700",
    medium: "bg-yellow-500 text-yellow-800",
    hard: "bg-red-500 text-red-800",
    insane: "bg-violet-500 text-violet-800",
  };

  return <Badge className={cn(badgeStyling[variant], className)}>{text}</Badge>;
};

export { DifficultyBadge };
