import { SocialPost } from "@/types/social";

// TODO: Replace with real scraping / Twitter API v2 integration
// Currently returns mock data for UI boilerplate purposes

export const MOCK_TWITTER_POSTS: SocialPost[] = [
  {
    id: "tw-1",
    platform: "twitter",
    author: "@FinanceTweets",
    content:
      "$NVDA just broke $800. The AI trade is very much alive. Anyone who sold in January is regretting it. #stocks #AI #NVDA",
    upvotes: 3421,
    comments: 287,
    url: "#",
    publishedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "tw-2",
    platform: "twitter",
    author: "@MarketPulse",
    content:
      "Energy sector up 2.3% today as oil hits $85/barrel. XOM and CVX leading the charge. The pivot to fossil fuels continues. #energy #oilstocks",
    upvotes: 1876,
    comments: 134,
    url: "#",
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "tw-3",
    platform: "twitter",
    author: "@WallStreetBull",
    content:
      "Fed minutes suggest 2-3 cuts in 2024. Banks and REITs about to have a very good year. Loading up on $JPM and $PLD. #Fed #RateCuts",
    upvotes: 2154,
    comments: 398,
    url: "#",
    publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "tw-4",
    platform: "twitter",
    author: "@TechInvestor",
    content:
      "Big Tech earnings recap: $MSFT +18% YoY revenue, $GOOGL ad revenue back, $META profitability machine. Year of efficiency paying off. #BigTech #earnings",
    upvotes: 4232,
    comments: 512,
    url: "#",
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: "tw-5",
    platform: "twitter",
    author: "@HealthcareInvest",
    content:
      "Weight loss drug market projected to hit $100B by 2030. $LLY and $NVO are printing money. GLP-1 is the trade of the decade. #healthcare #biotech",
    upvotes: 3876,
    comments: 654,
    url: "#",
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
];

export async function fetchTwitterPosts(): Promise<SocialPost[]> {
  // TODO: Replace with real Twitter API v2 integration
  // Requires Bearer Token and Twitter API access
  return MOCK_TWITTER_POSTS;
}
