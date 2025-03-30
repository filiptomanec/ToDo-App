import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "@/types/Task";

interface CreateTaskRequest {
  text: string;
}

interface UpdateTaskRequest {
  text: string;
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
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
    }),

    incompleteTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `tasks/${id}/incomplete`,
        method: "POST",
      }),
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
