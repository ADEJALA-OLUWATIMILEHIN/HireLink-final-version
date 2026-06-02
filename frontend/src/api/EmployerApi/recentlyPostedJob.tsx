import { useState,useEffect } from "react"


interface EmployerProfile {
    name: string
    email: string
    company_name: string
}

export const getRecentlyPostedJobs = (_id: number) => {
    const baseUrl = "http://localhost:3005"
    const token = localStorage.getItem("jwt")

    const [data, setData] = useState<EmployerProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/v1/dashboard/employerinfo`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (!res.ok) {
                    throw new Error("Failed to fetch employer profile")
                }

                const result = await res.json()

                // ✅ ONLY KEEP WHAT YOU NEED
                setData({
                    name: result.name,     // or result.username if backend uses that
                    email: result.email,
                    company_name : result.company_name
                })

            } catch (err: any) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [])

    return { data, isLoading, error }
}
