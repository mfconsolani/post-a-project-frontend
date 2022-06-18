import { useEffect, useState, createContext } from "react";
import axios from "axios";
import CONSTANTS from "./config";

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState('')
    const [profileInfo, setProfileInfo] = useState(JSON.parse(localStorage.getItem('userProfile')) || { profileExists: false })

    const fetchProjects = async () => {
        return await axios.get(`${CONSTANTS.API_URL}api/projects`)
            .then(res => setProjects(res.data))
            .catch(err => console.error(err))
    }

    useEffect(() => fetchProjects(), [])

    return (
        <DataContext.Provider value={{ projects, setProjects, fetchProjects, profileInfo, setProfileInfo }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext