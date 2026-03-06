import { useState } from "react";
import { Ticker } from "@/types/ticker";
import { getToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectedTicker {
  ticker: string;
  quantity: number;
}

interface TickerSelectorProps {
  selected: SelectedTicker[];
  onChange: (selected: SelectedTicker[]) => void;
}

export function TickerSelector({ selected, onChange }: TickerSelectorProps) {
  const [results, setResults] = useState<Ticker[]>([]);
  const [pendingQty, setPendingQty] = useState<Record<string, string>>({});

  const handleSearch = async (q: string) => {
    if (!q) { setResults([]); return; }
    const res = await fetch(`/api/tickers?q=${encodeURIComponent(q)}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setResults(data);
  };

  const addTicker = (symbol: string) => {
    if (selected.find((s) => s.ticker === symbol)) return;
    onChange([...selected, { ticker: symbol, quantity: 1 }]);
    setPendingQty((prev) => ({ ...prev, [symbol]: "1" }));
  };

  const removeTicker = (symbol: string) => {
    onChange(selected.filter((s) => s.ticker !== symbol));
  };

  const updateQuantity = (symbol: string, qty: string) => {
    setPendingQty((prev) => ({ ...prev, [symbol]: qty }));
    const num = parseFloat(qty);
    if (num > 0) {
      onChange(
        selected.map((s) => (s.ticker === symbol ? { ...s, quantity: num } : s))
      );
    }
  };

  return (
    <div className="space-y-4">
      <Command className="rounded-lg border shadow-sm">
        <CommandInput
          placeholder="Search tickers (e.g. AAPL, Tesla)..."
          onValueChange={handleSearch}
        />
        <CommandList className="max-h-48">
          <CommandEmpty>No tickers found. Try a different search.</CommandEmpty>
          <CommandGroup>
            {results.map((ticker) => {
              const isSelected = !!selected.find((s) => s.ticker === ticker.symbol);
              return (
                <CommandItem
                  key={ticker.symbol}
                  onSelect={() => (isSelected ? removeTicker(ticker.symbol) : addTicker(ticker.symbol))}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
                  />
                  <span className="font-mono font-medium">{ticker.symbol}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{ticker.name}</span>
                  {ticker.sector && (
                    <Badge variant="outline" className="ml-auto text-xs">
                      {ticker.sector}
                    </Badge>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>

      {selected.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Selected holdings:</p>
          <div className="space-y-2">
            {selected.map((s) => (
              <div key={s.ticker} className="flex items-center gap-2 rounded-md border px-3 py-2">
                <span className="font-mono text-sm font-semibold">{s.ticker}</span>
                <Input
                  type="number"
                  min="0.000001"
                  step="any"
                  value={pendingQty[s.ticker] ?? String(s.quantity)}
                  onChange={(e) => updateQuantity(s.ticker, e.target.value)}
                  className="ml-auto h-7 w-24 text-right text-sm"
                  placeholder="Qty"
                />
                <span className="text-xs text-muted-foreground">shares</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => removeTicker(s.ticker)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
