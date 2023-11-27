import { configureChains, createClient, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

export const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
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
