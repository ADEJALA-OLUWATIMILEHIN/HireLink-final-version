import type { Application } from "../../Dashboard/types";

const baseUrl = "http://localhost:3005/api/v1";

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

export const getRecentApplications = async (): Promise<{
  ok: boolean;
  message: string;
  applications: Application[];
}> => {
  try {
    const res = await fetch(`${baseUrl}/dashboard/recentapplications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const data = await res.json();

    return {
      ok: res.ok,
      message: data.message ?? "Applications retrieved successfully",
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
    return {
      ok: false,
      message: "Could not load recent applications",
      applications: [],
    };
  }
};
