import { createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import {
  okxWallet,
  trustWallet,
  tahoWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { optimism } from "wagmi/chains";
import { sepolia } from "viem/chains";

export const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, optimism, sepolia],
  [publicProvider()],
);

const projectId = "3dbe86e60cf2b488d1b703495224e0c8";

const { wallets } = getDefaultWallets({
  appName: "WTF Academy",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "More Wallets",
    wallets: [
      okxWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      zerionWallet({ projectId, chains }),
      tahoWallet({ chains }),
    ],
  },
]);
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
