// Component header for login and sign up page.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, User, Menu, X } from "lucide-react";



export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-teal-500 hover:text-white transition text-sm font-medium whitespace-nowrap"
              >
                Browse Jobs
              </Link>
    <Link
                to="/login"
                className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-teal-500 hover:text-white transition text-sm font-medium whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 text-gray-600 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition text-sm font-medium whitespace-nowrap"
              >
                Get Started
              </Link>
            </nav>

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
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              Get Started
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
