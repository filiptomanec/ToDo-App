import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/types/Task.tsx";
import { Button } from "@/components/ui/button.tsx";
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
import { useEffect } from "react";
import { handleSortingChange } from "@/lib/utils.ts";
import { useAppDispatch } from "@/redux/redux-hooks.ts";
import { openDialog } from "@/redux/taskDialogSlice.ts";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "completed",
        header: ({ table }) => {
            const [completeTask] = useCompleteTaskMutation();
            const [incompleteTask] = useIncompleteTaskMutation();

            const handleToggleAll = async (checked: boolean) => {
                const tasks = table
                    .getRowModel()
                    .rows.map((row) => row.original)
                    .filter((task) => task.completed !== checked);

                tasks.forEach((task) => {
                    checked ? completeTask(task.id) : incompleteTask(task.id);
                });
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
        cell: ({ row, getValue }) => {
            const [completeTask] = useCompleteTaskMutation();
            const [incompleteTask] = useIncompleteTaskMutation();

            useEffect(() => {
                row.toggleSelected(Boolean(getValue()));
            }, [row, getValue]);

            const handleCheckedChange = async (checked: boolean) => {
                checked
                    ? await completeTask(row.original.id)
                    : await incompleteTask(row.original.id);
            };

            return (
                <Checkbox
                    checked={Boolean(getValue())}
                    onCheckedChange={handleCheckedChange}
                />
            );
        },
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
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const task = row.original;
            const dispatch = useAppDispatch();

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
