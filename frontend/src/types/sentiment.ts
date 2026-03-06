export type SentimentVariant = "hot" | "risky";

export interface SentimentItem {
  name: string;
  score: number;
  description: string;
}

export interface SentimentData {
  hotSectors: SentimentItem[];
  riskySectors: SentimentItem[];
  hotRegions: SentimentItem[];
  riskyRegions: SentimentItem[];
}
