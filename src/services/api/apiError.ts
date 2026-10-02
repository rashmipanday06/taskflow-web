import axios from "axios";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

interface ApiErrorResponse {
  message?: string;
}

export const getApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      message:
        error.response?.data?.message ??
        error.message ??
        "Something went wrong.",
      status: error.response?.status,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Something went wrong.",
  };
};