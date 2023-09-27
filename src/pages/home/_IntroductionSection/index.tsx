import React from "react";
import Tag from "@site/src/components/ui/Tag";
import ProfileIcon from "@site/src/icons/Profile";
import CertificateIcon from "@site/src/icons/Certificate";
import PrToEarnIcon from "@site/src/icons/PrToEarn";
import CommunityIcon from "@site/src/icons/Community";
import Translate from "@docusaurus/Translate";

const INTRODUCTIONS = [
  {
    title: <Translate id="home.introduction.title01">开源教程</Translate>,
    icon: <ProfileIcon />,
    color: "#FCE9DE",
  },
  {
    title: <Translate id="home.introduction.title02">链上技术认证</Translate>,
    icon: <CertificateIcon />,
    color: "#DDE6FA",
  },
  {
    title: <Translate id="home.introduction.title03">PR to Earn</Translate>,
    icon: <PrToEarnIcon />,
    color: "#FCE9DE",
  },
  {
    title: <Translate id="home.introduction.title04">社区共同学习</Translate>,
    icon: <CommunityIcon />,
    color: "#DDE6FA",
  },
];

const IntroductionSection = () => {
  return (
    <div className="flex items-center min-h-[324px] bg-background-faint">
      <div className="px-0 container-md grid grid-cols-2 md:grid-cols-4">
        {INTRODUCTIONS.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <Tag
              circle
              className="w-[56px] h-[56px] md:w-[100px] md:h-[100px]"
              style={{ background: item.color }}
            >
              {item.icon}
            </Tag>
            <span className="mt-4 text-sm font-medium text-center md:text-base h-[48px]">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroductionSection;
