import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowAdd?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowAdd,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-4 w-200">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <Label htmlFor="filter">Filter by:</Label>
          <RadioGroup
            defaultValue="all"
            id="filter"
            value={
              (table.getColumn("completed")?.getFilterValue() as string) ??
              "all"
            }
            onValueChange={(value) =>
              table.getColumn("completed")?.setFilterValue(value)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="completed" id="completed" />
              <Label htmlFor="completed">Completed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-completed" id="not-completed" />
              <Label htmlFor="not-completed">Not Completed</Label>
            </div>
          </RadioGroup>
        </div>
        <Button size="icon" onClick={onRowAdd}>
          <Plus />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
