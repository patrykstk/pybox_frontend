import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { StarRating } from "@/app/(protected)/tasks/[taskId]/answers/review/_components/star-rating";

interface RatingFormProps {
  rating: number;
  setRating: (rating: number) => void;
  submitting: boolean;
  onSubmit: () => void;
}

const RatingForm = ({
  rating,
  setRating,
  submitting,
  onSubmit,
}: RatingFormProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label className="block font-medium mb-2">Twoja ocena:</label>
      <StarRating value={rating} onChange={setRating} allowHalf />
      <p className="text-xs text-muted-foreground mt-1">
        Kliknij na lewą połowę gwiazdki dla oceny połówkowej (np. 1.5, 2.5)
      </p>
    </div>

    <Button type="submit" disabled={submitting} className="w-full">
      {submitting ? (
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

export { RatingForm };
