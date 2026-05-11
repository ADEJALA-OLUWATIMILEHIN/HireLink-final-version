const baseUrl = "http://localhost:3005/api/v1";

export const resetPasswordApi = async (userId: string | number, password: string) => {
  try {
    const res = await fetch(`${baseUrl}/${userId}/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Unable to update password. Try again later",
      };
    }

    return {
      success: true,
      message: data?.message || "Password reset successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred. Try again later",
    };
  }
};
