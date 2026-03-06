import { useHoldings } from "@/hooks/useHoldings";
import { HoldingRow } from "./HoldingRow";
import { AddTickerForm } from "./AddTickerForm";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

export function HoldingsList() {
  const { holdings, isLoading, addHolding, deleteHolding } = useHoldings();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Add New Holding</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTickerForm onAdd={(ticker, quantity) => addHolding({ ticker, quantity })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Briefcase className="h-4 w-4" />
            My Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : holdings.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No holdings yet. Add your first holding above.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding) => (
                  <HoldingRow
                    key={holding.id}
                    holding={holding}
                    onDelete={deleteHolding}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
