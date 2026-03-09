import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { EventArticle } from "@/types/event-article";
import { getSentimentInfo } from "@/lib/sentiment-utils";

interface ArticleDetailModalProps {
  article: EventArticle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ArticleDetailModal({
  article,
  open,
  onOpenChange,
}: ArticleDetailModalProps) {
  const overallSentiment = getSentimentInfo(article.sentimentScore);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0 overflow-hidden">
        <div className="flex h-full max-h-[80vh]">
          {/* Left — takes remaining space */}
          <div className="flex-1 flex flex-col border-r border-border min-w-0">
            <div className="p-6 pb-4 border-b border-border">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold leading-snug pr-6">
                  {article.title}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  {article.source} · {article.category}
                </p>
              </DialogHeader>
            </div>
            <ScrollArea className="flex-1 p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
              <div className="mt-6">
                <Button asChild size="sm" variant="outline">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Read Article
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </ScrollArea>
          </div>

          {/* Right — sizes to content */}
          <div className="flex-shrink-0 w-auto min-w-[190px] flex flex-col">
            <div className="p-4 pb-3 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Overall Sentiment
              </p>
              <Badge className={overallSentiment.badgeClasses}>
                {overallSentiment.label}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                Score: {article.sentimentScore.toFixed(2)}
              </p>
            </div>
            <div className="p-4 pb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Ticker Sentiment
              </p>
            </div>
            <ScrollArea className="flex-1 px-4 pb-4">
              <div className="space-y-3">
                {article.tickerSentiment.map((ts) => {
                  const sentiment = getSentimentInfo(ts.score);
                  return (
                    <div
                      key={ts.ticker}
                      className="flex flex-col gap-1 pb-3 border-b border-border/40 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-mono font-medium">
                          {ts.ticker}
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {ts.score > 0 ? "+" : ""}
                          {ts.score.toFixed(2)}
                        </span>
                      </div>
                      <Badge className={sentiment.badgeClasses + " w-fit"}>
                        {sentiment.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
