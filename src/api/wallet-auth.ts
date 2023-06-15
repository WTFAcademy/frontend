import request from "./request";

export const getNonce = (address: string) =>
  request.post("/auth/nonce", { wallet: address });