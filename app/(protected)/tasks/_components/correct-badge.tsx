import { Badge } from "@/components/ui/badge";

interface CorrectBadgeProps {
  type: string;
}

const CorrectBadge = ({ type }: CorrectBadgeProps) => {
  return type === "0" ? (
    <Badge variant="destructive" className="bg-red-600">
      Błędne
    </Badge>
  ) : (
    <Badge variant="success">Poprawne</Badge>
  );
};

export default CorrectBadge;
