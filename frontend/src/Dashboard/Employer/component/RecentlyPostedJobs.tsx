import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyEmployerJobs,
  type Job,
} from "../../../api/EmployerApi/employerJobsApi";
import ActionButton from "./ActionButton";

const RecentlyPostedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      const result = await getMyEmployerJobs();
      setJobs(result.jobs.slice(0, 3));
      setIsLoading(false);
    };

    loadJobs();
  }, []);

  return (
    <main className="bg-white rounded-lg border border-gray-200 px-6 py-5">
      {/* Header */}
      <section className="flex flex-row justify-between items-center">
        <h1 className="font-semibold text-black/80 text-[14px] md:text-[16px]">
          Recently Posted Jobs
        </h1>

        <Link to="/employer/manage-jobs">
          <ActionButton
            label="View All"
            className="border border-gray-200 font-semibold text-[14px]"
          />
        </Link>
      </section>

      {/* Job list */}
      <section className="mt-8 flex flex-col space-y-4 w-full">
        {isLoading && <p className="text-gray-600">Loading jobs...</p>}
        {!isLoading && jobs.length === 0 && (
          <p className="text-gray-600">No jobs posted yet.</p>
        )}
        {jobs.map(
          (eachData, idx) => (
            <div
              key={eachData.id}
              className={`flex flex-row items-start md:items-center justify-between w-full ${
                idx === 2 && "border-none"
              } border-b border-gray-200 pb-5`}
            >
              {/* Job info */}
              <div className="flex flex-col space-y-1">
                <h1 className="font-semibold text-[16px] md:text-[18px]">
                  {eachData.title}
                </h1>

                <span className="flex items-center space-x-3 text-xs md:text-[16px]">
                  <p>{eachData.location}</p>

                  <span className="flex space-x-1 items-center">
                    <span className="w-[5px] h-[5px] bg-black/50 rounded-full" />
                    <p>{eachData.type}</p>
                  </span>
                </span>

                <h3 className="text-xs text-black/70 md:text-[16px]">
                  Posted {eachData.posted}
                </h3>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 md:items-center">
                <span className="w-full text-end">
                  <h1 className="text-xs font-semibold md:text-[16px]">
                    {eachData.salary}
                  </h1>

                  <p className="text-xs text-black/70 md:text-[14px]">
                    {eachData.status}
                  </p>
                </span>

                <Link to={`/jobs/${eachData.id}`}>
                  <ActionButton
                    label="View"
                    className="font-semibold border border-gray-200"
                  />
                </Link>
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
};

export default RecentlyPostedJobs;




// import type { EmployerJobsPosted } from "../../types"
// import { employerJobsPostedMock } from "../mockDatas"
// import ActionButton from "./ActionButton"

// {/* <Link
//     to="/applications"
//     className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-teal-500 hover:text-white transition-colors"
// >
//     View All
// </Link> */}

// const RecentlyPostedJobs = () => {


//     return (
//         <main className="bg-white rounded-lg border border-gray-200 px-6 py-5">
//             <section className="flex flex-row justify-between items-center">
//                 <h1 className="font-semibold text-black/80 text-[14px] md:text-[16px]">Recently Posted Jobs</h1>
//                 <ActionButton label="View All" className="border border-gray-200 font-semibold text-[14px]" />
//             </section>

//             <section className="mt-8 flex flex-col space-y-4 w-full">
//                 {employerJobsPostedMock.slice(0, 3).map((eachData: EmployerJobsPosted, idx) => (
//                     <div className={`flex flex-row items-start md:items-center justify-between w-full ${idx === 2 && "border-none"} border-b border-gray-200 pb-5`} key={idx}>

//                         <div className="flex flex-col space-y-1">
//                             <h1 className="font-semibold text-[16px] md:text-[18px]">{eachData.position}</h1>
//                             <span className="flex items-center space-x-3 text-xs md:text-[16px]">
//                                 <p>{eachData.location}</p>
//                                 <span className="flex space-x-1 items-center">
//                                     <p className="w-[5px] h-[5px] bg-black/50 rounded-full"></p>
//                                     <p>{eachData.employmentType}</p>
//                                 </span>
//                             </span>
//                             <h3 className="text-xs text-black/70 md:text-[16px]">Posted {eachData.postedDate}</h3>
//                         </div>

//                         <div className="flex flex-col space-y-3  md:flex-row md:space-y-0 md:space-x-3 md:items-center">
//                             <span className="w-full justify-end items-end text-end">
//                                 <h1 className="text-xs font-semibold md:text-[16px]">
//                                     {eachData.noOfApplicants}{" "}
//                                     {eachData.noOfApplicants === 1 ? "applicant" : "applicants"}
//                                 </h1>
//                                 <p className="text-xs text-black/70 md:text-[14px]">{eachData.isOpen ? "Open" : "Closed"}</p>
//                             </span>

//                             <ActionButton label="View" className="font-semibold border border-gray-200" />
//                         </div>
//                     </div>
//                 ))}
//             </section>
//         </main>
//     )
// }

// export default RecentlyPostedJobs
