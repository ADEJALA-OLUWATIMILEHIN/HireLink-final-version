import { API_BASE_URL } from "../config";

export const SignUpApi = async (data: any) => {
  const baseUrl = API_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      const errorMessage = errorBody?.message ?? "Something went wrong. Try again later";
      return { message: errorMessage, role: "null" };
    }

    const msg = await res.json();
    return { message: "success", role: msg?.role ?? data.role };

  } catch (error) {
    console.error("[SignUpApi] Unexpected error:", error);
    return { message: "An error occurred. Try again later", role: "null" };
  }
};
