import { useMemo } from "react";
import { useHoldings } from "@/hooks/useHoldings";
import { StockCategoryList, StockCategory } from "@/components/ui/stock-category-list";
import { Skeleton } from "@/components/ui/skeleton";
import { US_TICKERS } from "@/data/tickers";
import {
  Cpu,
  HeartPulse,
  Landmark,
  ShoppingBasket,
  Flame,
  Tv2,
  Building2,
  BarChart2,
  Layers,
} from "lucide-react";

const SECTOR_ICONS: Record<string, React.ElementType> = {
  Technology: Cpu,
  Healthcare: HeartPulse,
  Financials: Landmark,
  "Consumer Staples": ShoppingBasket,
  Energy: Flame,
  "Communication Services": Tv2,
  "Real Estate": Building2,
  Industrials: BarChart2,
  "Consumer Discretionary": ShoppingBasket,
  Utilities: Layers,
};

export function PortfolioByCategory() {
  const { holdings, isLoading } = useHoldings();

  const categories = useMemo<StockCategory[]>(() => {
    const tickerMap = new Map(US_TICKERS.map((t) => [t.symbol, t]));
    const sectorMap = new Map<string, StockCategory>();

    for (const holding of holdings) {
      const info = tickerMap.get(holding.ticker);
      const sector = info?.sector ?? "Other";
      const icon = SECTOR_ICONS[sector] ?? Layers;

      if (!sectorMap.has(sector)) {
        sectorMap.set(sector, { title: sector, icon, stocks: [] });
      }

      sectorMap.get(sector)!.stocks.push({
        ticker: holding.ticker,
        name: info?.name ?? holding.ticker,
        price: 0,
        change: 0,
      });
    }

    return Array.from(sectorMap.values());
  }, [holdings]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Add holdings in Settings to see your portfolio by category.
      </p>
    );
  }

  return <StockCategoryList categories={categories} />;
}
