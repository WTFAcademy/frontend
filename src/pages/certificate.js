import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import {WagmiConfig} from "wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import useRouterQuery from "../hooks/useRouterQuery";
import {chains, wagmiClient} from "../utils/wagmi";
import TailwindWrapper from "../components/TailwindWrapper";
import Step from "../components/Stepper/Step";
import Stepper from "../components/Stepper";
import StepLoginGithub from "./certificate/_StepLoginGithub";
import StepConnectWallet from "./certificate/_StepConnectWallet";
import StepMint from "./certificate/_StepMint";
import StepEnd from "./certificate/_StepEnd";
import {useRequest} from "ahooks";
import {getUserCourseInfo} from "../api/user";
import get from "lodash/get";
import TailwindImage from "../components/Image";
import {getCourseInfo} from "../api/course";

export const CertificateContext = createContext(null)

const Main = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [finish, setFinish] = useState(false);
    const {info} = useContext(CertificateContext);

    const hasClaimed = get(info, "hasClaimed");
    const canGraduate = get(info, "can_graduate");
    const title = get(info, 'course_info.course_title');
    const nftImage = get(info, 'course_info.image_url');

    useEffect(() => {
        if (hasClaimed) {
            setFinish(true);
        }
    }, [hasClaimed])

    const handleNext = (step) => {
        if (step || step === 0) {
            setActiveStep(step);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleFinish = (info) => {
        setFinish(true);
    }

    return (
        <>
            <div className="container">
                <div className="flex flex-col mt-10 md:items-center">
                    <h1 className="text-[28px] font-bold md:text-[40px]">
                        恭喜你，
                        <br className="md:hidden"/>
                        通过WTF {title}测试
                    </h1>
                    <p className="text-md lg:text-2xl lg:mt-3">
                        按照下面步骤领取属于你的认证NFT吧！(WTF Academy 认证系统公测)
                    </p>
                </div>
                <div className="w-full bg-[#7A7A7A99] m-auto h-px my-8 lg:mt-[54px] lg:mb-[90px]"/>
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:mr-[10%]">
                        <div className="font-medium text-[24px] mb-6">
                            NFT证书展示
                        </div>
                        <div className="lg:w-[602px]">
                            <TailwindImage
                                src={nftImage}
                                imageClass="w-full min-h-[229px] max-h-[400px] lg:w-[602px] lg:h-[302px]"
                            />
                        </div>
                    </div>
                    {/*<div className="divider my-6 lg:hidden lg:my-0" />*/}
                    <div className="flex-auto mb-20 mt-6 lg:mt-0 lg:mb-0">
                        <div className="font-medium text-[24px] mb-6">
                            {finish ? "🎉 NFT证书领取成功！" : "领取NFT证书"}
                        </div>
                        <div className="flex flex-col mt-8 gap-y-4 lg:mt-0">
                            {!finish && (
                                <Stepper activeStep={activeStep}>
                                    <Step>
                                        <StepLoginGithub canGradute={canGraduate} next={handleNext}/>
                                    </Step>
                                    <Step disabled={!canGraduate}>
                                        <StepConnectWallet info={info} next={handleNext}/>
                                    </Step>
                                    <Step disabled={!canGraduate}>
                                        <StepMint info={info} next={handleFinish}/>
                                    </Step>
                                </Stepper>
                            )}
                            {finish && (
                                <StepEnd/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Certificate = () => {
    const routerQuery = useRouterQuery();
    const courseId = routerQuery.get("cid");
    const {data: courseInfoData} = useRequest(() => getCourseInfo(courseId));

    const courseInfo = get(courseInfoData, 'data', {});
    const tokenId = get(courseInfo, 'course_info.token_id');

    const {data, loading, refresh} = useRequest(() => getUserCourseInfo(courseId, tokenId), {refreshDeps: [tokenId]});

    const userInfoWithCourse = get(data, 'data', {});

    return (
        <TailwindWrapper>
            <Layout noFooter>
                <WagmiConfig client={wagmiClient}>
                    <RainbowKitProvider chains={chains}>
                        <CertificateContext.Provider value={{info: {...userInfoWithCourse, courseId, ...courseInfo}, refreshInfo: refresh, requestInfoLoading: loading}}>
                            <Main />
                        </CertificateContext.Provider>
                    </RainbowKitProvider>
                </WagmiConfig>
            </Layout>
        </TailwindWrapper>
    )
}

export default Certificate;