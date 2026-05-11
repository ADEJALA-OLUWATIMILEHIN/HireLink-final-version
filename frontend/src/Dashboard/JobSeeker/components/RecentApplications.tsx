// src/Dashboard/JobSeeker/components/RecentApplications.tsx

import React from 'react';
import type { Application } from '../../types';
import { Link } from 'react-router-dom';

interface RecentApplicationsProps {
  applications: Application[];
  isLoading?: boolean;
  message?: string;
}

export const RecentApplications: React.FC<RecentApplicationsProps> = ({
  applications,
  isLoading = false,
  message = "",
}) => {
  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Applied':
        return 'bg-gray-100 text-gray-700';
      case 'Shortlisted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Hired':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
      <div className="bg-white rounded-lg border border-gray-200">
          {/* Header Section */}
          <div className="px-6 py-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Recent Applications</h2>
              <Link
                  to="/jobseeker/applications"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-teal-500 hover:text-white transition-colors"
              >
                  View All
              </Link>
          </div>


          {/* List Section */}
          <div className="flex flex-col">
              {isLoading && (
                  <p className="px-6 pb-6 text-sm text-gray-500">Loading recent applications...</p>
              )}

              {!isLoading && message && (
                  <p className="px-6 pb-6 text-sm text-red-600">{message}</p>
              )}

              {!isLoading && !message && applications.length === 0 && (
                  <p className="px-6 pb-6 text-sm text-gray-500">No recent applications yet.</p>
              )}

              {applications.map((app, index) => (
                  <div key={app.id}>
                      <div className="p-6">
                          <div className="flex items-start justify-between">
                              <div className="flex-1">
                                  <h3 className="text-md font-medium text-gray-900 mb-1 hover:text-indigo-900">
                                      {app.jobTitle}
                                  </h3>
                                  <p className="text-sm text-gray-500 mb-2 font-medium">{app.company}</p>
                                  <p className="text-xs text-gray-400">Applied {app.appliedDate}</p>
                              </div>

                              {/* Status Badge */}
                              <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(app.status)}`}>
                                  {app.status}
                              </span>
                          </div>
                      </div>

                      {/* Item Divider (Inset) - Only render if NOT the last item */}
                      {index !== applications.length - 1 && (
                          <div className="border-b border-gray-100 mx-6"></div>
                      )}
                  </div>
              ))}
          </div>
      </div>
  );
};
