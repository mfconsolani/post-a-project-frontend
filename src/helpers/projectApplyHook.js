import { useState } from "react";
import { toaster } from "evergreen-ui";
import axios from "axios";

export const useFetchProjectApplication = (projectId, userId, applied) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userHasApplied, setUserHasApplied] = useState(false)
    const [accumulatedApplications, setAccumulatedApplications] = useState(false)

    const fetchApplication = async (projectId, userId, applied) => {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}api/projects/apply/${projectId}/?apply=${applied}`, { userId: userId })
            .then(res => {
                if (res.data?.success) {
                    setAccumulatedApplications(res.data?.payload.applicationsCount)
                    setUserHasApplied(res.data?.payload.isApplied)
                    console.log(res.data)
                    res.data?.payload.isApplied
                        ? toaster.success(`You've successfully applied to ${res.data.payload.projectTitle} project`, { duration: 1.5 })
                        : toaster.notify(`You've removed your application from ${res.data.payload.projectTitle} project`, { duration: 1.5 })
                    return
                }
            })
            .catch(err => {
                toaster.danger(err?.response.status === 404 && "Apply/discard project action failed")
                return
            }).finally(res => setIsLoading(false))
    }
    return { fetchApplication, isLoading, userHasApplied, accumulatedApplications }

}