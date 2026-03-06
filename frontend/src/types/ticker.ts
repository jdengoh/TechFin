export interface Ticker {
  symbol: string;
  name: string;
  sector?: string;
}

export interface TickerSuggestion {
  ticker: string;
  quantity: number;
  reason: string;
}
