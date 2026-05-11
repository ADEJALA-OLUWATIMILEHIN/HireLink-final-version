import { mapJob, type ApiJob, type Job } from "./GetJobs";

export type { Job };

const baseUrl = "http://localhost:3005/api/v1";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

export const getMyEmployerJobs = async (): Promise<{
  ok: boolean;
  message: string;
  jobs: Job[];
}> => {
  try {
    const res = await fetch(`${baseUrl}/jobs/my-jobs`, {
      headers: authHeaders(),
    });
    const data = await res.json();

    return {
      ok: res.ok,
      message: data.message ?? "Jobs retrieved",
      jobs: Array.isArray(data.jobs)
        ? data.jobs.map((job: ApiJob) => mapJob(job))
        : [],
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Could not load jobs", jobs: [] };
  }
};

export const updateJobStatus = async (jobId: number, isActive: boolean) => {
  try {
    const res = await fetch(`${baseUrl}/jobs/status/${jobId}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ is_active: isActive }),
    });
    const data = await res.json();

    return {
      ok: res.ok,
      message: data.message ?? "Job status updated",
      job: data.job ? mapJob(data.job) : null,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Could not update job status", job: null };
  }
};

export const deleteJob = async (jobId: number) => {
  try {
    const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    const data = await res.json();

    return {
      ok: res.ok,
      message: data.message ?? "Job deleted",
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Could not delete job" };
  }
};
