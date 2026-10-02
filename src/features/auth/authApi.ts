
import apiClient from "../../services/api/apiClient";
import { LoginCredentials, RegisterData,  AuthResponse } from "./authTypes";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
    return response.data;
};
export const register = async (data: RegisterData): Promise<AuthResponse> => {
const response= await apiClient.post<AuthResponse>("/auth/register", data);
return response.data;
}
  