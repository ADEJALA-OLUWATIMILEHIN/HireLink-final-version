import { Link } from "react-router"
import ActionButton from "./component/ActionButton"
import { useEffect, useState } from "react"
import {
    getMyEmployerJobs,
    updateJobStatus,
    type Job,
} from "../../api/EmployerApi/employerJobsApi"

const EmployerJobsPage = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")

    useEffect(() => {
        const loadJobs = async () => {
            const result = await getMyEmployerJobs()
            setJobs(result.jobs)
            setMessage(result.ok ? "" : result.message)
            setIsLoading(false)
        }

        loadJobs()
    }, [])

    const handleStatusChange = async (job: Job) => {
        const shouldOpen = job.status !== "Open"
        const result = await updateJobStatus(job.id, shouldOpen)

        if (result.ok && result.job) {
            setJobs((currentJobs) =>
                currentJobs.map((currentJob) =>
                    currentJob.id === job.id ? result.job! : currentJob
                )
            )
        }

        setMessage(result.message)
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <section className="mt-5 mb-8 flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                <span>
                    <h1 className="text-2xl font-medium text-gray-800 mb-2">Manage Jobs</h1>
                    <p className="text-gray-600">View and manage your job posting </p>
                </span>
                <span className="place-self-end">
                    <Link to="/employer/new-job"> 
                        <ActionButton label="Post New Job" className="bg-[#4F46E5] text-white font-semibold hover:opacity-90 hover:transition-all hover:duration-200 " />
                    </Link>
                </span>
            </section>

            <section className="flex flex-col space-y-4">
                {isLoading && <p className="text-gray-600">Loading jobs...</p>}
                {!isLoading && message && <p className="text-red-600">{message}</p>}
                {!isLoading && jobs.length === 0 && !message && (
                    <p className="text-gray-600">You have not posted any jobs yet.</p>
                )}

                {jobs.map((eachData) => (
                    <section className="flex flex-col bg-white rounded-lg border border-gray-200 p-6 md:flex-row md:justify-between md:items-start" key={eachData.id}>
                        <div className="flex flex-col space-y-4">
                            <span className="flex space-x-2 items-center">
                                <h1 className="font-semibold text-[16px] md:text-[18px]">{eachData.title}</h1>
                                <p className={`${eachData.status === "Open" ? "bg-[#4F46E5] text-white" : "bg-[#F1F5F9] text-black"} font-semibold text-xs px-1 py-0.5 rounded-md w-fit`}>{eachData.status}</p>
                            </span>

                            <span className="flex items-center space-x-3 text-xs md:text-[16px]">
                                <p>{eachData.location}</p>
                                <span className="flex space-x-1 items-center">
                                    <p className="w-[5px] h-[5px] bg-black/50 rounded-full"></p>
                                    <p>{eachData.type}</p>
                                </span>
                            </span>

                            <span className="text-xs flex items-center space-x-6 md:text-[16px]">
                                <h3 className="text-black/70 ">Posted {eachData.posted}</h3>
                                <p className="font-semibold">{eachData.salary}</p>
                            </span>
                        </div>

                        <div className="flex flex-row items-center space-x-2 mt-8">
                            <Link to={`/jobs/${eachData.id}`}>
                                <ActionButton label="View" className="border border-gray-200 font-semibold" />
                            </Link>
                            <ActionButton
                                type="button"
                                onClick={() => handleStatusChange(eachData)}
                                label={eachData.status === "Open" ? "Close" : "Reopen"}
                                className={`${eachData.status !== "Open" ? "bg-[#4F46E5] text-white" : "bg-[#F1F5F9] text-black"} font-semibold hover:opacity-80`}
                            />
                        </div>
                    </section>
                ))}
            </section>
        </main>
    )
}

export default EmployerJobsPage
