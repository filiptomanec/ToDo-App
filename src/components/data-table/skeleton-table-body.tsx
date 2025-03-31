import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
    columns: number;
    rows: number;
    columnWidths?: string[];
}

export function SkeletonTableBody({
    columns = 4,
    rows = 5,
}: SkeletonTableProps) {
    return Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                    <Skeleton className="h-5 w-full" />
                </TableCell>
            ))}
        </TableRow>
    ));
}
