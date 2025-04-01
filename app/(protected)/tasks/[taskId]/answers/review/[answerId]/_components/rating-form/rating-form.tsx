import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { StarSelector } from "@/app/(protected)/tasks/[taskId]/answers/review/[answerId]/_components/rating-form/star-selector";
import { submitRating } from "@/server/rate-task";

interface RatingFormProps {
  answerId: string;
  rating: number;
  setRating: (rating: number) => void;
  onSubmit: () => void;
}

const RatingForm = ({
  answerId,
  rating,
  setRating,
  onSubmit,
}: RatingFormProps) => {
  const mutation = useMutation({
    mutationFn: () => submitRating({ answerId, rating }),
    onSuccess: (data) => {
      if (!data.success) {
        alert(data.error);
      } else {
        alert("Ocena zapisana!");
        onSubmit();
      }
    },
    onError: () => {
      alert("Wystąpił błąd. Spróbuj ponownie.");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block font-medium mb-2">Twoja ocena:</label>
        <StarSelector value={rating} onChange={setRating} />
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Zapisywanie...
          </>
        ) : (
          "Zapisz ocenę"
        )}
      </Button>
    </form>
  );
};

export { RatingForm };
