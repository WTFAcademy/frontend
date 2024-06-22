import { Chain } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";

export const BaseChain = {
  id: 8453,
  name: "Base",
  network: "base",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"],
    },
    public: {
      http: ["https://mainnet.base.org"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "BaseScan",
      url: "https://basescan.org",
    },
    default: {
      name: "BaseScan",
      url: "https://basescan.org",
    },
  },
};

export const Chains: Chain[] = [mainnet, optimism, polygon, BaseChain];
