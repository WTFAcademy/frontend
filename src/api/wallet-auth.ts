import request from "./request";

export const getNonce = (address: string) =>
  request.post("/auth/nonce", { wallet: address });

export const getProfile = (uid: string) => 
  request.get(`/user/${uid}/profile`);