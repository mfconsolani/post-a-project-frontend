import { useState } from "react";
import axios from "../api/axios";
import CONSTANTS from "../config";

const usePostFile = async ({ file }) => {
    const [isLoading, setIsLoading] = useState(false)
    const formData = new FormData();
    formData.append("image", file)
    const uploadFile = async () => {
        try {
            setIsLoading(true)
            const result = await axios.post(`${CONSTANTS.API_URL}images`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
            return result.data
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {uploadFile, isLoading}
}

export default usePostFile