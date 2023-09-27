import request from "./request";
import { TAuthWalletLogin, TBindWalletParams } from "@site/src/typings/auth";
import { TResult } from "@site/src/typings/common";
import { SiweMessage } from "siwe/lib/client";

export const getNonce = (address: string) =>
  request
    .post("/auth/nonce", { wallet: address }, { ignore: true })
    .then(res => res.data);

export const loginWithWallet = (
  message: Partial<SiweMessage>,
  signature: string,
) =>
  request
    .post<unknown, TResult<TAuthWalletLogin>>(
      "/auth/login",
      {
        message,
        signature,
      },
      { ignore: true },
    )
    .then(res => res.data);

export const bindWallet = (data: TBindWalletParams) => {
  return request
    .post("/wallet/bind", data, { ignore: true })
    .then(res => res.data);
};
