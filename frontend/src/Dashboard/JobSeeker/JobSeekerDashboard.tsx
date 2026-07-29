import React, { useEffect, useState } from "react";
import { FileText, TrendingUp, Bookmark, Briefcase } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { ApplicationStatusBreakdown } from "./components/ApplicationStatusBreakdown";
import { RecentApplications } from "./components/RecentApplications";
import type { DashboardStats, StatusBreakdown, Application } from "../types";
import { useJobseekerProfile } from "../../api/JobseekerApi/profileApi";
import { getRecentApplications } from "../../api/JobseekerApi/recentApplicationsApi";
import { API_BASE_URL as baseUrl } from "../../api/config";

const initialStats: DashboardStats = {
  totalApplications: 0,
  shortlisted: 0,
  bookmarkedJobs: 0,
  profileCompletion: 0,
};

const initialStatusData: StatusBreakdown = {
  applied: 0,
  shortlisted: 0,
  rejected: 0,
  hired: 0,
};

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

const JobSeekerDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [statusStats, setStatusStats] =
    useState<StatusBreakdown>(initialStatusData);
  const [recentApplications, setRecentApplications] = useState<Application[]>(
    []
  );
  const [isRecentApplicationsLoading, setIsRecentApplicationsLoading] =
    useState(true);
  const [recentApplicationsMessage, setRecentApplicationsMessage] =
    useState("");

  const { data } = useJobseekerProfile();

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const response = await fetch(`${baseUrl}/dashboard/jobseeker`, {
          headers: authHeaders(),
        });
        const result = await response.json();

        setStats({
          totalApplications: result.stats?.totalApplications ?? 0,
          shortlisted: result.stats?.shortlisted ?? 0,
          bookmarkedJobs: result.stats?.totalBookmarks ?? 0,
          profileCompletion: result.stats?.profileCompletion ?? 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    loadDashboardStats();
  }, []);

  useEffect(() => {
    const loadStatusBreakdown = async () => {
      try {
        const response = await fetch(`${baseUrl}/dashboard/applicationstatus`, {
          headers: authHeaders(),
        });
        const result = await response.json();

        setStatusStats({
          applied: result.statusBreakdown?.applied ?? 0,
          shortlisted: result.statusBreakdown?.shortlisted ?? 0,
          rejected: result.statusBreakdown?.rejected ?? 0,
          hired: result.statusBreakdown?.hired ?? 0,
        });
      } catch (err) {
        console.error("Error fetching application status breakdown:", err);
      }
    };

    loadStatusBreakdown();
  }, []);

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
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">
          Welcome back, {data?.name ?? "Jobseeker"}!
        </h1>
        <p className="text-gray-600">Here's your job search overview</p>
      </div>

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

      <div className="mb-8">
        <ApplicationStatusBreakdown statusData={statusStats} />
      </div>

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
