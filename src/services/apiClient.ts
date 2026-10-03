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
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new ApiError(data.error || `Request failed with status ${response.status}`, response.status);
  }

  return data as T;
}
