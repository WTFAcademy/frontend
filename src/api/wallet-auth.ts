import request from "./request";
import {TBindWalletParams} from "@site/src/typings/auth";

export const getNonce = (address: string) =>
  request.post("/auth/nonce", { wallet: address });

export const bindWallet = (data: TBindWalletParams) => {
    return request.post('/wallet/bind', data).then(res => res.data);
}
