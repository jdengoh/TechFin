import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

interface VerdictBadgeProps {
  verdict: string;
}

export function VerdictBadge({ verdict }: VerdictBadgeProps) {
  return (
    <Badge className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300">
      <Flame className="h-3 w-3" />
      {verdict}
    </Badge>
  );
}
