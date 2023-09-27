import React from "react";
import { Button } from "@site/src/components/ui/Button";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-white bg-image h-[500px] 4xl:h-[700px] bg-background-subtle">
      <div className="font-bold font-ubuntu text-[48px] leading-[55px] md:text-[56px] md:leading-[64px]">
        WTF Academy
      </div>
      <div className="mt-4 font-normal font-ubuntu text-[20px]">
        <Translate id="home.hero.intro">开发者的 Web3 开源大学</Translate>
      </div>
      <div className="flex h-10 px-6 py-2 text-base rounded-full bg-[#251A12] gap-[10px] my-[42px]">
        <div className="flex items-center gap-[10px]">
          <span className="rounded-full bg-[#C38E64] w-[3px] h-[3px]" />
          <span className="font-medium text-[#EFDCCD]">
            <Translate id="home.hero.tag01">学习</Translate>
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="rounded-full bg-[#C38E64] w-[3px] h-[3px]" />
          <span className="font-medium text-[#EFDCCD]">
            <Translate id="home.hero.tag02">贡献</Translate>
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="rounded-full bg-[#C38E64] w-[3px] h-[3px]" />
          <span className="font-medium text-[#EFDCCD]">
            <Translate id="home.hero.tag03">获取认证</Translate>
          </span>
        </div>
      </div>
      <div className="flex gap-[10px]">
        <Link to="/courses">
          <Button className="text-base h-[42px]">
            <Translate id="home.hero.button01">开始学习</Translate>
          </Button>
        </Link>
        <Link to="https://discord.com/invite/5akcruXrsk">
          <Button
            className="text-base border border-solid h-[42px] border-border"
            variant="ghost"
          >
            <Translate id="home.hero.button02">加入社区</Translate>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
