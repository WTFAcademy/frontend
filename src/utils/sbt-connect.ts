import { configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { BaseChain } from "@site/src/constants/chain";

export const { chains, provider, webSocketProvider } = configureChains(
  [BaseChain],
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
