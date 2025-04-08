import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form/form.tsx";
import { Button } from "@/components/ui/button/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
    useCreateTaskMutation,
    useUpdateTaskMutation,
} from "@/services/task.tsx";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks.ts";
import { closeDialog } from "@/redux/taskDialogSlice.ts";

const formSchema = z.object({
    text: z.string().min(2).max(50),
});

export function TaskForm() {
    const dispatch = useAppDispatch();
    const { mode, task } = useAppSelector((state) => state.taskDialog);
    const [createTask, { isLoading: isLoadingCreate }] =
        useCreateTaskMutation();
    const [updateTask, { isLoading: isLoadingUpdate }] =
        useUpdateTaskMutation();
    const isLoading = isLoadingCreate || isLoadingUpdate;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: task?.text ?? "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === "edit" && task) {
            updateTask({ id: task!.id, data: { text: values.text } }).then(() =>
                dispatch(closeDialog()),
            );
        } else if (mode === "create") {
            createTask({ text: values.text }).then(() =>
                dispatch(closeDialog()),
            );
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Input placeholder="Your task..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    {isLoading ? "Saving..." : "Save"}
                </Button>
            </form>
        </Form>
    );
}
