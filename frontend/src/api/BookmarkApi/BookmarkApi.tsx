import { mapJob, type ApiJob, type Job } from "../EmployerApi/GetJobs";
import { API_BASE_URL as baseUrl } from "../config";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

export const getBookmarks = async (): Promise<{
  ok: boolean;
  message: string;
  jobs: Job[];
}> => {
  try {
    const response = await fetch(`${baseUrl}/bookmarks`, {
      headers: authHeaders(),
    });
    const data = await response.json();

    return {
      ok: response.ok,
      message: data.message ?? "Bookmarks retrieved",
      jobs: Array.isArray(data.bookmarks)
        ? data.bookmarks
            .map((bookmark: { job?: ApiJob }) =>
              bookmark.job ? mapJob({ ...bookmark.job, is_active: true }) : null
            )
            .filter(Boolean)
        : [],
    };
  } catch (error) {
    console.error("Error fetching bookmarked jobs:", error);
    return { ok: false, message: "Could not load bookmarks", jobs: [] };
  }
};

export const addBookmark = async (jobId: number) => {
  try {
    const response = await fetch(`${baseUrl}/bookmarks/${jobId}`, {
      method: "POST",
      headers: authHeaders(),
    });
    const data = await response.json();

    return {
      ok: response.ok,
      message: data.message ?? "Bookmark saved",
    };
  } catch (error) {
    console.error("Error bookmarking job:", error);
    return { ok: false, message: "Could not bookmark job" };
  }
};

export const removeBookmark = async (jobId: number) => {
  try {
    const response = await fetch(`${baseUrl}/bookmarks/${jobId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    const data = await response.json();
    return {
      ok: response.ok,
      message: data.message ?? "Bookmark removed",
    };
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return { ok: false, message: "Could not remove bookmark" };
  }
};
