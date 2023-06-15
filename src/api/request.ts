import axios from "axios";
import { TAny } from "@site/src/typings/common";
import { SUPABASE_ID } from "@site/src/constants/global";

// TODO 待完善
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://api.wtf.academy/"
    : "https://api.wtf.academy/";

let request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
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
  (response) => response,
  (err) => {
    console.log(err);
  }
);

export default request;
