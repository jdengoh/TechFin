import { useState } from "react";
import { TickerSearchCombobox } from "./TickerSearchCombobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddTickerFormProps {
  onAdd: (ticker: string, quantity: number) => Promise<void>;
}

export function AddTickerForm({ onAdd }: AddTickerFormProps) {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantity);
    if (!ticker) {
      setError("Please select a ticker.");
      return;
    }
    if (!qty || qty <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onAdd(ticker, qty);
      setTicker("");
      setQuantity("");
    } catch {
      setError("Failed to add holding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs">Ticker</Label>
        <TickerSearchCombobox value={ticker} onChange={setTicker} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Quantity</Label>
        <Input
          type="number"
          placeholder="0.00"
          min="0.000001"
          step="any"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-32"
        />
      </div>
      <Button type="submit" disabled={loading} size="sm" className="gap-1.5">
        <Plus className="h-4 w-4" />
        {loading ? "Adding..." : "Add Holding"}
      </Button>
      {error && <p className="w-full text-xs text-destructive">{error}</p>}
    </form>
  );
}
