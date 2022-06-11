import axios from 'axios'
import CONSTANTS from '../config'

const useRefreshToken = () => {
    // const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get(`${CONSTANTS.API_URL}api/token/refresh`, {
            withCredentials: true
        })
        // setAuth( prevState => {
        //     return {
        // ...prevState, 
        // roles: response.data.roles, 
        // accessToken: response.data.accessToken}
        // })
        return response.data.accessToken
    }

    return refresh
}

export default useRefreshToken;