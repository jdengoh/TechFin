import { PageWrapper } from "@/components/layout/PageWrapper";
import { SentimentGrid } from "@/components/dashboard/SentimentGrid";
import { TickerRecommendations } from "@/components/dashboard/TickerRecommendations";
import { PortfolioByCategory } from "@/components/dashboard/PortfolioByCategory";

export function DashboardPage() {
  return (
    <PageWrapper
      title="Dashboard"
      description="Market sentiment overview and personalized investment suggestions"
    >
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Market Sentiment
          </h2>
          <SentimentGrid />
        </section>
        <section>
          <h2 className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Investment Suggestions
          </h2>
          <TickerRecommendations />
        </section>
        <section>
          <h2 className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Portfolio by Category
          </h2>
          <PortfolioByCategory />
        </section>
      </div>
    </PageWrapper>
  );
}
