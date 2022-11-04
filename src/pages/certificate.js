import React from 'react';
import Layout from '@theme/Layout';
import {WagmiConfig} from "wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import useRouterQuery from "../hooks/useRouterQuery";
import {chains, wagmiClient} from "../utils/wagmi";
import {ConnectButton} from '@rainbow-me/rainbowkit';

const Main = () => {
    return (
        <Layout noFooter title="Hello" description="Hello React Page">
            <ConnectButton/>
        </Layout>
    )
}

const Certificate = () => {
    const routerQuery = useRouterQuery();
    const certificateId = routerQuery.get("cid");

    console.log(certificateId)

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <Main/>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default Certificate;