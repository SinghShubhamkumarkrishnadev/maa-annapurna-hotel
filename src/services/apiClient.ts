export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function request<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token =
      sessionStorage.getItem("admin_auth_token") ||
      localStorage.getItem("admin_auth_token");
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options?.headers as Record<string, string> | undefined),
    },
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new ApiError(data.error || `Request failed with status ${response.status}`, response.status);
  }

  return data as T;
}
