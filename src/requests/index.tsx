type FetchApiOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
};

type FetchApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

async function fetchApi<T = unknown>(
  url: string,
  options: FetchApiOptions = {}
): Promise<FetchApiResponse<T>> {
  const {
    method = "GET",
    headers = {},
    body,
    signal,
    credentials,
  } = options;

  const fetchRequestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    signal,
    credentials,
  };

  if (body !== undefined && method !== "GET") {
    fetchRequestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchRequestOptions);
    const contentType = response.headers.get("content-type");
    let responseData: T | null = null;

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = (await response.text()) as T;
    }

    if (!response.ok) {
      return {
        data: null,
        error:
          responseData && typeof responseData === "object" && "message" in responseData
            ? (responseData as { message: string }).message
            : response.statusText,
        status: response.status,
      };
    }

    return {
      data: responseData,
      error: null,
      status: response.status,
    };
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      data: null,
      error: errorMessage,
      status: 0,
    };
  }
}

export default fetchApi;