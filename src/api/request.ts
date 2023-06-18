import axios from "axios";
import {getStorageWTFToken} from "@site/src/utils/local-storage";

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
    const access_token = getStorageWTFToken();
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
});

request.interceptors.response.use(
    (response) => {
        const {data, config, status} = response;

        // TODO(daxiongya): 1. 处理401错误 2. 处理错误返回格式，目前存在两种{code, msg} | {message}
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
