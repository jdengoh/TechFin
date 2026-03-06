import { Article } from "@/types/article";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST = process.env.RAPIDAPI_YAHOO_FINANCE_HOST ?? "yahoo-finance15.p.rapidapi.com";

export async function fetchYahooFinanceNews(): Promise<Article[]> {
  if (!RAPIDAPI_KEY || RAPIDAPI_KEY === "your_rapidapi_key_here") {
    console.warn("[yahoo-finance] No API key configured, returning mock data");
    return getMockArticles();
  }

  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/api/v1/markets/news?tickers=AAPL,MSFT,GOOGL,NVDA&type=ALL`,
      {
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`);
    }

    const data = await response.json();
    const items = data?.body ?? data?.news ?? [];

    return items.slice(0, 12).map((item: Record<string, unknown>, index: number) => ({
      id: (item.id as string) ?? String(index),
      title: (item.title as string) ?? "No title",
      summary: (item.summary as string) ?? (item.description as string) ?? "No summary available.",
      source: (item.source as string) ?? (item.publisher as string) ?? "Yahoo Finance",
      publishedAt: (item.pubDate as string) ?? (item.published_at as string) ?? new Date().toISOString(),
      url: (item.link as string) ?? (item.url as string) ?? "#",
      thumbnail: (item.img as string) ?? undefined,
      verdict: "Hot Sector: Energy",
    }));
  } catch (error) {
    console.error("[yahoo-finance] Fetch error:", error);
    return getMockArticles();
  }
}

function getMockArticles(): Article[] {
  return [
    {
      id: "mock-1",
      title: "Energy Sector Surges as Oil Prices Hit 6-Month High",
      summary:
        "Crude oil prices climbed sharply this week as OPEC+ maintained production cuts. Energy stocks across the S&P 500 outperformed all other sectors.",
      source: "Yahoo Finance",
      publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      url: "#",
      verdict: "Hot Sector: Energy",
    },
    {
      id: "mock-2",
      title: "Tech Giants Report Strong Q4 Earnings Amid AI Investment Boom",
      summary:
        "Microsoft, Google, and Amazon all beat analyst expectations as cloud computing and AI infrastructure spending continue to drive revenue growth.",
      source: "Yahoo Finance",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      url: "#",
      verdict: "Hot Sector: Technology",
    },
    {
      id: "mock-3",
      title: "Federal Reserve Signals Potential Rate Cut in Q2",
      summary:
        "Fed Chair indicated the central bank may begin easing monetary policy as inflation trends toward the 2% target, boosting financial sector stocks.",
      source: "Yahoo Finance",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      url: "#",
      verdict: "Hot Sector: Financials",
    },
    {
      id: "mock-4",
      title: "Healthcare Stocks Under Pressure After Drug Pricing Legislation",
      summary:
        "Pharmaceutical companies saw sharp declines after Congress advanced new drug pricing reform bills. Biotech sector particularly hard hit.",
      source: "Yahoo Finance",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      url: "#",
      verdict: "Hot Sector: Energy",
    },
    {
      id: "mock-5",
      title: "Semiconductor Supply Chain Stabilizes, Chip Stocks Rally",
      summary:
        "Global semiconductor supply chains have largely normalized after years of disruption. NVIDIA, AMD, and TSMC shares rose on improved outlook.",
      source: "Yahoo Finance",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      url: "#",
      verdict: "Hot Sector: Technology",
    },
    {
      id: "mock-6",
      title: "Consumer Staples Defensive Plays See Increased Inflows",
      summary:
        "As market volatility increases, investors rotate into defensive consumer staples stocks. Procter & Gamble and Coca-Cola see highest inflows in months.",
      source: "Yahoo Finance",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      url: "#",
      verdict: "Hot Sector: Energy",
    },
  ];
}
