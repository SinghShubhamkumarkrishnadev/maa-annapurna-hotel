import { request } from "./apiClient";
import { AdminLoginCredentials } from "@/types/admin";

interface AuthCheckResponse {
  authenticated: boolean;
  username?: string;
}

interface AuthLoginResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const authService = {
  checkAuth: async (): Promise<boolean> => {
    try {
      const data = await request<AuthCheckResponse>("/api/admin/auth");
      return !!data.authenticated;
    } catch {
      return false;
    }
  },

  login: async (credentials: AdminLoginCredentials): Promise<AuthLoginResponse> => {
    return request<AuthLoginResponse>("/api/admin/auth", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  logout: async (): Promise<void> => {
    await request<AuthLoginResponse>("/api/admin/auth", {
      method: "DELETE",
    });
  },
};
