import { useState } from "react";
import { toaster } from "evergreen-ui";
import CONSTANTS from "../config";
import useAxiosPrivate from "./useAxiosPrivate";

export const useFetchProjectApplication = () => {
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(false)
    const [userHasApplied, setUserHasApplied] = useState('')
    const [accumulatedApplications, setAccumulatedApplications] = useState(false)

    const fetchApplication = async (projectId, user, applied) => {
        setIsLoading(true)
        return await axiosPrivate.post(`${CONSTANTS.API_URL}api/projects/apply/${projectId}/?apply=${applied}`, { user: user })
            .then(res => {
                if (res.data?.success) {
                    setAccumulatedApplications(res.data?.payload.applicationsCount)
                    setUserHasApplied(res.data?.payload.isApplied)
                    res.data?.payload.isApplied
                        ? toaster.success(`You've successfully applied to ${res.data.payload.projectTitle} project`, { duration: 1.5 })
                        : toaster.notify(`You've removed your application from ${res.data.payload.projectTitle} project`, { duration: 1.5 })
                    return
                }
            })
            .catch(err => {
                toaster.danger(err?.response.status === 404 | 405 && "Apply/discard project action failed or not allowed")
                return err
            }).finally(res => setIsLoading(false))
    }
    return { fetchApplication, isLoading, userHasApplied, accumulatedApplications, setUserHasApplied }

}