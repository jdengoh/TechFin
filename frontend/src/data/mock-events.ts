import { EventArticle, WorldEventCategory } from "@/types/event-article";

export const mockEvents: Record<WorldEventCategory, EventArticle[]> = {
  "US-China Trade War": [
    {
      id: "trade-1",
      title: "US Widens Semiconductor Export Controls Targeting Chinese Chipmakers",
      summary:
        "The Biden administration has significantly expanded its semiconductor export controls, adding over 140 Chinese entities to its restricted list in the latest escalation of the US-China technology war. The new rules tighten restrictions on advanced chips used in AI training, cutting-edge GPUs, and chip manufacturing equipment. Nvidia and AMD have confirmed they are assessing the impact on their data center product lines sold to Chinese cloud providers. Qualcomm warned that restrictions on its modem chips could affect up to $3.5 billion in annual revenue. Applied Materials and ASML face the tightest new controls, limiting their ability to service equipment already deployed in Chinese fabs.",
      source: "Wall Street Journal",
      publishedAt: "20260307T091122",
      url: "https://wsj.com",
      sentimentScore: -0.52,
      tickerSentiment: [
        { ticker: "NVDA", score: -0.61 },
        { ticker: "AMD", score: -0.45 },
        { ticker: "QCOM", score: -0.58 },
        { ticker: "AMAT", score: -0.67 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
      category: "US-China Trade War",
    },
    {
      id: "trade-2",
      title: "Apple Accelerates India and Vietnam Manufacturing as China Risk Rises",
      summary:
        "Apple is accelerating its supply chain diversification away from China, with sources indicating the company now assembles roughly 18% of iPhone production outside the mainland. The tech giant has partnered with Foxconn and Tata to expand facilities in Chennai and Ho Chi Minh City. Analysts at Morgan Stanley believe Apple could reach 30% non-China production by 2027 without meaningful margin compression. The move comes as US-China tensions threaten tariffs on consumer electronics imports, which would have directly impacted Apple's cost structure. Services and wearables revenue, now accounting for 38% of gross profit, provide additional insulation.",
      source: "Bloomberg",
      publishedAt: "20260306T143500",
      url: "https://bloomberg.com",
      sentimentScore: 0.18,
      tickerSentiment: [
        { ticker: "AAPL", score: 0.32 },
        { ticker: "TSLA", score: -0.12 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1625314897518-bb4fe6c95b81?auto=format&fit=crop&w=800&q=80",
      category: "US-China Trade War",
    },
    {
      id: "trade-3",
      title: "AMD Gains Share as China's Domestic GPU Push Stalls",
      summary:
        "Advanced Micro Devices is seeing an unexpected silver lining in the US-China chip war as Chinese tech companies scramble to stockpile compliant AI hardware before potential further restrictions. AMD's MI300X GPU, which falls just below the most restricted compute thresholds, has seen a significant order surge from Alibaba Cloud and Tencent. Meanwhile, Huawei's Ascend 910B processors continue to suffer yield issues, leaving a competitive gap that AMD is moving to fill. The company raised its data center GPU revenue forecast to $12 billion for 2026, up from an earlier estimate of $8 billion. Analysts caution that further rule tightening could remove AMD's remaining China opportunities.",
      source: "Reuters",
      publishedAt: "20260305T110034",
      url: "https://reuters.com",
      sentimentScore: 0.38,
      tickerSentiment: [
        { ticker: "AMD", score: 0.52 },
        { ticker: "NVDA", score: -0.22 },
        { ticker: "QCOM", score: 0.14 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      category: "US-China Trade War",
    },
    {
      id: "trade-4",
      title: "Tesla China Sales Drop 28% as Consumer Nationalism Intensifies",
      summary:
        "Tesla reported its sharpest monthly sales decline in China on record, with deliveries falling 28% year-over-year to just 48,000 units in February. Local rivals BYD, Xiaomi EV, and Huawei-backed AITO have gained significant traction among younger buyers who are increasingly choosing domestic brands as a form of economic patriotism. Tesla's Shanghai Gigafactory continues to operate at full capacity, primarily producing for export markets, but the loss of domestic market share is raising concerns about the plant's long-term economics. Elon Musk's perceived proximity to US trade policy decisions has further complicated the brand's positioning in China. Management acknowledged the headwinds on the last earnings call but expressed confidence in a rebound tied to the next Cybercab launch.",
      source: "Financial Times",
      publishedAt: "20260304T081552",
      url: "https://ft.com",
      sentimentScore: -0.44,
      tickerSentiment: [
        { ticker: "TSLA", score: -0.58 },
        { ticker: "AAPL", score: -0.15 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
      category: "US-China Trade War",
    },
  ],

  "Ukraine-Russia Conflict": [
    {
      id: "ukraine-1",
      title: "NATO Defense Spending Surge Drives Record Backlogs at Boeing and Raytheon",
      summary:
        "NATO member states collectively committed to raising defense spending to 2.5% of GDP at the Brussels summit, creating unprecedented order backlogs at US defense contractors. Boeing's Defense division reported a $94 billion backlog, the largest in company history, driven by orders for F/A-18 Super Hornets, Apache helicopters, and Chinook transports. Raytheon Technologies recorded $58 billion in new awards during Q4, predominantly PATRIOT missile systems and AMRAAM air-to-air missiles to replace stockpiles depleted by Ukraine aid. Both companies are investing in second-source suppliers to address supply chain bottlenecks in titanium, specialty alloys, and solid rocket motors. Analysts estimate the defense ramp could generate 15-18% revenue growth annually through 2028.",
      source: "Defense News",
      publishedAt: "20260307T150023",
      url: "https://defensenews.com",
      sentimentScore: 0.58,
      tickerSentiment: [
        { ticker: "BA", score: 0.62 },
        { ticker: "RTX", score: 0.71 },
        { ticker: "LIN", score: 0.08 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      category: "Ukraine-Russia Conflict",
    },
    {
      id: "ukraine-2",
      title: "Brent Crude Spikes 9% as Black Sea Export Routes Disrupted",
      summary:
        "Oil markets surged following Ukrainian drone strikes on Russian Black Sea oil terminals near Novorossiysk, disrupting approximately 1.2 million barrels per day of Russian crude exports. Brent crude jumped to $98 per barrel, its highest level since early 2024, as traders priced in supply uncertainty. ExxonMobil and Chevron shares rallied on the news as higher oil prices boost margins at their upstream businesses. OPEC+ declined an emergency meeting request, signaling they would not immediately increase production to offset the disruption. Analysts at Goldman Sachs raised their Brent crude price target to $105 for Q2, citing tight global inventories and the likelihood of continued Black Sea risk premium.",
      source: "Reuters",
      publishedAt: "20260306T072211",
      url: "https://reuters.com",
      sentimentScore: 0.42,
      tickerSentiment: [
        { ticker: "XOM", score: 0.55 },
        { ticker: "CVX", score: 0.51 },
        { ticker: "COP", score: 0.48 },
        { ticker: "BA", score: 0.12 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      category: "Ukraine-Russia Conflict",
    },
    {
      id: "ukraine-3",
      title: "Raytheon Wins $2.1B HIMARS Resupply Contract as US Restocks Ukraine Aid",
      summary:
        "The US Department of Defense awarded Raytheon Technologies a $2.1 billion contract to manufacture and deliver HIMARS rocket artillery systems and associated GMLRS munitions, primarily to replenish stockpiles sent to Ukraine. The award represents one of the largest single-contract awards in Raytheon's history and will support an accelerated production rate at the company's Camden, Arkansas facility. Lockheed Martin, which manufactures the HIMARS launcher platform, is also expected to receive a companion contract worth approximately $800 million. The contract includes a classified option for additional deliveries contingent on Congressional authorization, with sources indicating total contract value could reach $3.5 billion. Production is expected to ramp significantly over the next 18 months, adding approximately 1,200 jobs at the Camden facility. RTX shares gained 4.2% on the announcement.",
      source: "Bloomberg",
      publishedAt: "20260305T163044",
      url: "https://bloomberg.com",
      sentimentScore: 0.65,
      tickerSentiment: [
        { ticker: "RTX", score: 0.72 },
        { ticker: "BA", score: 0.38 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1534488016-17a0a25ff98a?auto=format&fit=crop&w=800&q=80",
      category: "Ukraine-Russia Conflict",
    },
    {
      id: "ukraine-4",
      title: "Eastern European Gas Shortage Strains Linde's Industrial Operations",
      summary:
        "A severe cold snap combined with disrupted Russian pipeline gas flows has created an acute industrial gas shortage across Poland, Slovakia, and the Czech Republic, where Linde operates 23 air separation and gas processing facilities. The company has activated force majeure provisions for select long-term supply contracts, the first such action in the region since 2009. Spot prices for liquid nitrogen and oxygen have tripled, and several automotive and steel manufacturers in the region have curtailed operations. Linde's European segment, which represents approximately 28% of total revenue, is expected to see Q1 margins compressed by 150-200 basis points. Management indicated they are accelerating backup fuel switching to LNG at affected plants to restore normal operations within 6-8 weeks.",
      source: "Financial Times",
      publishedAt: "20260304T095512",
      url: "https://ft.com",
      sentimentScore: -0.38,
      tickerSentiment: [
        { ticker: "LIN", score: -0.45 },
        { ticker: "XOM", score: 0.22 },
        { ticker: "CVX", score: 0.18 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=800&q=80",
      category: "Ukraine-Russia Conflict",
    },
  ],

  "AI Regulation": [
    {
      id: "ai-1",
      title: "EU AI Act Enforcement Begins: Big Tech Faces Billion-Dollar Compliance Costs",
      summary:
        "The European Union's AI Act entered its enforcement phase, with regulators announcing their first batch of compliance audits targeting general-purpose AI systems deployed by Microsoft, Google, and Meta. Companies face fines of up to 3% of global annual revenue for non-compliance with high-risk AI requirements, and up to 7% for violations involving prohibited AI practices. Microsoft acknowledged in a regulatory filing that compliance costs for its Azure AI and Copilot products could reach $2.4 billion over three years. Google is facing particular scrutiny over its Gemini model's deployment in healthcare and critical infrastructure applications. Meta's AI content moderation systems are under review for potential systemic bias violations. All three companies have established dedicated EU AI compliance teams of 200+ employees.",
      source: "Politico",
      publishedAt: "20260307T120000",
      url: "https://politico.eu",
      sentimentScore: -0.42,
      tickerSentiment: [
        { ticker: "MSFT", score: -0.38 },
        { ticker: "GOOGL", score: -0.44 },
        { ticker: "META", score: -0.51 },
        { ticker: "AMZN", score: -0.22 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      category: "AI Regulation",
    },
    {
      id: "ai-2",
      title: "US Commerce Proposes Compute Caps on AI Training Runs Citing National Security",
      summary:
        "The US Commerce Department proposed new rules that would require licenses for AI training runs exceeding 10^26 FLOPs, a threshold designed to capture only the most powerful frontier AI models. Nvidia's H200 and B200 chips are central to the policy debate, as they are the primary hardware used for such large-scale training runs. The proposed rule would require companies to report training runs to a new AI Safety Office and demonstrate adequate cybersecurity protections. Amazon Web Services, Microsoft Azure, and Google Cloud would face additional obligations as major compute providers. Nvidia's stock fell 6% on the announcement, while AI software companies including Salesforce and CRM reacted more mildly given their lower direct exposure to raw compute regulation.",
      source: "The Verge",
      publishedAt: "20260306T091833",
      url: "https://theverge.com",
      sentimentScore: -0.31,
      tickerSentiment: [
        { ticker: "NVDA", score: -0.62 },
        { ticker: "MSFT", score: -0.24 },
        { ticker: "AMZN", score: -0.28 },
        { ticker: "GOOGL", score: -0.26 },
        { ticker: "CRM", score: -0.08 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      category: "AI Regulation",
    },
    {
      id: "ai-3",
      title: "Salesforce AI Governance Suite Cleared Under NIST AI Risk Management Framework",
      summary:
        "Salesforce announced its Einstein AI platform has received formal validation under the NIST AI Risk Management Framework 2.0, the first major enterprise CRM vendor to achieve this certification. The designation is expected to accelerate government and regulated-industry sales, markets where Salesforce had previously faced procurement hesitancy due to AI compliance uncertainty. The company indicated that over 1,200 enterprise customers in financial services, healthcare, and government verticals have now upgraded to Einstein-powered plans. Revenue from AI-enhanced subscriptions now carries an average 34% premium over base tiers. Analysts at Piper Sandler raised their price target to $380, citing the differentiated regulatory positioning as a durable competitive moat in a market where EU AI Act compliance is becoming a procurement prerequisite.",
      source: "TechCrunch",
      publishedAt: "20260305T140022",
      url: "https://techcrunch.com",
      sentimentScore: 0.55,
      tickerSentiment: [
        { ticker: "CRM", score: 0.68 },
        { ticker: "MSFT", score: 0.12 },
        { ticker: "GOOGL", score: 0.08 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80",
      category: "AI Regulation",
    },
    {
      id: "ai-4",
      title: "Amazon AWS Leads Coalition Proposing Industry Self-Regulatory AI Safety Standards",
      summary:
        "Amazon Web Services announced the formation of the Responsible AI Industry Association, a coalition of 47 technology companies proposing a voluntary self-regulatory framework for AI safety as an alternative to government mandates. The coalition, which includes Microsoft, Google, and Meta alongside dozens of enterprise software firms, published a 120-page voluntary commitment covering model transparency, red-teaming requirements, and incident reporting. The initiative is widely seen as a preemptive move to shape AI regulation before Congress passes more prescriptive legislation. Critics from AI safety organizations argue the voluntary framework lacks enforcement mechanisms and conflicts of interest are inherent in industry self-regulation. Amazon's stock reacted positively as investors viewed the initiative as reducing regulatory tail risk for AWS's AI cloud business.",
      source: "CNBC",
      publishedAt: "20260304T172315",
      url: "https://cnbc.com",
      sentimentScore: 0.28,
      tickerSentiment: [
        { ticker: "AMZN", score: 0.41 },
        { ticker: "MSFT", score: 0.32 },
        { ticker: "META", score: 0.25 },
        { ticker: "GOOGL", score: 0.28 },
        { ticker: "NVDA", score: 0.15 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      category: "AI Regulation",
    },
  ],

  "Fed Rate Decisions": [
    {
      id: "fed-1",
      title: "Fed Signals Three Rate Cuts in 2026 as Inflation Cools to 2.1%",
      summary:
        "Federal Reserve Chair Jerome Powell signaled three 25-basis-point rate cuts in 2026 following the January CPI reading showing inflation had cooled to 2.1%, within striking distance of the Fed's 2% target. The updated dot plot showed the median FOMC member expecting the federal funds rate to reach 3.75% by year-end, down from the current 4.5%. Financial stocks broadly rallied on expectations that a lower rate environment would stimulate loan demand and investment banking activity. JPMorgan and Goldman Sachs both outperformed the broader S&P 500 on the announcement. Visa and Mastercard also moved higher on expectations that consumer spending would remain robust as borrowing costs declined. Charles Schwab surged 5.1% as lower rates typically attract more retail investors into equity markets.",
      source: "CNBC",
      publishedAt: "20260307T180045",
      url: "https://cnbc.com",
      sentimentScore: 0.48,
      tickerSentiment: [
        { ticker: "JPM", score: 0.42 },
        { ticker: "GS", score: 0.55 },
        { ticker: "BAC", score: 0.38 },
        { ticker: "V", score: 0.44 },
        { ticker: "MA", score: 0.46 },
        { ticker: "SCHW", score: 0.61 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      category: "Fed Rate Decisions",
    },
    {
      id: "fed-2",
      title: "JPMorgan and BofA Warn Rate Cut Cycle Will Compress Net Interest Margins",
      summary:
        "JPMorgan Chase and Bank of America both cautioned investors that the anticipated Fed rate cut cycle would pressure their net interest margins (NIM), the spread between what banks earn on loans and pay on deposits. JPMorgan CFO Jeremy Barnum projected NIM could compress by 15-20 basis points per 100bps of rate cuts, potentially reducing net interest income by $3.2 billion on an annualized basis. Bank of America, which has greater duration sensitivity due to its large held-to-maturity bond portfolio, warned of a larger proportional impact. Both banks emphasized offsetting factors including loan growth expectations, fee income expansion, and credit card business momentum. Analysts noted that while lower rates pressure NIM, they typically boost capital markets activity and reduce loan loss provisions.",
      source: "Bloomberg",
      publishedAt: "20260306T141230",
      url: "https://bloomberg.com",
      sentimentScore: -0.22,
      tickerSentiment: [
        { ticker: "JPM", score: -0.28 },
        { ticker: "BAC", score: -0.35 },
        { ticker: "GS", score: 0.12 },
        { ticker: "SCHW", score: 0.08 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80",
      category: "Fed Rate Decisions",
    },
    {
      id: "fed-3",
      title: "Goldman Sachs Beats Q4 Estimates on Investment Banking Surge",
      summary:
        "Goldman Sachs reported Q4 earnings per share of $14.28, significantly beating consensus estimates of $11.90, driven by a 47% surge in investment banking revenue as the rate-cut cycle unleashed a wave of pent-up M&A activity. Advisory fees totaled $2.8 billion for the quarter, the highest since Q2 2021. Equity underwriting volumes also recovered sharply as companies took advantage of lower borrowing costs and elevated equity valuations to execute IPOs and secondary offerings. Goldman's asset and wealth management division reached $3.1 trillion in assets under supervision. CEO David Solomon noted that the pipeline for 2026 deals is the most robust since the 2021 bull market, with a particular concentration in technology and healthcare sector transactions.",
      source: "Wall Street Journal",
      publishedAt: "20260305T083300",
      url: "https://wsj.com",
      sentimentScore: 0.62,
      tickerSentiment: [
        { ticker: "GS", score: 0.74 },
        { ticker: "JPM", score: 0.28 },
        { ticker: "BAC", score: 0.18 },
        { ticker: "SCHW", score: 0.22 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1554260570-9140fd3b7614?auto=format&fit=crop&w=800&q=80",
      category: "Fed Rate Decisions",
    },
    {
      id: "fed-4",
      title: "Visa and Mastercard Report Record Payment Volumes as Consumer Spending Resilient",
      summary:
        "Visa and Mastercard both reported record cross-border payment volumes in their latest quarterly results, with combined transaction value exceeding $4.2 trillion, a 12% year-over-year increase. Consumer spending has remained resilient despite elevated interest rates, supported by strong employment and wage growth. Travel and entertainment categories showed the strongest growth at 18% and 22% respectively. Both companies benefited from continued cash-to-card conversion in emerging markets, particularly in Southeast Asia and Latin America. Mastercard's services segment, which includes analytics and cybersecurity, grew 24% and now represents 35% of total revenue. Visa raised its full-year EPS guidance by 8%, while Mastercard issued guidance above consensus for fiscal 2026.",
      source: "Reuters",
      publishedAt: "20260304T162544",
      url: "https://reuters.com",
      sentimentScore: 0.52,
      tickerSentiment: [
        { ticker: "V", score: 0.58 },
        { ticker: "MA", score: 0.62 },
        { ticker: "JPM", score: 0.24 },
        { ticker: "BAC", score: 0.18 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
      category: "Fed Rate Decisions",
    },
  ],

  "Energy Crisis": [
    {
      id: "energy-1",
      title: "Natural Gas Futures Surge 32% as Arctic Blast Strains North American Grid",
      summary:
        "Henry Hub natural gas futures surged 32% to $6.80 per MMBtu as an unprecedented Arctic air mass settled over the central United States, driving heating demand to record levels and straining both generation capacity and pipeline throughput. ExxonMobil, Chevron, and ConocoPhillips saw their upstream segments benefit immediately from the price spike, with each company standing to generate an additional $400-600 million in Q1 free cash flow if prices remain elevated for the full quarter. Power utilities across the Midwest declared grid emergencies, with rolling outages affecting over 2 million customers. NextEra Energy's Florida operations saw unusually high demand but were largely insulated from supply disruptions. LNG export terminals on the Gulf Coast curtailed shipments to Europe to prioritize domestic demand, briefly causing a sharp spike in European spot gas prices as well.",
      source: "Bloomberg",
      publishedAt: "20260307T070055",
      url: "https://bloomberg.com",
      sentimentScore: 0.44,
      tickerSentiment: [
        { ticker: "XOM", score: 0.58 },
        { ticker: "CVX", score: 0.54 },
        { ticker: "COP", score: 0.61 },
        { ticker: "NEE", score: 0.18 },
        { ticker: "LIN", score: -0.22 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80",
      category: "Energy Crisis",
    },
    {
      id: "energy-2",
      title: "NextEra Energy Wins 8.2GW Offshore Wind Contract in Historic Federal Auction",
      summary:
        "NextEra Energy secured the largest offshore wind development rights in US history, winning 8.2 gigawatts of capacity across three lease areas off the coasts of New Jersey and Massachusetts in the Bureau of Ocean Energy Management's latest auction. The total lease cost was $4.7 billion, funded by a combination of project finance debt and a $2.1 billion equity raise that was 3.2x oversubscribed by institutional investors. NextEra CEO John Ketchum described the award as transformational, noting it would nearly double the company's renewable generation pipeline. The projects are expected to reach commercial operation between 2029 and 2032, providing multi-year revenue visibility. Analysts noted that offshore wind's higher capacity factors relative to onshore wind make these assets particularly attractive for grid reliability planning.",
      source: "Reuters",
      publishedAt: "20260306T103322",
      url: "https://reuters.com",
      sentimentScore: 0.68,
      tickerSentiment: [
        { ticker: "NEE", score: 0.79 },
        { ticker: "LIN", score: 0.22 },
        { ticker: "XOM", score: -0.08 },
        { ticker: "CVX", score: -0.06 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80",
      category: "Energy Crisis",
    },
    {
      id: "energy-3",
      title: "ConocoPhillips Completes $6.1B Qatar LNG Acquisition, Expands Global Portfolio",
      summary:
        "ConocoPhillips completed its acquisition of a 6.25% stake in QatarEnergy's North Field East LNG expansion project, paying $6.1 billion and securing offtake rights to approximately 1.4 million tons of LNG per year through 2050. The deal significantly expands ConocoPhillips's LNG portfolio and reduces its overall commodity price sensitivity by locking in long-term, oil-indexed pricing. The company expects the acquisition to be immediately accretive to earnings per share and free cash flow. Qatar's North Field is the world's largest natural gas reserve, and the expansion project will add 32 million tons of annual LNG capacity by 2027. The deal was funded through a combination of cash on hand and new 10-year bonds issued at 4.2%, taking advantage of improved capital markets conditions following the Fed's recent rate signals.",
      source: "Financial Times",
      publishedAt: "20260305T150811",
      url: "https://ft.com",
      sentimentScore: 0.55,
      tickerSentiment: [
        { ticker: "COP", score: 0.67 },
        { ticker: "XOM", score: 0.14 },
        { ticker: "CVX", score: 0.12 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=800&q=80",
      category: "Energy Crisis",
    },
    {
      id: "energy-4",
      title: "Green Hydrogen Projects Face 2-Year Delays as Electrolyzer Costs Remain High",
      summary:
        "A wave of green hydrogen projects across the US and Europe are announcing significant delays, with the average project now expected to reach commercial operation 18-24 months behind original schedule. The primary bottleneck is electrolyzer manufacturing capacity, which has failed to scale as quickly as project developers anticipated when they committed to aggressive timelines. Costs remain stubbornly high at $5.80-$7.20 per kilogram, well above the $2.00 target required for hydrogen to compete economically with natural gas in industrial applications. NextEra Energy disclosed it is reviewing two planned hydrogen facilities in Texas and Florida, potentially deferring $1.4 billion in planned capital expenditure. Linde, which provides both electrolyzers and hydrogen infrastructure, warned that project delays would reduce its electrolyzer order backlog conversion rate and pushed out related revenue expectations by roughly 18 months.",
      source: "Bloomberg NEF",
      publishedAt: "20260304T134405",
      url: "https://bloomberg.com",
      sentimentScore: -0.42,
      tickerSentiment: [
        { ticker: "NEE", score: -0.38 },
        { ticker: "LIN", score: -0.51 },
        { ticker: "COP", score: 0.14 },
        { ticker: "XOM", score: 0.18 },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
      category: "Energy Crisis",
    },
  ],
};
