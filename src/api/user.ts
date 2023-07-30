import request from "./request";
import { TAuthUser } from "@site/src/typings/auth";
import { TResult } from "@site/src/typings/common";

export const getUserInfo = () => {
  return request
    .get<unknown, TResult<TAuthUser>>(`/user`, { ignore: true })
    .then((res) => res.data);
};

export const getUserCourse = (i18n=null) => {
  return request
    .get<unknown, TResult<any>>(
      `/user/my_course`, i18n ? { params: { lan : i18n } } : null
    )
    .then((res) => res.data);
};

export const updateUserInfo = (userInfo) => {
  return request
    .put<unknown, TResult<TAuthUser>>(
      `/user`, userInfo
    )
    .then((res) => res.data);
}

