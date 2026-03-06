import { Holding } from "@/types/holding";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface HoldingRowProps {
  holding: Holding;
  onDelete: (id: string) => Promise<void>;
}

export function HoldingRow({ holding, onDelete }: HoldingRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Badge variant="outline" className="font-mono">
          {holding.ticker}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">{holding.quantity}</TableCell>
      <TableCell className="text-xs text-muted-foreground">
        {new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(holding.createdAt))}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(holding.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
