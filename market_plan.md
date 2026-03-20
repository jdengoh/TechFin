# TechFin — Go-to-Market Plan

> **Positioning Statement:** TechFin is the AI-powered intelligence layer for retail investors — giving everyday traders the macro-awareness that institutional desks have had for decades, at a fraction of the cost.

---

## 1. The Problem We're Solving

Retail investors manage $30+ trillion globally but operate with a massive information disadvantage. They:
- React to headlines hours after institutional traders have already priced them in
- Lack tools to connect macro geopolitical events to specific portfolio holdings
- Are priced out of Bloomberg Terminal ($24K/year) and similar institutional-grade tools
- Rely on fragmented sources (Reddit, CNBC, Twitter) with no structured synthesis

The result: retail investors underperform not because they lack intelligence, but because they lack **context and speed**.

---

## 2. Our Solution

TechFin closes the institutional intelligence gap for retail investors by:

1. **Aggregating** news across Yahoo Finance, Reddit, Twitter, LinkedIn in real time
2. **Structuring** that information into a knowledge graph (Neo4j) that maps world events → sectors → tickers
3. **Surfacing** actionable signals through a multi-agent AI chatbot (LangGraph) that answers natural-language portfolio questions
4. **Delivering** a sentiment heatmap and event intelligence dashboard — not just alerts, but *context*

---

## 3. Market Analysis

### 3.1 TAM / SAM / SOM

| Layer | Definition | Size | Source Basis |
|---|---|---|---|
| **TAM** | All self-directed retail investors globally who consume financial news | ~150M people / ~$4.5B addressable software spend | World Federation of Exchanges; Grand View Research (Personal Finance Software market CAGR 12.4% to 2030) |
| **SAM** | English-speaking, digitally active retail investors in US, UK, Australia, Singapore who use at least one fintech app | ~20M people / ~$600M addressable | Statista retail brokerage account data; MAS Singapore retail investor surveys |
| **SOM** | Tech-forward, macro-aware retail investors aged 25–45 who actively seek information edge — early adopters reachable in year 1–2 via community channels | ~500K people / **~$30M ARR potential at 10% conversion to Pro** | r/investing has 3M+ members; Seeking Alpha 16M MAU as proxy |

### 3.2 Market Tailwinds

- **Retail investing surge**: Robinhood + COVID unlocked 20M+ new retail accounts in the US alone (2020–2022); this cohort is maturing and seeking smarter tools
- **AI adoption in fintech**: AI-in-fintech market projected at $61B by 2031 (Allied Market Research, CAGR 23.4%)
- **Information inequality narrative**: Post-GameStop, there is massive cultural appetite for tools that level the playing field
- **Southeast Asia growth**: Singapore, Malaysia, and Indonesia have seen 30–40% YoY growth in retail brokerage accounts (2021–2024); underserved by existing intelligence tools

---

## 4. Competitive Analysis

| Competitor | Price | Strength | Weakness vs TechFin |
|---|---|---|---|
| **Bloomberg Terminal** | $24K/year | Comprehensive institutional data | Priced out retail; no AI chatbot; not retail UX |
| **Morningstar Premium** | ~$200–500/year | Trusted brand, deep fundamentals | Static, editorial; no real-time event intelligence; no graph |
| **Seeking Alpha Premium** | ~$240/year | Large community, editorial analysis | Opinion-based; no AI; no graph-powered connections |
| **Perplexity Finance** | Free–$20/month | General AI search | No portfolio integration; no persistent knowledge graph; no sentiment grid |
| **AlphaSense** | Enterprise (~$15K+/year) | AI document search | B2B only; not built for retail investors |
| **Robinhood / Webull** | Free | Low-friction trading | News aggregation only; no macro intelligence; no AI chatbot |
| **Yahoo Finance Premium** | ~$35/month | Trusted brand, large user base | Feature-shallow; no AI chatbot; no graph connections |

### TechFin's Defensible Differentiation

1. **Knowledge Graph Architecture** — Neo4j-powered relational intelligence is not a feature a traditional app can bolt on. It is structural. Competitors would need to rebuild from scratch.
2. **Event → Sector → Ticker Chain** — No other retail tool maps geopolitical events to specific holdings in a user's portfolio with this level of specificity.
3. **Multi-Agent AI Chatbot on Live Data** — Unlike ChatGPT or Perplexity, TechFin's chatbot queries a structured knowledge graph — no hallucinations, grounded in real ingested data.
4. **Price Point** — Institutional intelligence at retail price. This is the killer value prop.

---

## 5. SWOT Analysis

### Strengths
- Genuinely novel architecture (knowledge graph + multi-agent AI) not replicated by any retail-focused tool
- Full-stack product: data ingestion, graph storage, AI reasoning, and UX are integrated — not stitched together
- Multi-source aggregation (Yahoo Finance, Reddit, Twitter, LinkedIn) gives broader signal than single-source competitors
- Built by a lean, technical team in a hackathon context — demonstrably execution-capable

### Weaknesses
- Currently dependent on third-party API rate limits and costs (RapidAPI, OpenAI, Reddit OAuth)
- Knowledge graph requires ongoing curation; data quality degrades without editorial oversight or ML pipelines
- No live brokerage integration (cannot execute trades); purely intelligence, not action
- Financial advice regulations (MAS, SEC, FCA) require careful legal positioning around "recommendations"

### Opportunities
- First-mover in graph-powered retail investment intelligence — a genuine white space
- Southeast Asia (Singapore launch) is uncontested by Bloomberg/Morningstar at the retail level
- B2B2C play: sell to retail brokerages (Tiger Brokers, moomoo, POEMS) who want to add intelligence features for their customers without building in-house
- AI content partnerships with financial YouTubers, podcasters, and newsletters

### Threats
- OpenAI, Google, or Perplexity could add structured financial graph capabilities to their products
- Bloomberg or Refinitiv could launch a retail-tier product
- Data licensing costs (real-time market data) increase as the product scales
- Regulatory risk: MAS, SEC "investment advice" classification could require licensing

---

## 6. Business Model & Revenue

### 6.1 Freemium SaaS (Primary)

| Tier | Price | Features |
|---|---|---|
| **Free** | $0/month | 5 AI chatbot queries/day, basic news feed, public sentiment grid, 3 ticker watchlist |
| **Pro** | $19/month | Unlimited AI queries, full event intelligence, portfolio recommendations, real-time sentiment, 20 ticker watchlist |
| **Pro Annual** | $149/year (~$12.50/month) | Same as Pro, discounted — drives retention |
| **Institutional / Team** | $99/month per seat | API access, custom data feeds, white-label reports, 5-seat minimum |

### 6.2 Secondary Revenue Streams (Year 2+)
- **Affiliate / Referral**: Brokerage referral commissions (Tiger Brokers, moomoo pay $50–200 per funded account)
- **Data Licensing**: Sell aggregated, anonymized sentiment signals to hedge funds and research firms
- **B2B API**: Sell graph query API access to fintech startups building on top of TechFin's intelligence layer

### 6.3 Unit Economics Assumptions
- Customer Acquisition Cost (CAC): $15 via community-led growth (Reddit, Product Hunt, creator partnerships)
- Monthly churn: 5% Pro tier (industry benchmark for niche fintech: 4–7%)
- Lifetime Value (LTV) at $19/month, 5% churn = ~20-month average retention → LTV ≈ $380
- **LTV/CAC ratio: 25x** — highly capital-efficient for community-led acquisition

---

## 7. User & ARR Projections

> Based on MAU and conversion assumptions using Seeking Alpha (16M MAU, ~6% paid) and Personal Capital (3M+ MAU) as market benchmarks.

### User Growth Model

| Period | MAU | Free Users | Pro Subscribers | Conversion Rate |
|---|---|---|---|---|
| **Month 6** (Soft Launch) | 2,000 | 1,800 | 200 | 10% |
| **Year 1** | 10,000 | 8,500 | 1,500 | 15% |
| **Year 2** | 50,000 | 40,000 | 10,000 | 20% |
| **Year 3** | 200,000 | 155,000 | 45,000 | 22.5% |

### ARR Projections

| Period | Pro Subscribers | ARPU (Blended) | ARR |
|---|---|---|---|
| **Month 6** | 200 | $19 | **$45,600** |
| **Year 1** | 1,500 | $19 | **$342,000** |
| **Year 2** | 10,000 | $20 (mix of monthly + annual) | **$2.4M** |
| **Year 3** | 45,000 | $21 (institutional mix) | **$11.3M** |

> Year 3 ARR of $11M positions TechFin for a Series A at a standard 8–12x ARR SaaS multiple ($88M–$136M valuation).

---

## 8. Go-to-Market Strategy

### Phase 1: Community Seeding (Months 1–3)
**Goal**: 2,000 MAU, product-market fit validation

- **Reddit**: Post genuine analyses and value in r/investing, r/wallstreetbets, r/personalfinance — mention TechFin as the tool used. No spam; build credibility first.
- **Product Hunt launch**: Coordinate team upvotes + reach out to PH communities. Target Top 5 Product of the Day.
- **Hacker News "Show HN"**: Technical credibility. Knowledge graph + LangGraph angle will resonate.
- **NUS/NTU investment clubs**: Free Pro access for university investment clubs in Singapore in exchange for testimonials and organic word-of-mouth.
- **Demo video virality**: Invest in a polished 90-second demo showing "Bloomberg-level intelligence for the price of Netflix" — distribute on TikTok, YouTube Shorts, LinkedIn.

### Phase 2: Creator & Influencer Partnerships (Months 4–9)
**Goal**: 10,000 MAU, first paid cohort

- **YouTube finance creators**: Offer 3 months free Pro + affiliate commission per referral. Target creators in the 50K–500K subscriber range (cost-effective, highly targeted).
- **Financial newsletters**: Sponsor newsletters like "The Motley Fool SEA", "Beansprout Singapore" with a free trial offer.
- **Twitter/X finance community**: Engage with macro finance accounts (>50K followers) — offer co-branded event analysis content.

### Phase 3: B2B2C Channel (Months 10–18)
**Goal**: 50,000 MAU, $2M ARR run rate

- **Retail brokerages**: Approach Tiger Brokers, moomoo, Webull, POEMS Singapore to white-label TechFin's intelligence layer as a value-added feature for their users. Revenue share model.
- **Wealth management firms**: Offer team/institutional tier to independent financial advisors and boutique wealth managers who need macro intelligence without Bloomberg costs.
- **Corporate API**: Launch TechFin API for fintech developers building on top of the intelligence layer.

---

## 9. Strategic Partnerships

| Partner Type | Target Partners | Value Exchange |
|---|---|---|
| **Retail Brokerages** | Tiger Brokers, moomoo, Webull, POEMS | Distribution to millions of retail users; TechFin adds intelligence layer |
| **Data Providers** | Refinitiv/LSEG, Alpha Vantage, Polygon.io | Premium real-time data pipelines for TechFin; paid API customer |
| **AI Infrastructure** | OpenAI, Anthropic (via startup programs) | API credits, co-marketing as reference customer for fintech AI use cases |
| **Financial Media** | Beansprout, Seedly, The Fifth Person (SG) | Content partnerships; co-branded analysis reports |
| **University Programs** | NUS Business School, SMU Lee Kong Chian | Free institutional access → builds next-gen investor loyalty; potential research partnerships |
| **Regulatory Sandbox** | MAS FinTech Regulatory Sandbox | Navigate "financial advice" classification; establish compliant AI recommendation framework |

---

## 10. Regulatory Positioning

TechFin is designed as an **intelligence tool, not a financial advisor**:
- Recommendations are framed as "AI-generated insights" not "personalized financial advice"
- Mandatory disclaimer: "For informational purposes only. Not investment advice."
- Year 1 compliance: Register as an information service, not a licensed financial advisor (avoids MAS CMS licensing)
- Year 2 pathway: Explore MAS FinTech Sandbox for AI-assisted investment guidance category

---

## 11. Funding Ask (for context)

- **Seed round target**: $500K–$1M
- **Use of funds**:
  - 40% Engineering (2 senior hires: ML engineer + backend)
  - 30% Data & infrastructure (real-time data licensing, cloud costs)
  - 20% Marketing & community growth
  - 10% Legal & compliance (MAS sandbox, IP)
- **Runway**: 18 months to Series A metrics ($2M ARR, 50K MAU)

---

## 12. Why Now

1. **AI is mainstream, but structured financial AI is not** — LLMs are everywhere; graph-grounded, hallucination-free financial AI is not.
2. **Retail investor sophistication is rising** — Post-2020 retail traders are no longer novices. They want Bloomberg-quality tools.
3. **Southeast Asia is the untapped frontier** — Singapore, Malaysia, Indonesia retail investor base is growing 30%+ YoY with zero institutional-grade intelligence tools designed for them.
4. **The team can build it** — TechFin was built end-to-end in a hackathon. The MVP already works. This is execution risk mitigation in action.
