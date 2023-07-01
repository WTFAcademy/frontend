import request from "./request";
import {TAuthUser} from "@site/src/typings/auth";
import {TResult} from "@site/src/typings/common";

export const getUserCourse = () => {
  return request.get(`/user/my_course`).then((res) => res.data);
}

export const getUserInfo = () => {
    return request.get<unknown, TResult<TAuthUser>>(`/user`).then((res) => res.data);
}

export const updateUserInfo = (userInfo) => {
  return request.put<unknown, TResult<TAuthUser>>(`/user`, userInfo).then((res) => res.data);
}