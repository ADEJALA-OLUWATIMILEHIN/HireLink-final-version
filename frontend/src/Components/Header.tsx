import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, User, LogOut, Menu, X } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userEmail?: string;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "Job Seeker",
  userEmail = "",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-gray-700">HireLink</span>
          </Link>

          {/* RIGHT SIDE (DESKTOP) */}
          <div className="hidden md:flex items-center gap-6 sm:gap-8">
            <nav className="flex items-center gap-6">
              <Link
                to="/jobs"
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-teal-500 hover:text-white transition text-sm font-medium whitespace-nowrap"
              >
                Browse Jobs
              </Link>
              <Link
                to="/jobseeker"
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-teal-500 hover:text-white transition text-sm font-medium whitespace-nowrap"
              >
                Dashboard
              </Link>
              <Link
                to="/jobseeker/applications"
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-teal-500 hover:text-white transition text-sm font-medium whitespace-nowrap"
              >
                Applications
              </Link>
              <Link
                to="/jobseeker/bookmarks"
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-teal-500 hover:text-white transition text-sm font-medium whitespace-nowrap"
              >
                Bookmarks
              </Link>
            </nav>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300" />

            {/* User Profile Section */}
            <div className="flex items-center gap-2 shrink-0">
              <User className="w-4 h-4 text-gray-500" />
              <button className="text-gray-600 hover:text-gray-900">
                <span className="text-sm text-gray-800 font-medium ml-2">
                  {userName}
                </span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
                className="p-1 rounded-md text-gray-800 hover:bg-teal-500 hover:text-white transition ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE (MOBILE): Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute w-full z-10 shadow-lg">
          <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6">
            <Link
              to="/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              Browse Jobs
            </Link>
            <Link
              to="/jobseeker"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50"
            >
              Dashboard
            </Link>
            <Link
              to="/jobseeker/applications"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              Applications
            </Link>
            <Link
              to="/jobseeker/bookmarks"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              Bookmarks
            </Link>
          </div>
          {/* Mobile User Profile */}
          <div className="pt-4 pb-4 border-t border-gray-200 px-4 sm:px-6 bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {userName}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {userEmail}
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
                className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
