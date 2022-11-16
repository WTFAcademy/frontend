import axios from 'axios';
import {refreshSession} from "./auth";

export const BASE_URL = process.env.NODE_ENV === "development" ? 'https://wtf.dev.arkhodler.com' : 'https://wtf.arkhodler.com';

let request = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

request.interceptors.request.use(async (config) => {
    const accountInfo = localStorage.getItem('supabase.auth.token');

    if (accountInfo) {
        let access_token = JSON.parse(accountInfo)['currentSession']['access_token'];


        if (+new Date() >= accountInfo.expiresAt * 1000) {
            access_token = await refreshSession();
        }

        config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
})

export default request;