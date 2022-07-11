import { useState } from "react";
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
            const result = await axiosPrivate.post(`api/profile/user/file/${fileType}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
            console.log(result.data)
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