import axios from 'axios';
import {refreshSession} from "./auth";

export const BASE_URL = process.env.NODE_ENV === "development" ? 'https://api.wtf.academy/' : 'https://api.wtf.academy/';
console.log("BASE_URL: ", BASE_URL);

let request = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

request.interceptors.request.use(async (config) => {
    // const accountInfo = localStorage.getItem('supabase.auth.token');
    //
    // if (accountInfo) {
    //     let access_token = JSON.parse(accountInfo)['currentSession']['access_token'];
    //
    //     console.log("token过期：", accountInfo.expiresAt);
    //     if (+new Date() >= accountInfo.expiresAt * 1000) {
    //         console.log('过期')
    //         access_token = await refreshSession();
    //     }
    //
    //     config.headers.Authorization = `Bearer ${access_token}`;
    // }

        config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY5ODgxMTU1LCJzdWIiOiI4YzZmOGZiNi0wYjMwLTQ0MWItYmNlYS1lZjkzZmEyODlmNTAiLCJlbWFpbCI6ImNob25ncWlhbmdjaGVuQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ2l0aHViIiwicHJvdmlkZXJzIjpbImdpdGh1YiJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzQ3NzM0Mzc2P3Y9NCIsImVtYWlsIjoiY2hvbmdxaWFuZ2NoZW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkNob25nIiwiaXNzIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSIsIm5hbWUiOiJDaG9uZyIsInByZWZlcnJlZF91c2VybmFtZSI6ImNob25ncWlhbmdjaGVuIiwicHJvdmlkZXJfaWQiOiI0NzczNDM3NiIsInN1YiI6IjQ3NzM0Mzc2IiwidXNlcl9uYW1lIjoiY2hvbmdxaWFuZ2NoZW4ifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwic2Vzc2lvbl9pZCI6ImVkNGMyYzA0LTJjZGEtNGE2ZC05MTI0LTRkYzQxYzI3M2VkNyJ9.joKeADKREZan9AmKzVtZe764-GZ0InJoVhQNnVFd5Bw`;
    return config;
})

export default request;