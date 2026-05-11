import { useEffect, useState } from "react";
import { JobCard } from "../BrowseJobs/components/JobCard"

import { Header } from "../Components/Header"
import { Footer } from "../Components/Footer"
import { getBookmarks } from "../api/BookmarkApi/BookmarkApi"
import type { Job } from "../api/EmployerApi/GetJobs"


const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const loadBookmarks = async () => {
      const result = await getBookmarks()
      setBookmarkedJobs(result.jobs.map((job) => ({ ...job, is_bookmarked: true })))
      setMessage(result.ok ? "" : result.message)
      setIsLoading(false)
    }

    loadBookmarks()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Saved Jobs
          </h1>
          <p className="text-slate-500 text-lg">Jobs you've bookmarked for later</p>
        </div>

        <div className="space-y-4">
          {isLoading && <p className="text-slate-500 text-lg">Loading saved jobs...</p>}
          {!isLoading && message && <p className="text-red-600 text-lg">{message}</p>}
          {!isLoading && bookmarkedJobs.length === 0 && !message && (
            <p className="text-slate-500 text-lg">You have not bookmarked any jobs yet.</p>
          )}
          {/* 2. Use the component inside the map */}
          {bookmarkedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
    )
}

export default Bookmarks
