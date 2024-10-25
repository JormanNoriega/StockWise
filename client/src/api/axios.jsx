import axios from "axios";

const instance = axios.create({
    baseURL: 'https://stockwise-dpp8.onrender.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
      },
})

export default instance;