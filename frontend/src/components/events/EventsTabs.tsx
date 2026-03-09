import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventArticleCard } from "./EventArticleCard";
import { mockEvents } from "@/data/mock-events";
import { WorldEventCategory } from "@/types/event-article";

const categories: WorldEventCategory[] = [
  "US-China Trade War",
  "Ukraine-Russia Conflict",
  "AI Regulation",
  "Fed Rate Decisions",
  "Energy Crisis",
];

const tabValues: Record<WorldEventCategory, string> = {
  "US-China Trade War": "trade-war",
  "Ukraine-Russia Conflict": "ukraine",
  "AI Regulation": "ai-regulation",
  "Fed Rate Decisions": "fed-rates",
  "Energy Crisis": "energy",
};

export function EventsTabs() {
  return (
    <Tabs defaultValue="trade-war">
      <TabsList className="mb-6 h-auto flex-wrap gap-1">
        {categories.map((cat) => (
          <TabsTrigger key={cat} value={tabValues[cat]}>
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((cat) => (
        <TabsContent key={cat} value={tabValues[cat]}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mockEvents[cat].map((article) => (
              <EventArticleCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
