import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Column } from "@tanstack/react-table";
import { Task } from "@/types/Task.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const handleSortingChange = (column: Column<Task, unknown>) => {
    if (!column.getIsSorted()) {
        column.toggleSorting(false); // Sort in ascending order
    } else if (column.getIsSorted() === "asc") {
        column.toggleSorting(true); // Sort in descending order
    } else {
        column.clearSorting(); // Clear sorting
    }
};
