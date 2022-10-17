import axios from 'axios';
import { BASE_URL } from '@site/src/configs/request';

let request = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

request.interceptors.request.use((config) => {
    const accountInfo = localStorage.getItem('supabase.auth.token');

    if (accountInfo) {
        const access_token = JSON.parse(accountInfo)['currentSession']['access_token'];
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
})

export default request;