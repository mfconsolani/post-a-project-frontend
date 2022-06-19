import axios from 'axios'
import { useContext } from 'react'
import CONSTANTS from '../config'
import DataContext from '../context/DataContext'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const { setAuth } = useAuth()
    const { setProfileInfo } = useContext(DataContext)

    const refresh = async () => {
        try {
            const response = await axios.get(`${CONSTANTS.API_URL}api/token/refresh`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            setAuth(prevState => {
                const { userEmail, userId, profile, accessToken } = response.data
                if (!prevState.status) {
                    return { status: true, userEmail, userId, profileType: profile, accessToken }
                } else if (prevState.status) {
                    return { ...prevState, accessToken: response.data.accessToken }
                }
            })

            setProfileInfo(prevState => {
                if (prevState.profileExists === false && response.data.profileData) {
                    return { profileExists: true, ...response.data.profileData }
                } else if (prevState.profileExists) {
                    return { ...prevState }
                }

            })

            return response.data.accessToken
        } catch (err) {
            console.error(err)
        }
    }
    return refresh
}

export default useRefreshToken;