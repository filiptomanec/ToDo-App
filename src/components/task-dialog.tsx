import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import { TaskForm } from "@/components/task-form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";
import { useDeleteTaskMutation } from "@/services/task.tsx";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks.ts";
import { closeDialog } from "@/redux/taskDialogSlice.ts";

const titles = {
    create: "Create Task",
    edit: "Edit Task",
    delete: "Delete Task",
};

const descriptions = {
    create: "Create a new task here. Click save when you're done.",
    edit: "Edit your task details and click save.",
    delete: "Are you sure you want to delete this task? This action cannot be undone.",
};

export function TaskDialog() {
    const dispatch = useAppDispatch();
    const { mode, task } = useAppSelector((state) => state.taskDialog);
    const [deleteTask, { isLoading: isLoadingDelete }] =
        useDeleteTaskMutation();

    function onDeleteClick() {
        if (task) {
            deleteTask(task.id).then(() => dispatch(closeDialog()));
        }
    }

    return (
        <Dialog open={!!mode} onOpenChange={() => dispatch(closeDialog())}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{titles[mode!]}</DialogTitle>
                    <DialogDescription>{descriptions[mode!]}</DialogDescription>
                </DialogHeader>
                {mode === "delete" ? (
                    <Button
                        variant="destructive"
                        disabled={isLoadingDelete}
                        onClick={onDeleteClick}
                    >
                        {isLoadingDelete && (
                            <Loader2 className="animate-spin" />
                        )}
                        {isLoadingDelete ? "Deleting..." : "Delete"}
                    </Button>
                ) : (
                    <TaskForm />
                )}
            </DialogContent>
        </Dialog>
    );
}
