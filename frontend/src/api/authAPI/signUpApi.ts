export const SignUpApi = async (data: any) => {
  const baseUrl = "http://localhost:3005/api/v1";

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