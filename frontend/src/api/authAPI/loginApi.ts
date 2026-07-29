import { API_BASE_URL } from "../config";

export const loginApi = async (data: { email: string; password: string;role :string }) => {
  const baseUrl = API_BASE_URL;
  console.log(baseUrl);
  console.log(data);
  console.log("Login API called");
  try {
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    });
    
    if (!res.ok)
      return { message: "Something went wrong. Try again later", role: "null" };

    const msg = await res.json();
    // console.log(token)

    if (msg) {
      localStorage.setItem("jwt", msg.token);
    }

    return { message: "success", role: data.role };
  } catch (error) {
    console.log(error);
    return { message: "An error occured. Try again Later", role: "null" };
  }
};
