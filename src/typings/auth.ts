export type TBindWalletParams = {
  mesData: string;
  signData: string;
  wallet: string;
};

export type TAuthUser = {
  avatar: string;
  bio: string;
  email: string;
  github: string;
  id: string;
  nickname: string;
  twitter: string;
  username: string;
  viewer: string;
  wallet: string;
};

export type TSiweMessage = {
  address: string;
  chainId: number;
  domain: string;
  expirationTime: string;
  issuedAt: string;
  nonce: string;
  statement: string;
  uri: string;
  version: string;
};

export type TAuthWalletLogin = {
  token: string;
};
