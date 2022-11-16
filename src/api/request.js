import axios from 'axios';
import {refreshSession} from "./auth";

export const BASE_URL = process.env.NODE_ENV === "development" ? 'https://wtf.dev.arkhodler.com' : 'https://wtf.arkhodler.com';

let request = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

request.interceptors.request.use(async (config) => {
    // const accountInfo = localStorage.getItem('supabase.auth.token');

    // if (accountInfo) {
    //     let access_token = JSON.parse(accountInfo)['currentSession']['access_token'];
    //
    //
    //     if (+new Date() >= accountInfo.expiresAt * 1000) {
    //         access_token = await refreshSession();
    //     }
    //
    //     config.headers.Authorization = `Bearer ${access_token}`;
    // }

    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY4NjE0NDMzLCJzdWIiOiI4YzZmOGZiNi0wYjMwLTQ0MWItYmNlYS1lZjkzZmEyODlmNTAiLCJlbWFpbCI6ImNob25ncWlhbmdjaGVuQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ2l0aHViIiwicHJvdmlkZXJzIjpbImdpdGh1YiJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzQ3NzM0Mzc2P3Y9NCIsImVtYWlsIjoiY2hvbmdxaWFuZ2NoZW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkNob25nIiwiaXNzIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSIsIm5hbWUiOiJDaG9uZyIsInByZWZlcnJlZF91c2VybmFtZSI6ImNob25ncWlhbmdjaGVuIiwicHJvdmlkZXJfaWQiOiI0NzczNDM3NiIsInN1YiI6IjQ3NzM0Mzc2IiwidXNlcl9uYW1lIjoiY2hvbmdxaWFuZ2NoZW4ifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzZXNzaW9uX2lkIjoiOGJiNTRkYTUtMTU4OC00NTAwLWFlOTItNmQzMjcxNjZmOTRmIn0.tGTdPa1SsQE8Wm55J3vpYoBaRI0YV0KfKU1muBV_w5c`

    return config;
})

export default request;