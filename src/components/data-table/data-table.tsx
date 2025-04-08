import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useDeleteTaskMutation } from "@/services/task";
import { DataTableHeader } from "./data-table-header.tsx";
import { DataTableContent } from "./data-table-content.tsx";
import { DataTableFooter } from "./data-table-footer.tsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
}: DataTableProps<TData, TValue>) {
    const [deleteTask, { isLoading: isLoadingDelete }] =
        useDeleteTaskMutation();
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
        enableRowSelection: true,
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div className="flex flex-col gap-4 w-full max-w-200">
            <DataTableHeader table={table} />
            <DataTableContent
                table={table}
                isLoading={isLoading}
                columnsLength={columns.length}
            />
            <DataTableFooter
                table={table}
                deleteTask={deleteTask}
                isLoadingDelete={isLoadingDelete}
            />
        </div>
    );
}
