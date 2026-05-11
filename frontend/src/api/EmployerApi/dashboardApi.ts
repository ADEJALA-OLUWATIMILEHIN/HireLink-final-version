import type { EmployerDashboardStats } from "../../Dashboard/types";

const baseUrl = "http://localhost:3005/api/v1";

export const getEmployerDashboardStats = async (): Promise<{
  ok: boolean;
  message: string;
  stats: EmployerDashboardStats;
}> => {
  try {
    const res = await fetch(`${baseUrl}/dashboard/employer`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const data = await res.json();

    return {
      ok: res.ok,
      message: data.message ?? "Dashboard stats retrieved",
      stats: {
        activeJobs: data.stats?.activeJobs ?? 0,
        totalApplicants: data.stats?.totalApplications ?? 0,
        totalJobPosted: data.stats?.totalJobs ?? 0,
        shortlisted: 0,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Could not load dashboard stats",
      stats: {
        activeJobs: 0,
        totalApplicants: 0,
        totalJobPosted: 0,
        shortlisted: 0,
      },
    };
  }
};
