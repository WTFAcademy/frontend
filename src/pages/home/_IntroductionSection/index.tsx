import React from "react";
import Tag from "@site/src/components/ui/Tag";
import ProfileIcon from "@site/src/icons/Profile";
import CertificateIcon from "@site/src/icons/Certificate";
import PrToEarnIcon from "@site/src/icons/PrToEarn";
import CommunityIcon from "@site/src/icons/Community";
import Translate from '@docusaurus/Translate';

const INTRODUCTIONS = [
    {
        title: <Translate id="home.introduction.title01">开源教程</Translate>,
        icon: <ProfileIcon />,
        color: "#FCE9DE"
    },
    {
        title: <Translate id="home.introduction.title02">链上技术认证</Translate>,
        icon: <CertificateIcon />,
        color: "#DDE6FA"
    },
    {
        title: <Translate id="home.introduction.title03">PR to Earn</Translate>,
        icon: <PrToEarnIcon />,
        color: "#FCE9DE"
    },
    {
        title: <Translate id="home.introduction.title04">社区共同学习</Translate>,
        icon: <CommunityIcon />,
        color: "#DDE6FA"
    },
]

const IntroductionSection = () => {
    return (
        <div className="h-[324px] flex items-center justify-around container-md">
            {INTRODUCTIONS.map((item, index) => (
                <div key={index} className="flex flex-col justify-center items-center">
                    <Tag circle className="w-[64px] h-[64px] md:w-[100px] md:h-[100px]" style={{background: item.color}}>
                        {item.icon}
                    </Tag>
                    <span className="font-medium text-base mt-4 h-[48px] text-center">{item.title}</span>
                </div>
            ))}
        </div>
    )
}

export default IntroductionSection
