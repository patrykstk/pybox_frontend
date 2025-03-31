import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorCardProps {
  onGoBack: () => void;
  answerId: string;
}

const ErrorForm = ({ onGoBack, answerId }: ErrorCardProps) => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="text-red-500">Błąd</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Nie znaleziono zadania o ID: {answerId}</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" onClick={onGoBack}>
        Powrót
      </Button>
    </CardFooter>
  </Card>
);

export { ErrorForm };
