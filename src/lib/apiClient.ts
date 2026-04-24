/**
 * Core API Client
 * Wraps native fetch to provide consistent request formatting, base URLs, and error catching.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

interface RequestOptions extends RequestInit {
  data?: unknown;
}

export const apiClient = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { data, headers, ...customConfig } = options;

  const config: RequestInit = {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...headers,
    },
    ...customConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;
    const response = await fetch(url, config);

    // Some endpoints (like webhooks) might return OK without JSON payload.
    // Try interpreting JSON first, fallback to text.
    let responseData: unknown;
    const isJson = response.headers.get("content-type")?.includes("application/json") ?? false;
    if (isJson) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const message = typeof responseData === 'object' && responseData !== null && 'message' in responseData
        ? (responseData as { message?: string }).message
        : undefined;
      throw new Error(message ?? "An API Error Occurred");
    }

    return responseData as T;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error(`[API Client Error] ${endpoint}:`, error);
    throw error;
  }
};
