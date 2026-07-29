import type { PostNewJobFormSchemaType } from "../../schemas/postNewJobFormSchema";
import { API_BASE_URL } from "../config";

export const PostJobs = async (data :PostNewJobFormSchemaType) => {
    const baseUrl = API_BASE_URL;
    console.log(baseUrl);
    console.log(data);
    console.log("post Jobs API called");
    try {
      const res = await fetch(`${baseUrl}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(data),
        
      });
      
      if (!res.ok)
        return { message: "Something went wrong. Try again later", role: "null" };
  
      await res.json();
      // console.log(token)
  
      return { message: "job posted successfully",  };
    } catch (error) {
      console.log(error);
      return { message: "An error occured. Try again Later", role: "null" };
    }
  };
  
