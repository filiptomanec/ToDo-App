import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/types/Task.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  useCompleteTaskMutation,
  useIncompleteTaskMutation,
} from "@/services/task.tsx";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "completed",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row, getValue }) => {
      const [completeTask] = useCompleteTaskMutation();
      const [incompleteTask] = useIncompleteTaskMutation();

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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Completed Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
];
