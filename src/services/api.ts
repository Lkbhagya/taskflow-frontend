const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  auth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): HeadersInit {
    const token =
      localStorage.getItem('taskflow_access_token') ??
      sessionStorage.getItem('taskflow_access_token');

    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { body, auth = false, headers, ...rest } = options;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? this.getAuthHeaders() : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const message =
        typeof errorBody === 'object' &&
        errorBody !== null &&
        'message' in errorBody &&
        typeof errorBody.message === 'string'
          ? errorBody.message
          : `Request failed with status ${response.status}`;

      throw new Error(message);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }
}

export const api = new ApiClient(API_BASE_URL);
