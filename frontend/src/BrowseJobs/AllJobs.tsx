import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { JobCard } from "./components/JobCard"; // 1. Import the component
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { GetJobs, type Job } from "../api/EmployerApi/GetJobs";

const AllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [typeFilter, setTypeFilter] = useState("All Types");

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const data = await GetJobs();

      setJobs(data.jobs);
      setError(data.ok ? "" : data.message);
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "All Locations" || job.location.includes(locationFilter);
    const matchesType = typeFilter === "All Types" || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  const uniqueLocations = ["All Locations", ...new Set(jobs.map((job) => job.location))];
  const uniqueTypes = ["All Types", ...new Set(jobs.map((job) => job.type))];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Jobs</h1>
          <p className="text-slate-500 text-lg">Find your next opportunity</p>
        </div>

        {/* Filter Section (Search inputs etc) - Keep exactly as is */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative md:w-48">
              <select
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative md:w-48">
              <select
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="text-slate-500 mb-6 font-medium">
          {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
        </p>

        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-slate-500 text-lg">Loading jobs...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="text-center py-20 bg-red-50 rounded-xl border border-dashed border-red-200">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          )}

          {/* 2. Use the component inside the map */}
          {!isLoading && !error && filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {/* Empty state */}
          {!isLoading && !error && filteredJobs.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-slate-500 text-lg">
                No jobs found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("All Locations");
                  setTypeFilter("All Types");
                }}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllJobs;
