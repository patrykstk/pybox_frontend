"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

interface TaskFieldProps {
  index: number;
  title: string;
  description?: string;
  children?: React.ReactNode;
  name: string;
  isSubtitle?: boolean;
  required?: boolean;
}

const TaskField = ({
  index,
  title,
  description,
  children,
  name,
  isSubtitle = false,
  required = false,
}: TaskFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-2">
          <FormLabel
            className={cn(
              "font-semibold",
              isSubtitle ? "text-lg" : "text-2xl ",
            )}
          >
            {index}. {title}
            {required && <span className="text-yellow-400">*</span>}
          </FormLabel>
          {description && (
            <FormDescription className="text-justify font-light">
              {description}
            </FormDescription>
          )}
          <FormControl>
            {children &&
              isValidElement(children) &&
              cloneElement(children, { ...field })}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { TaskField };
