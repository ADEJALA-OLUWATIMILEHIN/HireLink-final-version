export interface ApiJob {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
  location_type: string;
  salary_min?: number | null;
  salary_max?: number | null;
  posted_at?: string;
  created_at?: string;
  is_active?: boolean;
  description?: string;
  requirements?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  status: string;
  is_bookmarked: boolean;
}

const formatJobType = (jobType: string) =>
  jobType
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

const formatSalary = (min?: number | null, max?: number | null) => {
  if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  if (min) return `From $${min.toLocaleString()}`;
  if (max) return `Up to $${max.toLocaleString()}`;
  return "Not specified";
};

const formatDate = (date?: string) => {
  if (!date) return "Recently";

  return new Date(date).toLocaleDateString();
};

export const mapJob = (job: ApiJob): Job => ({
  id: job.id,
  title: job.title,
  company: job.company,
  location: job.location,
  type: formatJobType(job.job_type),
  salary: formatSalary(job.salary_min, job.salary_max),
  posted: formatDate(job.posted_at ?? job.created_at),
  status: job.is_active === false ? "Closed" : "Open",
  is_bookmarked: false,
});

export const GetJobs = async () => {
  const baseUrl = "http://localhost:3005/api/v1";

  try {
    const res = await fetch(`${baseUrl}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: data.message ?? "Something went wrong. Try again later",
        jobs: [],
      };
    }

    return {
      ok: true,
      message: data.message ?? "Jobs retrieved successfully",
      jobs: Array.isArray(data.jobs) ? data.jobs.map(mapJob) : [],
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "An error occurred. Try again later", jobs: [] };
  }
};
