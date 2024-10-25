import axios from "axios";

const instance = axios.create({
    baseURL: 'https://stockwise-dpp8.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
      },
    withCredentials: true
})

export default instance;