import { Article } from "@/types/article";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { VerdictBadge } from "./VerdictBadge";
import { ExternalLink } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

function formatDate(dateStr: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="mb-2">
          {article.verdict && <VerdictBadge verdict={article.verdict} />}
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {article.title}
        </h3>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {article.summary}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-muted-foreground">
            {article.source}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Read More
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  );
}
