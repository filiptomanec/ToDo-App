import { Button } from "@/components/ui/button";
import { useGetAllTasksQuery } from "@/services/task.ts";
import { toast } from "sonner";

function App() {
  const { data, error, isLoading, refetch } = useGetAllTasksQuery();

  if (error) {
    toast.error("Error loading tasks", {
      description: "An error occurred while fetching tasks.",
      action: (
        <Button variant="outline" onClick={() => refetch()}>
          Try Again
        </Button>
      ),
    });
  }

  if (isLoading) return <div>loading</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="flex flex-col w-100">
        {data?.map((task) => (
          <div key={task.id} className="flex items-center justify-between">
            <p>{task.text}</p>
            <Button variant="outline">Edit</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
