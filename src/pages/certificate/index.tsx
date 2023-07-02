import React, {useContext, useEffect, useState} from 'react';
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {get} from "lodash-es";
import Link from '@docusaurus/Link';
import useAuth from "@site/src/hooks/useAuth";
import {getCourseInfo} from "@site/src/api/course";
import useRouterQuery from "@site/src/hooks/useRouterQuery";
import {getUserCourseInfo} from "@site/src/api/mint-sbt";
import {useQuery} from "react-query";
import {WagmiConfig} from "wagmi";
import {CourseIdAndSuffixLinkMap} from "@site/src/constants/course";
import {chains, wagmiClient} from "@site/src/utils/sbt-connect";
import LoaderImage from "@site/src/components/Image";
import {CertificateContext} from "@site/src/contexts/CertificateContext";
import Layout from "@theme/Layout";
import Stepper from "@site/src/components/ui/Stepper";
import Step from "@site/src/components/ui/Stepper/Step";
import StepLoginGithub from "@site/src/pages/certificate/_StepLoginGithub";
import StepConnectWallet from "@site/src/pages/certificate/_StepConnectWallet";
import StepMint from "@site/src/pages/certificate/_StepMint";
import StepEnd from "@site/src/pages/certificate/_StepEnd";

const Main = () => {
    const [activeStep, setActiveStep] = React.useState(2);
    const [finish, setFinish] = useState(false);
    const [finishTxInfo, setFinishTxInfo] = useState(null);
    const {info, requestInfoLoading} = useContext(CertificateContext);
    const {isLogin} = useAuth();

    const hasClaimed = get(info, "data.hasClaimed");
    const canGraduate = get(info, "can_graduate");
    const title = get(info, 'course_title');
    const nftImage = get(info, 'image_url');
    const courseId = get(info, 'courseId');

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
        setFinishTxInfo(info);
    }

    const Title = () => {
        if (!isLogin) {
            return (
                <>领取WTF Solidity入门的技能认证NFT</>
            )
        }

        if (requestInfoLoading) {
            return (
                <>数据加载中...</>
            )
        }

        if (!canGraduate) {
            return (
                <>你尚未完成WTF Solidity入门课程</>
            )
        }

        return (
            <>
                恭喜你，
                <br className="md:hidden"/>
                通过WTF {title}测试
            </>
        )
    }

    const SubTitle = () => {
        if (!isLogin) {
            return (
                <>请登录后完成下面步骤领取技能认证NFT吧！</>
            )
        }

        if (requestInfoLoading) {
            return <>耐心等待！</>;
        }

        if (!canGraduate) {
            return (
                <>
                    进入
                    <Link to={CourseIdAndSuffixLinkMap[courseId]}>课程页面</Link>
                    继续学习并通过测试吧！
                </>
            )
        }

        return (
            <>
                按照下面步骤领取技能认证NFT吧！（公测）
            </>
        )
    }

    return (
        <div className="w-screen h-safe-screen bg-white">
            <div className="container flex flex-col items-center gap-12">
                <div className="flex flex-col mt-12 md:items-center gap-4">
                    <h1 className="text-2xl font-bold">
                        <Title/>
                    </h1>
                    <p className="text-md lg:text-lg font-medium">
                        <SubTitle/>
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row w-full justify-center">
                    <div className="flex flex-col items-center justify-center lg:bg-gray-50 rounded-md lg:mr-12 lg:w-[456px] lg:h-[396px]">
                        <LoaderImage
                            className="rounded-xl w-[310px] h-[185px] bg-gray-100 md:w-[500px] md:h-[300px] lg:w-[288px] lg:h-auto overflow-hidden"
                            src={nftImage}
                        />
                        <p className="text-md text-gray-900 mt-4 font-medium">NFT Certificate</p>
                    </div>
                    <div className="mb-20 mt-6 lg:mt-0 lg:mb-0 lg:w-[465px] lg:h-[396px] flex flex-col justify-center">
                        <div className="flex flex-col mt-8 gap-y-4 lg:mt-0">
                            {!finish && (
                                <Stepper activeStep={activeStep}>
                                    <Step linkCount={5}>
                                        <StepLoginGithub next={handleNext}/>
                                    </Step>
                                    <Step linkCount={5} disabled={!canGraduate}>
                                        <StepConnectWallet info={info} next={handleNext}/>
                                    </Step>
                                    <Step linkCount={5} disabled={!canGraduate}>
                                        <StepMint info={info} next={handleFinish}/>
                                    </Step>
                                </Stepper>
                            )}
                            {finish && (
                                <StepEnd txInfo={finishTxInfo} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Certificate = () => {
    const routerQuery = useRouterQuery();
    const courseId = routerQuery.get("cid");

    const getInfo = async () => {
        const courseInfoData = await getCourseInfo(courseId);
        const courseInfo = get(courseInfoData, 'course_info', {});
        const tokenId = get(courseInfo, 'token_id');

        const userInfo = await getUserCourseInfo(courseId, tokenId);

        return {
            ...(userInfo || {}),
            ...courseInfo,
            courseId,
            tokenId
        }
    }
    const {data: info, refetch, isLoading: loading} = useQuery(
        ['userCourseInfo', courseId],
        () => getInfo(),
    );

    return (
        <Layout noFooter>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                    <CertificateContext.Provider value={{
                        info: info,
                        refreshInfo: refetch,
                        requestInfoLoading: loading
                    }}>
                        <Main />
                    </CertificateContext.Provider>
                </RainbowKitProvider>
            </WagmiConfig>
        </Layout>
    )
}

export default Certificate;
