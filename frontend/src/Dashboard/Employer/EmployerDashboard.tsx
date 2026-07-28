import { useEffect, useState } from "react"
import { type EmployerDashboardStats } from "../types"
import { StatCard } from "../JobSeeker/components/StatCard"
import { Briefcase, FileSliders, TrendingUp, Users } from "lucide-react"
import ActionButton from "./component/ActionButton"
import RecentlyPostedJobs from "./component/RecentlyPostedJobs"
import { Link } from "react-router-dom";
import { useEmployerProfile } from "../../api/EmployerApi/profileApi"
import { getEmployerDashboardStats } from "../../api/EmployerApi/dashboardApi"





const EmployerDashboard = () => {
    const [stats, setStats] = useState<EmployerDashboardStats>({
        activeJobs: 0,
        totalApplicants: 0,
        totalJobPosted: 0,
        shortlisted: 0
    })

    const {data} = useEmployerProfile();

    useEffect(() => {
        const loadStats = async () => {
            const result = await getEmployerDashboardStats();
            setStats(result.stats);
        };

        loadStats();
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <section className="mt-5 mb-8">
                <h1 className="text-2xl font-medium text-gray-800 mb-2">Welcome back, {data?.name}!</h1>
                <p className="text-gray-600">{data?.company_name} Dashboard </p>
            </section>

            {/* Stats Card */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Active Jobs"
                    value={stats.activeJobs}
                    icon={<Briefcase className="w-5 h-5" />}
                />
                <StatCard
                    title="Total Applicants"
                    value={stats.totalApplicants}
                    icon={<Users className="w-5 h-5" />}
                />
                <StatCard
                    title="Total Jobs Posted"
                    value={stats.totalJobPosted}
                    icon={<FileSliders className="w-5 h-5" />}
                />
                <StatCard
                    title="Shrotlisted"
                    value={stats.shortlisted}
                    icon={<TrendingUp className="w-5 h-5 text-green-500" />}
                />
            </section>

            {/* Quick actions */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
                <h1 className="font-semibold text-black/80">Quick Actions</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 md:w-fit mt-8 ">
                    <Link
                        to="/employer/new-job"
                        >
                        <ActionButton className="bg-[#4F46E5] text-white rounded-lg hover:bg-teal-500 hover:text-white transition text-sm whitespace-nowrap" label="Post New Job"/>
                    </Link>
                    <Link
                        to="/employer/new-job"
                        >
                        <ActionButton className="rounded-lg hover:bg-teal-500 hover:text-white transition text-sm whitespace-nowrap border border-gray-200" 
                        label="Manage Jobs"/>
                    </Link>
                    <Link
                        to="/employer/edit-profile"
                        >
                        <ActionButton className="rounded-lg hover:bg-teal-500 hover:text-white transition text-sm whitespace-nowrap border border-gray-200" label="Edit Profile" />
                    </Link>
                </div>
            </section>

            {/* Recently posted jobs */}
            <section className="mt-6">
                <RecentlyPostedJobs/>
            </section>
        </main>
    )
}

export default EmployerDashboard
