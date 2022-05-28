import { useState } from 'react';
import { toaster } from "evergreen-ui";
import axios from 'axios';

export const useFetchLikes = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isLikedByUser, setIsLikedByUser] = useState(false)
    const [accumualatedLikes, setAccumulatedLikes] = useState(false)

    const fetchLikes = async (projectId, userId, like) => {
            setIsLoading(true)
            return await axios.post(`${process.env.REACT_APP_API_URL}api/projects/like/${projectId}/?like=${like}`, { userId: userId })
                .then(res => {
                    if (res.data?.success) {
                        setAccumulatedLikes(res.data?.payload.likesCount)
                        setIsLikedByUser(res.data?.payload.isLiked)
                        return
                    } 
                })
                .catch(err => {
                    toaster.danger(err?.response.status === 404 && "Like/unlike project action failed")
                    return err
                }).finally(res => setIsLoading(false))
        }
    return { isLoading, isLikedByUser, accumualatedLikes, fetchLikes, setIsLikedByUser }
}



