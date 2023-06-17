import React from "react";
import Layout from "@theme/Layout";
import {useAccount} from "wagmi";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {WTFLetter as WTFLetterIcon} from "@site/src/icons";
import LoginEntry from "@site/src/pages/login/_LoginEntry";
import ConnectWallet from "@site/src/pages/login/_ConnectWallet";
function Login() {
    const {siteConfig} = useDocusaurusContext();
    const {isConnected} = useAccount();

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
            noFooter
        >
            <div className="mt-14 mx-auto text-center">
                <WTFLetterIcon/>
                <p className="text-2xl leading-8 font-bold text-foreground">
                    Log in to WTF Academy
                </p>
                <div className="shadow-md bg-secondary-foreground rounded-lg px-10 py-8 mt-8">
                    {isConnected ? <ConnectWallet /> : <LoginEntry />}
                </div>
            </div>
        </Layout>
    );
}

export default Login;
