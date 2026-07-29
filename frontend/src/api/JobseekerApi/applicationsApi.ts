import type { Application } from "../../Dashboard/types";
import { API_BASE_URL as baseUrl } from "../config";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

const statusMap: Record<string, Application["status"]> = {
  pending: "Applied",
  reviewed: "Shortlisted",
  accepted: "Hired",
  rejected: "Rejected",
};

const formatDate = (date?: string) => {
  if (!date) return "Recently";

  return new Date(date).toLocaleDateString();
};

const readJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return {};
  }
};

export const getMyApplications = async (): Promise<{
  ok: boolean;
  message: string;
  applications: Application[];
}> => {
  try {
    const res = await fetch(`${baseUrl}/application/my-applications`, {
      headers: authHeaders(),
    });
    const data = await readJson(res);

    return {
      ok: res.ok,
      message: data.message ?? "Applications retrieved",
      applications: Array.isArray(data.applications)
        ? data.applications.map((application: any) => ({
            id: String(application.id),
            jobTitle: application.job?.title ?? "Untitled job",
            company: application.job?.company ?? "Unknown company",
            appliedDate: formatDate(
              application.applied_date ?? application.created_at
            ),
            status: statusMap[application.status] ?? "Applied",
          }))
        : [],
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Could not load applications", applications: [] };
  }
};

export const applyForJob = async (
  jobId: number,
  payload: { resume: File; coverLetter: string; notes?: string }
) => {
  try {
    const formData = new FormData();
    formData.append("resume", payload.resume);
    formData.append("cover_letter", payload.coverLetter);
    if (payload.notes) formData.append("notes", payload.notes);

    const res = await fetch(`${baseUrl}/application/apply/${jobId}`, {
      method: "POST",
      headers: authHeaders(),
      body: formData,
    });
    const data = await readJson(res);

    return {
      ok: res.ok,
      message: data.message ?? "Application submitted",
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Could not submit application" };
  }
};
