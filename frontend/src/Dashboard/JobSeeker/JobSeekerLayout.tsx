import { Outlet, Link, useLocation } from "react-router-dom";
import {
  User,
  Briefcase,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { useJobseekerProfile } from "../../api/JobseekerApi/profileApi";

const JobSeekerLayout = () => {
  const location = useLocation();
  const { data } = useJobseekerProfile();
  const userName = data?.name ?? "";
  const userEmail = data?.email ?? "";
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "JS";

  const isActive = (path: string) => {
    if (path === "/jobseeker" && location.pathname === "/jobseeker")
      return true;
    return location.pathname.startsWith(path) && path !== "/jobseeker";
  };

  const navItems = [
    { name: "Overview", path: "/jobseeker", icon: LayoutDashboard },
    { name: "My Profile", path: "/jobseeker/profile", icon: User },
    {
      name: "My Applications",
      path: "/jobseeker/applications",
      icon: Briefcase,
    },
    { name: "Settings", path: "/jobseeker/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header userName={userName} userEmail={userEmail} />

      <main className="grow max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl mb-3">
                  {initials}
                </div>
                <h3 className="font-bold text-slate-900">
                  {userName || "Job Seeker"}
                </h3>
                <p className="text-sm text-slate-500">Job Seeker</p>
              </div>

              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors mt-4">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobSeekerLayout;
