import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useEffect } from "react";
import { Row } from "@tanstack/react-table";
import { Task } from "@/types/Task.ts";
import {
    useCompleteTaskMutation,
    useIncompleteTaskMutation,
} from "@/services/task.tsx";

interface TaskCompletedCellProps {
    row: Row<Task>;
    getValue: () => boolean;
}

const TaskCompletedCell = ({ row, getValue }: TaskCompletedCellProps) => {
    const [completeTask] = useCompleteTaskMutation();
    const [incompleteTask] = useIncompleteTaskMutation();

    useEffect(() => {
        const isSelected = Boolean(getValue());
        if (row.getIsSelected() !== isSelected) {
            row.toggleSelected(isSelected);
        }
    }, [row, getValue]);

    const handleCheckedChange = async (checked: boolean) =>
        await (checked
            ? completeTask(row.original.id)
            : incompleteTask(row.original.id));

    return (
        <Checkbox
            checked={Boolean(getValue())}
            onCheckedChange={handleCheckedChange}
        />
    );
};

export { TaskCompletedCell };
