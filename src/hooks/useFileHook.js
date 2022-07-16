import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useFile = () => {
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(false)

    const fetchResume = async (resumeKey) => {
        try {
            setIsLoading(true)
            const resumeFile = await axiosPrivate.get(`api/profile/user/file/resume/${resumeKey}`)
            return resumeFile.data.payload
    } catch (err) {
        setIsLoading(false)
        console.error(err)
    } finally {
        setIsLoading(false)
    }
}

const fetchAvatar = async (avatarKey) => {
    try {
        setIsLoading(true)
        const avatarFile = await axiosPrivate.get(`api/profile/user/file/avatar/${avatarKey}`)
        return avatarFile.data.payload
    } catch (err) {
        setIsLoading(false)
        console.error(err)
    } finally {
        setIsLoading(false)
    }
}

const deleteResume = async (resumeKey) => {
    try {
        await axiosPrivate.delete(`api/profile/user/file/resume/${resumeKey}`)
    } catch (err) {
        console.error(err)
    }
}

const deleteAvatar = async (avatarKey) => {
    try {
        await axiosPrivate.delete(`api/profile/user/file/avatar/${avatarKey}`)
    } catch (err) {
        console.error(err)
    }
}

return { fetchResume, fetchAvatar, deleteAvatar, deleteResume }
}

export default useFile