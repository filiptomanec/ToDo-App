import { Button } from "@/components/ui/button/button";
import { Loader2 } from "lucide-react";
import { Task } from "@/types/Task";
import { Table } from "@tanstack/react-table";

interface DataTableFooterProps<TData> {
    table: Table<TData>;
    deleteTask: (id: string) => void;
    isLoadingDelete: boolean;
}

export function DataTableFooter<TData>({
    table,
    deleteTask,
    isLoadingDelete,
}: DataTableFooterProps<TData>) {
    const completedTasks = table
        .getRowModel()
        .rows.filter((row) => (row.original as Task).completed);

    return (
        <div className="flex justify-between items-center">
            <span>{completedTasks.length} completed</span>
            <Button
                variant="destructive"
                onClick={() => {
                    completedTasks.forEach((task) =>
                        deleteTask((task.original as Task).id),
                    );
                }}
                disabled={isLoadingDelete || completedTasks.length === 0}
            >
                {isLoadingDelete && <Loader2 className="animate-spin" />}
                {isLoadingDelete ? "Deleting..." : "Delete Completed Tasks"}
            </Button>
        </div>
    );
}
