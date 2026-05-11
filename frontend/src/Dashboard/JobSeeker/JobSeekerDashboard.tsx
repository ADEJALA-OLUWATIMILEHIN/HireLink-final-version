import React, { useEffect, useState } from "react";
import { FileText, TrendingUp, Bookmark, Briefcase } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { ApplicationStatusBreakdown } from "./components/ApplicationStatusBreakdown";
import { RecentApplications } from "./components/RecentApplications";
import type { DashboardStats, StatusBreakdown, Application } from "../types";
import { useJobseekerProfile } from "../../api/JobseekerApi/profileApi";
import { getRecentApplications } from "../../api/JobseekerApi/recentApplicationsApi";

const JobSeekerDashboard: React.FC = () => {
  const [stats] = useState<DashboardStats>({
    totalApplications: 3,
    shortlisted: 1,
    bookmarkedJobs: 2,
    profileCompletion: 100,
  });

  const [statusData] = useState<StatusBreakdown>({
    applied: 2,
    shortlisted: 1,
    rejected: 0,
    hired: 0,
  });

  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [isRecentApplicationsLoading, setIsRecentApplicationsLoading] = useState(true);
  const [recentApplicationsMessage, setRecentApplicationsMessage] = useState("");

  const {data} = useJobseekerProfile();

  useEffect(() => {
    const loadRecentApplications = async () => {
      const result = await getRecentApplications();
      setRecentApplications(result.applications);
      setRecentApplicationsMessage(result.ok ? "" : result.message);
      setIsRecentApplicationsLoading(false);
    };

    loadRecentApplications();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">
          Welcome back, {data?.name}!
        </h1>
        <p className="text-gray-600">Here's your job search overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={<FileText className="w-5 h-5" />}
        />
        <StatCard
          title="Shortlisted"
          value={stats.shortlisted}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          title="Bookmarked Jobs"
          value={stats.bookmarkedJobs}
          icon={<Bookmark className="w-5 h-5" />}
        />
        <StatCard
          title="Profile Completion"
          value={`${stats.profileCompletion}%`}
          icon={<Briefcase className="w-5 h-5" />}
        />
      </div>

      {/* Status Breakdown */}
      <div className="mb-8">
        <ApplicationStatusBreakdown statusData={statusData} />
      </div>

      {/* Recent Applications */}
      <div className="mb-6">
        <RecentApplications
          applications={recentApplications}
          isLoading={isRecentApplicationsLoading}
          message={recentApplicationsMessage}
        />
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
