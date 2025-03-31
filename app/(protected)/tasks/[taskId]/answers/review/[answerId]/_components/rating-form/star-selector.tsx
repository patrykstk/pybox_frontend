"use client";

import type React from "react";
import { useState } from "react";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  allowZero?: boolean;
}

export function StarSelector({
  value,
  onChange,
  max = 5,
  size = "md",
  readOnly = false,
  allowZero = true,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const starSize = sizes[size];

  const calculateRating = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    return index + 1;
  };

  const clearRating = () => {
    if (!readOnly && allowZero) {
      onChange(0);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {allowZero && !readOnly && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full p-1 hover:bg-muted",
            value === 0 ? "text-primary" : "text-muted-foreground",
          )}
          onClick={clearRating}
          title="0 z 5"
        >
          <X className={cn("w-4 h-4")} />
        </Button>
      )}

      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        const isFullyFilled = readOnly
          ? value >= starValue
          : hoverValue
            ? hoverValue >= starValue
            : value >= starValue;

        return (
          <button
            key={index}
            type="button"
            className={cn(
              "focus:outline-none transition-colors relative",
              readOnly ? "cursor-default" : "cursor-pointer",
            )}
            onClick={(e) => !readOnly && onChange(calculateRating(e, index))}
            onMouseMove={(e) => {
              if (!readOnly) {
                setHoverValue(calculateRating(e, index));
              }
            }}
            onMouseEnter={() => {
              if (!readOnly) {
                setHoverValue(index + 1);
              }
            }}
            onMouseLeave={() => !readOnly && setHoverValue(0)}
            disabled={readOnly}
            aria-label={`Ocena ${starValue} z ${max}`}
          >
            <Star
              className={cn(
                starSize,
                "transition-colors",
                isFullyFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-muted-foreground",
              )}
            />
          </button>
        );
      })}

      {!readOnly && (
        <span className="ml-2 text-sm text-muted-foreground">
          {`${value} z ${max}`}
        </span>
      )}
    </div>
  );
}
