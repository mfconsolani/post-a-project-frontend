import { useEffect, useState, createContext } from "react";
import axios from "axios";
import CONSTANTS from "./config";

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState('')

    const fetchProjects = async () => {
        return await axios.get(`${CONSTANTS.API_URL}api/projects`)
            .then(res => {
                setProjects(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchProjects()
        return
    }, [])

    useEffect(() => {
        console.log(projects)
        return
    }, [projects])

    return (
        <DataContext.Provider value={{ projects, setProjects, fetchProjects }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext