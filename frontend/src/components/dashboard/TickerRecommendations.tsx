import useSWR from "swr";
import { TickerSuggestion } from "@/types/ticker";
import { authedFetcher } from "@/lib/fetcher";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";

export function TickerRecommendations() {
  const { data, isLoading, error } = useSWR<TickerSuggestion[]>(
    "/api/suggestions",
    authedFetcher
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          Investment Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-muted-foreground">Failed to load suggestions.</p>
        ) : !data || data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Add holdings in Settings to receive personalized suggestions.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((s) => (
                <TableRow key={s.ticker}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {s.ticker}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{s.quantity}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {s.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
