import { useState, useContext, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import DataContext from "../context/DataContext"

const useFile = () => {
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState()
    const [resume, setResume] = useState()
    const { profileInfo, setProfileInfo } = useContext(DataContext)

    const fetchResume = async (resumeKey) => {
        try {
            setIsLoading(true)
            const resumeFile = await axiosPrivate.get(`api/profile/user/file/resume/${resumeKey}`)
            setResume(resumeFile.data.payload)
    } catch (err) {
        setIsLoading(false)
        console.error(err)
    } finally {
        setIsLoading(false)
    }
}

// useEffect(()=> {
//     console.log(profileInfo)
// }, [profileInfo])

const fetchAvatar = async (avatarKey) => {
    try {
        setIsLoading(true)
        const avatarFile = await axiosPrivate.get(`api/profile/user/file/avatar/${avatarKey}`)
        // console.log(avatarFile.data.payload)
        setAvatar(avatarFile.data.payload)
        // setProfileInfo(prevState => {
        //     return {...prevState, avatar: avatarFile.data.payload}
        // } )
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

return { fetchResume, fetchAvatar, resume, avatar, deleteAvatar, deleteResume }
}

export default useFile