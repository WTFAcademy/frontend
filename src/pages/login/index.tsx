import React from "react";
import Layout from "@theme/Layout";
import {useAccount} from "wagmi";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {WTFLetter as WTFLetterIcon} from "@site/src/icons";
import LoginEntry from "@site/src/pages/login/_LoginEntry";
import ConnectWallet from "@site/src/pages/login/_ConnectWallet";
import Translate from '@docusaurus/Translate';

function Login() {
    const {siteConfig} = useDocusaurusContext();
    const {isConnected} = useAccount();

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Login to WTF Academy"
            noFooter
        >
            <div className="mt-14 mx-auto text-center">
                <WTFLetterIcon/>
                <p className="text-2xl leading-8 font-bold text-content">
                    <Translate id="login.intro">登录 WTF 学院</Translate>
                </p>
                <div className="shadow-md bg-white dark:bg-zinc-900 rounded-lg px-10 py-8 mt-8 w-[340px] md:min-w-[340px] md:w-auto">
                    {isConnected ? <ConnectWallet/> : <LoginEntry/>}
                </div>
            </div>
        </Layout>
    );
}

export default Login;
