import { useState } from 'react';
import axios from 'axios';

export const useFetchLikes = (projectId, userId, like) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isLikedByUser, setIsLikedByUser] = useState(false)
    const [accumualatedLikes, setAccumulatedLikes] = useState(false)
    const [error, setError] = useState(false)

    const fetchLikes = async (projectId, userId, like) => {
            setIsLoading(true)
            axios.post(`http://localhost:8080/api/projects/like/${projectId}/?like=${like}`, { userId: userId })
                .then(res => {
                    if (res.data?.success) {
                        setAccumulatedLikes(res.data?.payload.likesCount)
                        setIsLikedByUser(res.data?.payload.isLiked)
                        return
                    } 
                })
                .catch(err => {
                    setError(err)
                    // toaster.danger(err?.response.status === 404 && "Like/unlike project action failed")
                    return
                }).finally(res => setIsLoading(false))
        }
        // console.log(isLikedByUser)
    return { isLoading, isLikedByUser, accumualatedLikes, error, fetchLikes }
}



