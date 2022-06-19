import axios from 'axios'
import CONSTANTS from '../config'

export default axios.create({
    baseURL: CONSTANTS.API_URL
})

export const axiosPrivate = axios.create({
    baseURL: CONSTANTS.API_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})