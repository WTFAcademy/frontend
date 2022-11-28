import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import {
    injectedWallet,
    rainbowWallet,
    metaMaskWallet,
    coinbaseWallet,
    walletConnectWallet,
    braveWallet,
    trustWallet,
    imTokenWallet
} from '@rainbow-me/rainbowkit/wallets';

const defaultChain = process.env.NODE_ENV === "development" ? chain.goerli : chain.goerli;
const alchemyApiKey = process.env.NODE_ENV === "development" ? "G7IqRtT5-zargmMoC8TW9BWW8828c1zV" : "G7IqRtT5-zargmMoC8TW9BWW8828c1zV";

export const { chains, provider, webSocketProvider } = configureChains(
    [defaultChain],
    [
        alchemyProvider({ apiKey: alchemyApiKey }),
        jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
        publicProvider(),
    ],
);

const needsInjectedWalletFallback =
    typeof window !== "undefined" &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
    {
        groupName: "Popular",
        wallets: [
            metaMaskWallet({ chains, shimDisconnect: true }),
            braveWallet({ chains, shimDisconnect: true }),
            rainbowWallet({ chains }),
            walletConnectWallet({ chains }),
            coinbaseWallet({ appName: "Coinbase", chains }),
            ...(needsInjectedWalletFallback ? [injectedWallet({ chains, shimDisconnect: true })] : []),
        ],
    },
    {
        groupName: "Other",
        wallets: [trustWallet({ chains, shimDisconnect: true }), imTokenWallet({ chains })],
    },
]);

export const wagmiClient = createClient({
    connectors,
    provider,
});