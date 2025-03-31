import { createApi } from "@reduxjs/toolkit/query/react";
import { Task } from "@/types/Task";
import { baseQueryWithErrorHandling } from "@/services/baseQueryWithErrorHandling.ts";

interface CreateTaskRequest {
    text: string;
}

interface UpdateTaskRequest {
    text: string;
}

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        getAllTasks: builder.query<Task[], void>({
            query: () => "tasks",
        }),

        getCompletedTasks: builder.query<Task[], void>({
            query: () => "tasks/completed",
        }),

        createTask: builder.mutation<Task, CreateTaskRequest>({
            query: (body) => ({
                url: "tasks",
                method: "POST",
                body,
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData(
                        "getAllTasks",
                        undefined,
                        (draft) => {
                            draft.push({
                                id: "",
                                text: body.text,
                                completed: false,
                                createdDate: Date.now(),
                            });
                        },
                    ),
                );
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        taskApi.util.updateQueryData(
                            "getAllTasks",
                            undefined,
                            (draft) => {
                                const index = draft.findIndex(
                                    (task) => task.id === "",
                                );
                                if (index !== -1) {
                                    draft[index] = data;
                                }
                            },
                        ),
                    );
                } catch {
                    patchResult.undo();
                }
            },
        }),

        updateTask: builder.mutation<
            Task,
            { id: string; data: UpdateTaskRequest }
        >({
            query: ({ id, data }) => ({
                url: `tasks/${id}`,
                method: "POST",
                body: data,
            }),
            async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData(
                        "getAllTasks",
                        undefined,
                        (draft) => {
                            const task = draft.find((task) => task.id === id);
                            if (task) {
                                task.text = data.text;
                            }
                        },
                    ),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        deleteTask: builder.mutation<string, string>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData(
                        "getAllTasks",
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(
                                (task) => task.id === id,
                            );
                            if (index !== -1) {
                                draft.splice(index, 1);
                            }
                        },
                    ),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        completeTask: builder.mutation<Task, string>({
            query: (id) => ({
                url: `tasks/${id}/complete`,
                method: "POST",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData(
                        "getAllTasks",
                        undefined,
                        (draft) => {
                            const task = draft.find((task) => task.id === id);
                            if (task) {
                                task.completed = true;
                                task.completedDate = Date.now();
                            }
                        },
                    ),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        incompleteTask: builder.mutation<Task, string>({
            query: (id) => ({
                url: `tasks/${id}/incomplete`,
                method: "POST",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData(
                        "getAllTasks",
                        undefined,
                        (draft) => {
                            const task = draft.find((task) => task.id === id);
                            if (task) {
                                task.completed = false;
                                task.completedDate = undefined;
                            }
                        },
                    ),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetAllTasksQuery,
    useGetCompletedTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useCompleteTaskMutation,
    useIncompleteTaskMutation,
} = taskApi;
