import React from 'react';
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Bookmark} from "lucide-react";
import { addBookmark, removeBookmark } from "../../api/BookmarkApi/BookmarkApi";

// Define the shape of the job object
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  status: string;
  is_bookmarked: boolean;
}

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = React.useState(job.is_bookmarked);

  const handleBookmarkClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    const result = isBookmarked
      ? await removeBookmark(job.id)
      : await addBookmark(job.id);

    if (result.ok || result.message === "Job already bookmarked") {
      setIsBookmarked(!isBookmarked);
    }
  };

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
            {job.title}
          </h3>

          <p className="text-slate-500 font-medium mb-4">{job.company}</p>

          <div className="flex flex-wrap gap-4 text-slate-500 text-sm mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {job.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-400" />
              {job.type}
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-slate-400" />
              {job.salary}
            </div>
          </div>

          <div className="flex gap-2 mt-2 md:mt-0">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold border border-slate-200">
              {job.type === "Remote" ? "Remote" : "Full-time"}
            </span>
            <span className="px-3 py-1 text-white bg-emerald-500 rounded-lg text-xs font-semibold border border-emerald-100">
              {job.status}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBookmarkClick}
          className="flex gap-2 px-2 py-2 mt-2 md:mt-0 hover:bg-teal-500 hover:text-white transition hover:rounded-sm"
          title={isBookmarked ? "Remove bookmark" : "Bookmark job"}
        >
          {isBookmarked ? <Bookmark className="w-4 h-4 text-indigo-500 fill-indigo-500" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
