import request from "./request";
import {TAuthUser} from "@site/src/typings/auth";
import {TResult} from "@site/src/typings/common";

export const getProfile = (uid: string) =>
  request.get(`/user/${uid}/profile`);

export const updateProfile = (uid: string) => 
  request.put(`/user/${uid}/profile`);

export const getUserInfo = () => {
    return request.get<unknown, TResult<TAuthUser>>(`/user`).then((res) => res.data);
}
