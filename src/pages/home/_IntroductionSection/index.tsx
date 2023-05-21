import React from "react";
import Tag from "@site/src/components/ui/Tag";
import ProfileIcon from "@site/src/icons/profile";
import CertificateIcon from "@site/src/icons/Certificate";
import PrToEarnIcon from "@site/src/icons/PrToEarn";
import CommunityIcon from "@site/src/icons/Community";

const INTRODUCTIONS = [
    {
        title: "Open Source",
        icon: <ProfileIcon />,
        color: "#FCE9DE"
    },
    {
        title: <span>On-chain<br />Certificates</span>,
        icon: <CertificateIcon />,
        color: "#DDE6FA"
    },
    {
        title: "PR to Earn",
        icon: <PrToEarnIcon />,
        color: "#FCE9DE"
    },
    {
        title: <span>Community<br />Driven</span>,
        icon: <CommunityIcon />,
        color: "#DDE6FA"
    },
]

const IntroductionSection = () => {
    return (
        <div className="h-[324px] flex items-center justify-around container-md">
            {INTRODUCTIONS.map((item) => (
                <div className="flex flex-col justify-center">
                    <Tag circle className="w-[100px] h-[100px]" style={{background: item.color}}>
                        {item.icon}
                    </Tag>
                    <span className="font-medium text-base mt-4 h-[48px] text-center">{item.title}</span>
                </div>
            ))}
        </div>
    )
}

export default IntroductionSection
