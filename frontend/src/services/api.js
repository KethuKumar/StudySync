
import axios from 'axios'

const API_URL = "https://studysync-backend-rjic.onrender.com/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export default api;
