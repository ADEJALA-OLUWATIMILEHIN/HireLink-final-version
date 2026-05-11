// src/components/Layout/Footer.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-50/25 border-t border-gray-200 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link
                to="/"
                className="flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-gray-700">
                  HireLink
                </span>
              </Link>
            </div>
            <p className="text-gray-600 text-sm">
              A modern job board connecting employers with job seekers. Find
              your next opportunity or hire top talent.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              For Job Seekers
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/jobs" className="hover:text-gray-900">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-900">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/employer/new-job" className="hover:text-gray-900">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-900">
                  Employer Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
          © {currentYear} HireLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
