import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });

export const baseQueryWithErrorHandling: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    let errorMessage = "An unknown error occurred.";

    if ("originalStatus" in result.error) {
      switch (result.error.originalStatus) {
        case 400:
          errorMessage = "Bad request. Please check your input.";
          break;
        case 404:
          errorMessage = "Not found. The requested resource does not exist.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = `Unexpected error (status: ${result.error.status}).`;
      }
    }

    toast.error("Request failed", { description: errorMessage });
  }

  return result;
};
