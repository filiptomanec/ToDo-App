import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/types/Task.ts";

type DialogMode = "create" | "edit" | "delete" | undefined;

interface TaskDialogState {
    mode: DialogMode;
    task?: Task;
}

const initialState: TaskDialogState = {
    mode: undefined,
    task: undefined,
};

export const taskDialogSlice = createSlice({
    name: "taskDialog",
    initialState,
    reducers: {
        openDialog: (
            state,
            action: PayloadAction<{ mode: DialogMode; task?: Task }>,
        ) => {
            state.mode = action.payload.mode;
            state.task = action.payload.task;
        },
        closeDialog: (state) => {
            state.mode = undefined;
            state.task = undefined;
        },
    },
});

export const { openDialog, closeDialog } = taskDialogSlice.actions;
export default taskDialogSlice.reducer;
