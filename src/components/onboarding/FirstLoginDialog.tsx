"use client";

import { useState } from "react";
import { useFirstLogin } from "@/hooks/useFirstLogin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TickerSelector, SelectedTicker } from "./TickerSelector";
import { TrendingUp } from "lucide-react";

export function FirstLoginDialog() {
  const { showDialog, markOnboarded } = useFirstLogin();
  const [selected, setSelected] = useState<SelectedTicker[]>([]);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // POST each holding
      await Promise.all(
        selected.map((s) =>
          fetch("/api/holdings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ticker: s.ticker, quantity: s.quantity }),
          })
        )
      );
      await markOnboarded();
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
    await markOnboarded();
  };

  return (
    <Dialog open={showDialog}>
      <DialogContent className="max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <DialogTitle>Welcome to TechFin</DialogTitle>
          </div>
          <DialogDescription>
            Add your current holdings to get personalized investment suggestions and portfolio insights.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <TickerSelector selected={selected} onChange={setSelected} />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={handleSkip} disabled={saving}>
            Skip for now
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : `Save${selected.length > 0 ? ` ${selected.length} holding${selected.length > 1 ? "s" : ""}` : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
