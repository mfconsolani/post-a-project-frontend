import { useState } from "react";
import CONSTANTS from "../config";
import useAxiosPrivate
 from "./useAxiosPrivate";
const usePostFile = () => {
    const axiosPrivate = useAxiosPrivate()

    const [isLoading, setIsLoading] = useState(false)

    const uploadFile = async ({file, userEmail, fileType}) => {
        try {
            setIsLoading(true)
            const formData = new FormData();
            formData.append("file", file)
            formData.append("email", userEmail)
            const result = await axiosPrivate.post(`${CONSTANTS.API_URL}api/profile/user/file/${fileType}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
            setIsLoading(false)
            return result.data
        } catch (err) {
            setIsLoading(false)
            console.error(err)
        } finally {
            setIsLoading(false)
        }
        return
    }
    return {uploadFile, isLoading}
}

export default usePostFile