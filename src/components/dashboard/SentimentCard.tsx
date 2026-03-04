import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentItem, SentimentVariant } from "@/types/sentiment";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentCardProps {
  title: string;
  items: SentimentItem[];
  variant: SentimentVariant;
}

export function SentimentCard({ title, items, variant }: SentimentCardProps) {
  const isHot = variant === "hot";

  return (
    <Card
      className={cn(
        "border",
        isHot
          ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
          : "border-rose-200 bg-rose-50/50 dark:border-rose-900 dark:bg-rose-950/20"
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          {isHot ? (
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-600" />
          )}
          <span className={isHot ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}>
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.name}</span>
              <span
                className={cn(
                  "text-xs font-semibold",
                  isHot ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                )}
              >
                {Math.round(item.score * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isHot ? "bg-emerald-500" : "bg-rose-500"
                )}
                style={{ width: `${item.score * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
