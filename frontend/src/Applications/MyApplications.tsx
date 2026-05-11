// src/Applications/MyApplications.tsx

import React, { useEffect, useState } from 'react';
import { ApplicationCard } from './components/ApplicationCard';
import { Header } from '../Components/Header';
import { Footer} from '../Components/Footer';
import type { Application } from '../Dashboard/types';
import { getMyApplications } from '../api/JobseekerApi/applicationsApi';
import { useJobseekerProfile } from '../api/JobseekerApi/profileApi';

const MyApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { data } = useJobseekerProfile();

  useEffect(() => {
    const loadApplications = async () => {
      const result = await getMyApplications();
      setApplications(result.applications);
      setMessage(result.ok ? "" : result.message);
      setIsLoading(false);
    };

    loadApplications();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <Header userName={data?.name} userEmail={data?.email} />

      {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-2xl font-medium text-gray-900 mb-1">My Applications</h1>
                <p className="text-gray-500 text-sm">Track your job applications and their status</p>
            </div>

            {/* Applications Grid - Uses gap-4 for spacing between cards */}
            <div className="flex flex-col gap-4">
                {isLoading && <p className="text-gray-500">Loading applications...</p>}
                {!isLoading && message && <p className="text-red-600">{message}</p>}
                {!isLoading && applications.length === 0 && !message && (
                  <p className="text-gray-500">You have not applied for any jobs yet.</p>
                )}
                {applications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                ))}
            </div>
        </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default MyApplications;
