import { DataTable } from "@/components/data-table/data-table.tsx";
import { columns } from "@/components/data-table/columns.tsx";
import { useGetAllTasksQuery } from "@/services/task.tsx";
import { TaskDialog } from "@/components/task-dialog.tsx";

function App() {
    const { data, isLoading } = useGetAllTasksQuery();

    return (
        <div className="flex justify-center p-50">
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
