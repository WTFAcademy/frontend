import request from "./request";

export const getProfile = (uid: string) => 
  request.get(`/user/${uid}/profile`);

export const updateProfile = (uid: string) => 
  request.put(`/user/${uid}/profile`);