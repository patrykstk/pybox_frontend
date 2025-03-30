import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/app/(protected)/tasks/[taskId]/answers/review/_components/star-rating";

interface SubmittedCardProps {
  rating: number;
  onGoBack: () => void;
}

const SubmittedForm = ({ rating, onGoBack }: SubmittedCardProps) => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle>Dziękujemy za ocenę!</CardTitle>
      <CardDescription>Twoja ocena została zapisana.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-medium">Twoja ocena:</span>
        <StarRating value={rating} onChange={() => {}} readOnly allowHalf />
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" onClick={onGoBack}>
        Powrót
      </Button>
    </CardFooter>
  </Card>
);

export { SubmittedForm };
