import React, {useState} from 'react';
import Layout from '@theme/Layout';
import {WagmiConfig} from "wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import useRouterQuery from "../hooks/useRouterQuery";
import {chains, wagmiClient} from "../utils/wagmi";
import TailwindWrapper from "../components/TailwindWrapper";
import CourseImage from '@site/static/img/course_ethers_start.jpg';
import Step from "../components/Stepper/Step";
import Stepper from "../components/Stepper";
import StepLoginGithub from "./certificate/_StepLoginGithub";
import StepConnectWallet from "./certificate/_StepConnectWallet";
import StepMint from "./certificate/_StepMint";
import StepEnd from "./certificate/_StepEnd";

const Main = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [finish, setFinish] = useState(false);

    const handleNext = (step) => {
        if (step || step === 0) {
            setActiveStep(step);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleFinish = (info) => {
        console.log(info);
        setFinish(true);
    }

    return (
        <Layout noFooter title="Hello" description="Hello React Page">
            <div className="container">
                <div className="flex flex-col mt-10 md:items-center">
                    <h1 className="text-[28px] font-bold md:text-[40px]">
                        恭喜你，
                        <br className="md:hidden" />
                        通过WTF Solidity入门测试
                    </h1>
                    <p className="text-md lg:text-2xl lg:mt-3">
                        按照下面步骤领取属于你的认证NFT吧！
                    </p>
                </div>
                <div className="w-full bg-[#7A7A7A99] m-auto h-px my-8 lg:mt-[54px] lg:mb-[125px]" />
                <div className="flex flex-col lg:flex-row">
                    <img alt="nft-image" src={CourseImage} className="w-full lg:w-1/2 lg:mr-[10%]" />
                    <div className="flex flex-col flex-auto mt-8 gap-y-4 lg:mt-0">
                        {!finish && (
                            <Stepper activeStep={activeStep}>
                                <Step>
                                    <StepLoginGithub next={handleNext} />
                                </Step>
                                <Step>
                                    <StepConnectWallet next={handleNext} />
                                </Step>
                                <Step>
                                    <StepMint next={handleFinish} />
                                </Step>
                            </Stepper>
                        )}
                        {finish && (
                            <StepEnd />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const Certificate = () => {
    const routerQuery = useRouterQuery();
    const certificateId = routerQuery.get("cid");

    return (
        <TailwindWrapper>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                    <Main/>
                </RainbowKitProvider>
            </WagmiConfig>
        </TailwindWrapper>
    )
}

export default Certificate;