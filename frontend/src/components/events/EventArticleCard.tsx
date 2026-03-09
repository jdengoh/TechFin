import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { EventArticle } from "@/types/event-article";
import { getSentimentInfo } from "@/lib/sentiment-utils";
import { ArticleDetailModal } from "./ArticleDetailModal";

function formatDate(dateStr: string) {
  // "20260307T091122" → "2026-03-07T09:11:00"
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const hour = dateStr.slice(9, 11);
  const min = dateStr.slice(11, 13);
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(`${year}-${month}-${day}T${hour}:${min}:00`));
  } catch {
    return dateStr;
  }
}

interface EventArticleCardProps {
  article: EventArticle;
}

export function EventArticleCard({ article }: EventArticleCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative w-full overflow-hidden rounded-xl aspect-[4/3] text-left cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {/* Background image */}
        <img
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Top: Category pill */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm border border-white/20">
            {article.category}
          </span>
        </div>

        {/* Bottom: Title + source + tickers */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-white leading-snug mb-1.5">
            {article.title}
          </h3>
          <p className="text-xs text-white/70 mb-2.5">
            {article.source} · {formatDate(article.publishedAt)}
          </p>
          <div className="flex flex-wrap gap-1">
            {article.tickerSentiment.map((ts) => {
              const { badgeClasses } = getSentimentInfo(ts.score);
              return (
                <Badge key={ts.ticker} className={badgeClasses}>
                  {ts.ticker}
                </Badge>
              );
            })}
          </div>
        </div>
      </button>

      <ArticleDetailModal
        article={article}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
