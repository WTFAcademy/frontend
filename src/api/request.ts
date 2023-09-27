import axios from "axios";
import { toast } from "react-hot-toast";
import { getStorageWTFToken } from "@site/src/utils/local-storage";

enum ERROR_CODES {
  NOT_LOGIN = 401,
  NOT_REGISTER = 1000,
}

declare module "axios" {
  export interface AxiosRequestConfig {
    turnOnValve?: boolean; // 是否关闭处理response返回的数据仅返回data, false为处理，true为不处理
    ignore?: boolean | number[];
  }
}

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://api.wtf.academy/"
    : "https://api.wtf.academy/";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  turnOnValve: false,
  ignore: false,
});

request.interceptors.request.use(async config => {
  const access_token = getStorageWTFToken();
  config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

request.interceptors.response.use(
  response => {
    const { data, config, status } = response;
    const ignoreCodes = config.ignore;

    let promptError = false;
    if (ignoreCodes instanceof Array) {
      promptError = ignoreCodes.every(code => ERROR_CODES[code] === undefined);
    } else {
      promptError = ignoreCodes ? false : true;
    }
    data.code !== 0 && promptError && toast.error(data.msg);

    // TODO(daxiongya):
    //  1. 处理(基础状态码：401,500; 业务状态码：1000, 1001)错误
    //  2. 处理错误返回格式，目前存在两种{code, msg} | {message} => {message}
    if (data.code !== 0) {
      return Promise.reject(data);
    }
    if (status !== 200) {
      return Promise.reject(response);
    }
    return config.turnOnValve ? response : data;
  },
  err => {
    console.log("error", err);
  },
);

export default request;
