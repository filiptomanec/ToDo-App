import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/types/Task.tsx";
import { Button } from "@/components/ui/button/button.tsx";
import {
    ArrowDown01,
    ArrowDownAZ,
    ArrowUp01,
    ArrowUpAZ,
    ArrowUpDown,
    Pencil,
    Trash2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
    useCompleteTaskMutation,
    useIncompleteTaskMutation,
} from "@/services/task.tsx";
import { handleSortingChange } from "@/lib/utils.ts";
import { openDialog } from "@/redux/taskDialogSlice.ts";
import { AppDispatch } from "@/redux/store.ts";
import { TaskCompletedCell } from "@/components/data-table/task-completed-cell.tsx";

declare module "@tanstack/react-table" {
    // Type parameters are required by the library but unused here.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        className?: string;
    }
}

interface GetColumnsProps {
    completeTask: ReturnType<typeof useCompleteTaskMutation>[0];
    incompleteTask: ReturnType<typeof useIncompleteTaskMutation>[0];
    dispatch: AppDispatch;
}

export const getColumns = ({
    completeTask,
    incompleteTask,
    dispatch,
}: GetColumnsProps): ColumnDef<Task>[] => [
    {
        accessorKey: "completed",
        header: ({ table }) => {
            const handleToggleAll = async (checked: boolean) => {
                const tasks = table
                    .getRowModel()
                    .rows.map((row) => row.original)
                    .filter((task) => task.completed !== checked);

                await Promise.all(
                    tasks.map((task) =>
                        checked
                            ? completeTask(task.id)
                            : incompleteTask(task.id),
                    ),
                );
            };

            return (
                <Checkbox
                    id="select-all"
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => handleToggleAll(!!value)}
                    aria-label="Select all"
                />
            );
        },
        cell: ({ row, getValue }) => (
            <TaskCompletedCell row={row} getValue={getValue as () => boolean} />
        ),
        filterFn: (row, columnId, filterValue) => {
            if (filterValue === "all") return true;
            if (filterValue === "completed") return row.getValue(columnId);
            if (filterValue === "not-completed")
                return row.getValue(columnId) === false;
            return true;
        },
    },
    {
        accessorKey: "text",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => handleSortingChange(column)}
                >
                    Task
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <ArrowDownAZ className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUpAZ className="ml-2 h-4 w-4" />
                        )
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
    },
    {
        accessorKey: "createdDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => handleSortingChange(column)}
                >
                    Created Date
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <ArrowDown01 className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUp01 className="ml-2 h-4 w-4" />
                        )
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdDate"));
            return date.toLocaleDateString();
        },
        meta: { className: "hidden md:table-cell" },
    },
    {
        accessorKey: "completedDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => handleSortingChange(column)}
                >
                    Completed Date
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <ArrowDown01 className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUp01 className="ml-2 h-4 w-4" />
                        )
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            const completedDate: number = row.getValue("completedDate");
            if (!completedDate) return "Not Completed";
            const date = new Date(completedDate);
            return date.toLocaleDateString();
        },
        meta: { className: "hidden sm:table-cell" },
    },
    {
        id: "actions",
        header: "Actions",
        size: 0,
        cell: ({ row }) => {
            const task = row.original;
            return (
                <div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                            dispatch(openDialog({ mode: "edit", task }))
                        }
                    >
                        <Pencil />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                            dispatch(openDialog({ mode: "delete", task }))
                        }
                    >
                        <Trash2 />
                    </Button>
                </div>
            );
        },
    },
];
