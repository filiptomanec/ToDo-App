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
    }),

    updateTask: builder.mutation<Task, { id: string; data: UpdateTaskRequest }>(
      {
        query: ({ id, data }) => ({
          url: `tasks/${id}`,
          method: "POST",
          body: data,
        }),
      },
    ),

    deleteTask: builder.mutation<string, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),

    completeTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `tasks/${id}/complete`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            const task = draft.find((task) => task.id === id);
            if (task) {
              task.completed = true;
              task.completedDate = Date.now();
            }
          }),
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
          taskApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            const task = draft.find((task) => task.id === id);
            if (task) {
              task.completed = false;
              task.completedDate = undefined;
            }
          }),
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
