import axios from 'axios'
import CONSTANTS from '../config'
import useAuth from './useAuth'


const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        try {
            const response = await axios.get(`${CONSTANTS.API_URL}api/token/refresh`, 
            {
                withCredentials: true,
                
            })
            console.log(response)
            setAuth(prevState => {
                console.log({ ...prevState, accessToken: response.data.accessToken })
                return {
                    ...prevState,
                    // roles: response.data.roles, 
                    accessToken: response.data.accessToken
                }
            })
            return response.data.accessToken
        } catch (err) {
            console.log(err)
        }
    }

    return refresh
}

export default useRefreshToken;