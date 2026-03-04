import { SocialPost } from "@/types/social";

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID ?? "";
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET ?? "";
const REDDIT_USER_AGENT = process.env.REDDIT_USER_AGENT ?? "TechFin/1.0";

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getRedditToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }

  const credentials = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString("base64");
  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": REDDIT_USER_AGENT,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`Reddit auth error: ${response.status}`);
  }

  const data = await response.json();
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return tokenCache.token;
}

export async function fetchRedditPosts(subreddit: string): Promise<SocialPost[]> {
  const hasCredentials =
    REDDIT_CLIENT_ID &&
    REDDIT_CLIENT_ID !== "your_reddit_client_id" &&
    REDDIT_CLIENT_SECRET &&
    REDDIT_CLIENT_SECRET !== "your_reddit_client_secret";

  if (!hasCredentials) {
    console.warn("[reddit] No credentials configured, returning mock data");
    return getMockRedditPosts(subreddit);
  }

  try {
    const token = await getRedditToken();
    const response = await fetch(
      `https://oauth.reddit.com/r/${subreddit}/hot?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": REDDIT_USER_AGENT,
        },
      }
    );

    if (response.status === 401) {
      tokenCache = null;
      const freshToken = await getRedditToken();
      const retry = await fetch(
        `https://oauth.reddit.com/r/${subreddit}/hot?limit=10`,
        {
          headers: {
            Authorization: `Bearer ${freshToken}`,
            "User-Agent": REDDIT_USER_AGENT,
          },
        }
      );
      if (!retry.ok) throw new Error(`Reddit API error: ${retry.status}`);
      const data = await retry.json();
      return parseRedditData(data, subreddit);
    }

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();
    return parseRedditData(data, subreddit);
  } catch (error) {
    console.error("[reddit] Fetch error:", error);
    return getMockRedditPosts(subreddit);
  }
}

function parseRedditData(data: Record<string, unknown>, subreddit: string): SocialPost[] {
  const posts = (data?.data as Record<string, unknown>)?.children as Array<Record<string, unknown>>;
  if (!Array.isArray(posts)) return getMockRedditPosts(subreddit);

  return posts.map((post) => {
    const p = post.data as Record<string, unknown>;
    return {
      id: p.id as string,
      platform: "reddit" as const,
      author: `u/${p.author as string}`,
      content: (p.selftext as string)?.slice(0, 500) || (p.title as string),
      upvotes: p.score as number,
      comments: p.num_comments as number,
      subreddit: `r/${subreddit}`,
      url: `https://reddit.com${p.permalink as string}`,
      publishedAt: new Date((p.created_utc as number) * 1000).toISOString(),
    };
  });
}

function getMockRedditPosts(subreddit: string): SocialPost[] {
  const mockPosts: Record<string, SocialPost[]> = {
    wallstreetbets: [
      {
        id: "wsb-1",
        platform: "reddit",
        author: "u/RetailInvestorGuru",
        content: "NVDA calls printing 🚀 AI momentum is unstoppable. Everyone sleeping on the GPU shortage thesis.",
        upvotes: 4823,
        comments: 342,
        subreddit: "r/wallstreetbets",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
      {
        id: "wsb-2",
        platform: "reddit",
        author: "u/TendieHunter2000",
        content: "SPY puts. I have my reasons. See you all on the other side. Not financial advice.",
        upvotes: 2156,
        comments: 198,
        subreddit: "r/wallstreetbets",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
      {
        id: "wsb-3",
        platform: "reddit",
        author: "u/DiamondHandsOnly",
        content: "TSLA to $400 EOY. Elon is building the future and y'all are too scared to see it. Loading up on shares.",
        upvotes: 1789,
        comments: 567,
        subreddit: "r/wallstreetbets",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      },
    ],
    stocks: [
      {
        id: "stocks-1",
        platform: "reddit",
        author: "u/ValueInvestorPro",
        content: "Energy sector is severely undervalued relative to earnings. XOM and CVX both trading below historical P/E. Adding to positions.",
        upvotes: 892,
        comments: 134,
        subreddit: "r/stocks",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: "stocks-2",
        platform: "reddit",
        author: "u/FundamentalsFocus",
        content: "Healthcare sector analysis: UNH and JNJ both showing strong cash flow metrics. The regulatory risk is overpriced by the market.",
        upvotes: 654,
        comments: 89,
        subreddit: "r/stocks",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: "stocks-3",
        platform: "reddit",
        author: "u/DividendDave",
        content: "Building a dividend growth portfolio for retirement. KO, PG, JNJ, and VZ form the core. Reinvesting every quarter.",
        upvotes: 1205,
        comments: 210,
        subreddit: "r/stocks",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ],
    economics: [
      {
        id: "econ-1",
        platform: "reddit",
        author: "u/MacroMindset",
        content: "CPI came in at 3.1% YoY. Still above Fed target but trajectory is clearly downward. Rate cuts in H2 2024 seem increasingly likely.",
        upvotes: 1456,
        comments: 287,
        subreddit: "r/economics",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: "econ-2",
        platform: "reddit",
        author: "u/MonetaryPolicyWatch",
        content: "The yield curve inversion has persisted for over 18 months now. Historical correlation with recession is strong. Are we in a soft landing or just delayed?",
        upvotes: 987,
        comments: 445,
        subreddit: "r/economics",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      },
      {
        id: "econ-3",
        platform: "reddit",
        author: "u/GlobalTradeAnalyst",
        content: "US trade deficit widened again in Q4. Dollar strength continues to hurt exporters. Watch industrials and materials sectors for continued pressure.",
        upvotes: 743,
        comments: 156,
        subreddit: "r/economics",
        url: "#",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      },
    ],
  };

  return mockPosts[subreddit] ?? mockPosts["stocks"];
}
