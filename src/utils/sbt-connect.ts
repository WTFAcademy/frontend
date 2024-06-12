import { configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

const Base = {
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

export const { chains, provider, webSocketProvider } = configureChains(
  [Base],
  [publicProvider()],
);

const connectors = connectorsForWallets([
  {
    groupName: "Suggested",
    wallets: [
      metaMaskWallet({ chains, projectId: "3dbe86e60cf2b488d1b703495224e0c8" }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
