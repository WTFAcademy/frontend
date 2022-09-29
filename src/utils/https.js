
import axios from 'axios';

import { BASE_URL, SOLIDITY_COURSE_ID } from '@site/src/configs/request';

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('supabase.auth.token'))['currentSession']['access_token']}`}
});
