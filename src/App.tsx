import { DataTable } from "@/components/data-table/data-table.tsx";
import { getColumns } from "@/components/data-table/columns.tsx";
import {
    useCompleteTaskMutation,
    useGetAllTasksQuery,
    useIncompleteTaskMutation,
} from "@/services/task.tsx";
import { TaskDialog } from "@/components/task-dialog.tsx";
import { useMemo } from "react";
import { useAppDispatch } from "@/redux/redux-hooks.ts";

function App() {
    const { data, isLoading } = useGetAllTasksQuery();
    const [completeTask] = useCompleteTaskMutation();
    const [incompleteTask] = useIncompleteTaskMutation();
    const dispatch = useAppDispatch();

    const columns = useMemo(
        () =>
            getColumns({
                completeTask,
                incompleteTask,
                dispatch,
            }),
        [completeTask, incompleteTask, dispatch],
    );

    return (
        <div className="flex justify-center h-screen p-5 md:p-10">
            <DataTable
                columns={columns}
                data={data ?? []}
                isLoading={isLoading}
            />
            <TaskDialog />
        </div>
    );
}

export default App;
