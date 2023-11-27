import { createClient, configureChains, mainnet, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { optimism } from "wagmi/chains";

export const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, optimism, goerli],
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
