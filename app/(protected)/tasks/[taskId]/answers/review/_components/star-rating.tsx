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
  allowHalf?: boolean;
  allowZero?: boolean;
}

export function StarRating({
  value,
  onChange,
  max = 5,
  size = "md",
  readOnly = false,
  allowHalf = true,
  allowZero = true,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const starSize = sizes[size];

  // Funkcja do określania wartości gwiazdki na podstawie pozycji kursora
  const calculateRating = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (!allowHalf) return index + 1;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const halfWidth = rect.width / 2;

    // Jeśli kursor jest w lewej połowie, zwróć wartość .5, w przeciwnym razie pełną wartość
    return x < halfWidth ? index + 0.5 : index + 1;
  };

  // Funkcja do resetowania oceny do 0
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
          ? Math.floor(value) >= starValue
          : hoverValue
            ? Math.floor(hoverValue) >= starValue
            : Math.floor(value) >= starValue;

        const isHalfFilled = readOnly
          ? !isFullyFilled && value >= index + 0.5
          : !isFullyFilled &&
            (hoverValue ? hoverValue >= index + 0.5 : value >= index + 0.5);

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
              if (!readOnly && allowHalf) {
                setHoverValue(calculateRating(e, index));
              }
            }}
            onMouseEnter={() => {
              if (!readOnly && !allowHalf) {
                setHoverValue(index + 1);
              }
            }}
            onMouseLeave={() => !readOnly && setHoverValue(0)}
            disabled={readOnly}
            aria-label={`Ocena ${starValue} z ${max}`}
          >
            {/* Pełna lub pusta gwiazdka */}
            <Star
              className={cn(
                starSize,
                "transition-colors",
                isFullyFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-muted-foreground",
              )}
            />

            {/* Półgwiazdka - nakładka */}
            {isHalfFilled && (
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: "50%" }}
              >
                <Star
                  className={cn(starSize, "fill-yellow-400 text-yellow-400")}
                />
              </div>
            )}
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
