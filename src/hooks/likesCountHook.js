import { useState } from 'react';
import { toaster } from "evergreen-ui";
import useAxiosPrivate from './useAxiosPrivate'
import CONSTANTS from "../config";

export const useFetchLikes = () => {
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(false)
    const [isLikedByUser, setIsLikedByUser] = useState(false)
    const [accumualatedLikes, setAccumulatedLikes] = useState(false)

    const fetchLikes = async (projectId, user, like) => {
            setIsLoading(true)
            return await axiosPrivate.post(`${CONSTANTS.API_URL}api/projects/like/${projectId}/?like=${like}`, { user: user })
                .then(res => {
                    if (res.data?.success) {
                        setAccumulatedLikes(res.data?.payload.likesCount)
                        setIsLikedByUser(res.data?.payload.isLiked)
                        return
                    } 
                })
                .catch(err => {
                    toaster.danger(err?.response.status === 404 | 405 && "Like/unlike project action failed or not allowed")
                    return err
                }).finally(res => setIsLoading(false))
        }
    return { isLoading, isLikedByUser, accumualatedLikes, fetchLikes, setIsLikedByUser }
}



