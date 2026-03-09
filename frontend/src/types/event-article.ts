export type WorldEventCategory =
  | "US-China Trade War"
  | "Ukraine-Russia Conflict"
  | "AI Regulation"
  | "Fed Rate Decisions"
  | "Energy Crisis";

export interface TickerSentiment {
  ticker: string;
  score: number;
}

export interface EventArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string; // "20260307T091122" format
  url: string;
  sentimentScore: number; // overall article sentiment (-1 to 1)
  tickerSentiment: TickerSentiment[];
  imageUrl: string;
  category: WorldEventCategory;
}
