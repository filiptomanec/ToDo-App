import { toast } from "sonner";
import { DataTable } from "@/components/data-table/data-table.tsx";
import { columns } from "@/components/data-table/columns.tsx";
import { useGetAllTasksQuery } from "@/services/task.tsx";

function App() {
  const { data, isLoading, refetch } = useGetAllTasksQuery();

  const handleAddRow = async () => {
    try {
      await refetch();
      toast.success("Task added successfully");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  if (isLoading) return <div>loading</div>;

  return (
    data && (
      <div className="flex justify-center p-50">
        {data && (
          <DataTable columns={columns} data={data} onRowAdd={handleAddRow} />
        )}
      </div>
    )
  );
}

export default App;
