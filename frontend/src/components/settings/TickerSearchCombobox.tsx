import { useState, useCallback } from "react";
import { Ticker } from "@/types/ticker";
import { getToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TickerSearchComboboxProps {
  value: string;
  onChange: (ticker: string) => void;
}

function useDebouncedSearch() {
  const [results, setResults] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tickers?q=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, search };
}

export function TickerSearchCombobox({ value, onChange }: TickerSearchComboboxProps) {
  const [open, setOpen] = useState(false);
  const { results, search } = useDebouncedSearch();

  const handleInputChange = (val: string) => {
    if (val.length >= 1) {
      search(val);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between font-mono"
        >
          {value || "Select ticker..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search tickers..."
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty>No tickers found.</CommandEmpty>
            <CommandGroup>
              {results.map((ticker) => (
                <CommandItem
                  key={ticker.symbol}
                  value={ticker.symbol}
                  onSelect={(val) => {
                    onChange(val.toUpperCase());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === ticker.symbol ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="font-mono font-medium">{ticker.symbol}</span>
                  <span className="ml-2 truncate text-xs text-muted-foreground">
                    {ticker.name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
