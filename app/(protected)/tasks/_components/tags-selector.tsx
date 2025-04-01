import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface TagsSelectorProps {
  disabled?: boolean;
}

const TagsSelector = ({ disabled }: TagsSelectorProps) => {
  const { register, setValue, watch } = useFormContext();
  const tags: string[] = watch("tags", []);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const addTag = () => {
    if (inputValue.trim() && !disabled) {
      setValue("tags", [...tags, inputValue.trim()]);
      setInputValue("");
      setInputVisible(false);
    }
  };

  const removeTag = (index: number) => {
    if (disabled) return;
    setValue(
      "tags",
      tags.filter((_: string, i: number) => i !== index),
    );
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 rounded-lg items-center">
      {tags.map((tag: string, index: number) => (
        <div
          key={index}
          className="flex items-center gap-1 px-3 bg-yellow-300 rounded-full text-gray-600"
        >
          <span>{tag}</span>
          {!disabled && (
            <Button
              variant="link"
              onClick={() => removeTag(index)}
              className="text-gray-600 hover:text-red-500"
              disabled={disabled}
            >
              <X size={14} />
            </Button>
          )}
        </div>
      ))}
      {inputVisible ? (
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            autoFocus
            className="w-32"
            disabled={disabled}
          />
          <Button
            onClick={addTag}
            variant={"ghost"}
            className="transition-all ease-in duration-200"
            disabled={disabled}
          >
            OK
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => !disabled && setInputVisible(true)}
          variant="ghost"
          className="transition-all ease-in duration-200 flex gap-x-2 bg-black text-white hover:bg-black/75 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          <span>Dodaj</span>
          <Plus size={16} />
        </Button>
      )}
      <input type="hidden" {...register("tags")} disabled={disabled} />
    </div>
  );
};

export { TagsSelector };
