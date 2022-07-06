import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { Buffer } from 'buffer';


const usePostFile = () => {
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState()
    const [resume, setResume] = useState()

    const fetchResume = async (resumeKey) => {
        try {
            setIsLoading(true)
            const resumeFile = await axiosPrivate.get(`api/profile/user/file/resume/${resumeKey}`)
            setResume(resumeFile.data.payload)
        } catch (err){
            setIsLoading(false)
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchAvatar = async (avatarKey) => {
        try {
            setIsLoading(true)
            const avatarFile = await axiosPrivate.get(`api/profile/user/file/avatar/${avatarKey}`, { responseType: 'arraybuffer' })
            const base64ImageString = Buffer.from(avatarFile.data, 'binary').toString('base64')
            setAvatar("data:image/*;base64," + base64ImageString)
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
        } catch (err){
            console.error(err)
        } 
    }

    const deleteAvatar = async (avatarKey) => {
        try {
            await axiosPrivate.delete(`api/profile/user/file/avatar/${avatarKey}`)
        } catch (err){
            console.error(err)
        } 
    }

    return { fetchResume, fetchAvatar, resume, avatar, deleteAvatar, deleteResume }
}

export default usePostFile