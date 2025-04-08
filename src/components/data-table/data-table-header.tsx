import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button/button";
import { Plus } from "lucide-react";
import { openDialog } from "@/redux/taskDialogSlice";
import { useAppDispatch } from "@/redux/redux-hooks";
import { Table } from "@tanstack/react-table";

interface DataTableHeaderProps<TData> {
    table: Table<TData>;
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
    const dispatch = useAppDispatch();

    return (
        <div className="flex justify-between items-end">
            <div className="flex flex-col md:flex-row gap-3">
                <Label htmlFor="filter">Filter by:</Label>
                <RadioGroup
                    defaultValue="all"
                    id="filter"
                    className="flex flex-col md:flex-row"
                    value={
                        (table
                            .getColumn("completed")
                            ?.getFilterValue() as string) ?? "all"
                    }
                    onValueChange={(value) =>
                        table.getColumn("completed")?.setFilterValue(value)
                    }
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="completed" id="completed" />
                        <Label htmlFor="completed">Completed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="not-completed"
                            id="not-completed"
                        />
                        <Label htmlFor="not-completed">Not Completed</Label>
                    </div>
                </RadioGroup>
            </div>
            <Button
                size="icon"
                onClick={() => dispatch(openDialog({ mode: "create" }))}
            >
                <Plus />
            </Button>
        </div>
    );
}
