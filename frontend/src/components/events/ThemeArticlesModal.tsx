import { ExternalLink, Newspaper, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGraphNewsByTheme } from "@/hooks/useGraphNewsByTheme";
import { getSentimentInfo } from "@/lib/sentiment-utils";
import type { GraphTheme } from "@/hooks/useGraphThemes";

interface Props {
  theme: GraphTheme | null;
  onClose: () => void;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function ThemeArticlesModal({ theme, onClose }: Props) {
  const { articles, isLoading, error } = useGraphNewsByTheme(theme?.name ?? null);

  const avgSentiment = theme?.avgSentiment ?? null;
  const sentimentInfo = avgSentiment !== null ? getSentimentInfo(avgSentiment) : null;

  return (
    <Dialog open={!!theme} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg font-semibold leading-tight">
                {theme?.name}
              </DialogTitle>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{articles.length} article{articles.length !== 1 ? "s" : ""}</span>
                {sentimentInfo && (
                  <Badge className={sentimentInfo.badgeClasses + " text-xs"}>
                    {sentimentInfo.label}
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0 -mt-1" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {isLoading && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Newspaper className="h-8 w-8 mb-2 opacity-30" />
              <p className="text-sm">Could not load articles for this theme.</p>
            </div>
          )}

          {!isLoading && !error && articles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Newspaper className="h-8 w-8 mb-2 opacity-30" />
              <p className="text-sm">No articles found for this theme.</p>
            </div>
          )}

          {!isLoading && !error && articles.map((article) => {
            const sentiment = article.sentimentScore !== null
              ? getSentimentInfo(article.sentimentScore)
              : null;

            return (
              <div
                key={article.newsId}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug line-clamp-2">
                    {article.title}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                    {article.source && <span>{article.source}</span>}
                    {article.publishedAt && (
                      <>
                        <span>·</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </>
                    )}
                    {sentiment && (
                      <Badge className={sentiment.badgeClasses + " text-xs"}>
                        {sentiment.label}
                      </Badge>
                    )}
                  </div>
                </div>
                {article.url && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Read
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
