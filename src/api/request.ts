import axios from "axios";
import {TAny} from "@site/src/typings/common";
import {SUPABASE_ID} from "@site/src/constants/global";

declare module 'axios' {
    export interface AxiosRequestConfig {
        turnOnValve?: boolean; // 是否关闭处理response返回的数据仅返回data, false为处理，true为不处理
    }
}

export const BASE_URL =
    process.env.NODE_ENV === "development"
        ? "https://api.wtf.academy/"
        : "https://api.wtf.academy/";

let request = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    turnOnValve: false,
});

request.interceptors.request.use(async (config) => {
    const accountInfo: TAny = localStorage.getItem(
        `sb-${SUPABASE_ID}-auth-token`
    );

    if (accountInfo) {
        // @dev(b00l) 本地测试时，需手动写固定token(从 https://www.wtf.academy/ 获取)
        let access_token = JSON.parse(accountInfo)["access_token"];

        console.log("token过期：", accountInfo.expiresAt);
        if (+new Date() >= accountInfo.expiresAt * 1000) {
            console.log("过期");
        }

        config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
});

request.interceptors.response.use(
    (response) => {
        const {data, config, status} = response;

        if (data.code !== 0) {
            return Promise.reject(data);
        }

        if (status !== 200) {
            return Promise.reject(response);
        }
        return config.turnOnValve ? response : data;
    },
    (err) => {
        console.log("error", err);
    }
);

export default request;
