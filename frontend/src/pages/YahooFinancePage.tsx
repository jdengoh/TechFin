import { PageWrapper } from "@/components/layout/PageWrapper";
import { ArticleList } from "@/components/yahoo-finance/ArticleList";

export function YahooFinancePage() {
  return (
    <PageWrapper
      title="Yahoo Finance News"
      description="Latest market news and analysis with sector sentiment verdicts"
    >
      <ArticleList />
    </PageWrapper>
  );
}
