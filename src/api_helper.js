import axios from 'axios'
const weatherstackApiInstance = () => {
    const instance =  axios.create({
        baseURL: import.meta.env.VITE_WEATHERSTACK_API_URL,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return instance;
}

export const useWeatherstackApiInstance = () => {
    const instance = weatherstackApiInstance()
    return instance
}