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
  token?: string;
}

const TOKEN_KEY = "admin_auth_token";

export const authService = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // storage unavailable
    }
  },

  clearToken: (): void => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // storage unavailable
    }
  },

  checkAuth: async (): Promise<boolean> => {
    try {
      const data = await request<AuthCheckResponse>("/api/admin/auth");
      return !!data.authenticated;
    } catch {
      return false;
    }
  },

  login: async (credentials: AdminLoginCredentials): Promise<AuthLoginResponse> => {
    const res = await request<AuthLoginResponse>("/api/admin/auth", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (res.token) {
      authService.setToken(res.token);
    }
    return res;
  },

  logout: async (): Promise<void> => {
    try {
      await request<AuthLoginResponse>("/api/admin/auth", {
        method: "DELETE",
      });
    } finally {
      authService.clearToken();
    }
  },
};
