
import axios from 'axios';

import { BASE_URL, SOLIDITY_COURSE_ID } from '@site/src/configs/request';

let request = null;

function createRequest() {
    request = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('supabase.auth.token'))['currentSession']['access_token']}`}
    });
}

createRequest();

export const reloadRequest = createRequest;
export default request;