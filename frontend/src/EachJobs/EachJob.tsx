import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ApplyModal from "../Components/ApplyModal";
import {
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  ChevronLeft,
  Share2,
  Bookmark,
} from "lucide-react";

import { Header } from "../Components/Header.tsx";
import { Footer } from "../Components/Footer.tsx";

interface ApiJob {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_min?: number | null;
  salary_max?: number | null;
  posted_at?: string;
  created_at?: string;
  is_active?: boolean;
  description: string;
  requirements: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  status: string;
  description: string;
  requirements: string;
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

const mapJob = (job: ApiJob): Job => ({
  id: job.id,
  title: job.title,
  company: job.company,
  location: job.location,
  type: formatJobType(job.job_type),
  salary: formatSalary(job.salary_min, job.salary_max),
  posted: formatDate(job.posted_at ?? job.created_at),
  status: job.is_active === false ? "Closed" : "Open",
  description: job.description,
  requirements: job.requirements,
});

const EachJob = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/v1/jobs/${id}`);
        const data = await res.json();

        setJob(res.ok && data.job ? mapJob(data.job) : null);
      } catch (error) {
        console.log(error);
        setJob(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <div className="grow flex items-center justify-center">
          <p className="text-slate-500 text-lg">Loading job...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <div className="grow flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-slate-800">Job not found</h2>
            <Link to="/" className="text-blue-600 hover:underline mt-4 block">
              Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow pb-20">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Link
            to="/jobs"
            className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Jobs
          </Link>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-slate-500 font-medium">
                {job.company}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 pb-8 border-b border-slate-100">
              <div className="flex items-center text-slate-500">
                <MapPin className="w-5 h-5 mr-3 text-slate-400" />
                {job.location}
              </div>

              <div className="flex items-center text-slate-500">
                <Briefcase className="w-5 h-5 mr-3 text-slate-400" />
                {job.type}
              </div>

              <div className="flex items-center text-slate-500">
                <DollarSign className="w-5 h-5 mr-3 text-slate-400" />
                {job.salary}
              </div>

              <div className="flex items-center text-slate-500">
                <Calendar className="w-5 h-5 mr-3 text-slate-400" />
                Posted {job.posted}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
              >
                Apply Now
              </button>

              <div className="flex gap-3">
                <button
                  className="p-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
                  title="Save Job"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  className="p-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
                  title="Share Job"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-10">
              <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium text-sm border border-slate-200">
                {job.type}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 font-medium text-sm border border-emerald-100">
                {job.status}
              </span>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Job Description
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {job.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Requirements
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {job.requirements}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ApplyModal
        jobId={job.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={job.title}
        companyName={job.company}
      />
    </div>
  );
};

export default EachJob;
