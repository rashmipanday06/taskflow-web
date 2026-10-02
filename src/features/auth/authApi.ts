import apiClient from "../../services/api/apiClient";
import { getApiError } from "../../services/api/apiError";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "./authTypes";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
};

export const register = async (
  data: RegisterData
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      data
    );

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
};