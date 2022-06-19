import { useContext } from 'react';
import axios from '../api/axios'
import DataContext from '../context/DataContext';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();
    const {setProfileInfo} = useContext(DataContext)

    const logout = async () => {
        setAuth({ status: false, userEmail: '', userId: '', profileType: '' });
        setProfileInfo({profileExists: false})
        try {
            return await axios.get('api/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout