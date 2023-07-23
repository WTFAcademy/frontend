import React from "react";
import SponsorJSON from "@site/static/json/sponsor.json";
import SponsorCard from "@site/src/components/SponsorCard";
import Translate from "@docusaurus/Translate";

const SponsorSection = () => {
  return (
    <div className="w-full bg-background py-[96px] flex items-center justify-center">
      <div className="w-full px-8 flex flex-col justify-center md:flex-row md:justify-between md:w-[1224px]">
        <div className="flex flex-col flex-shrink-0 items-center mb-8 md:items-start">
          <div className="flex items-center gap-1">
            <div className="text-[32px]">🍊</div>
            <h2 className="font-ubuntu text-background-foreground text-[42px] font-bold">
              <Translate id="home.sponsors.title">赞助商</Translate>
            </h2>
          </div>
          <div className="text-sm mt-4">
            <Translate id="home.sponsors.intro">支持Web3的未来</Translate>
          </div>
        </div>
        // TODU: B00L 移动端适应待调整
        <div className="flex flex-1 flex-col gap-5 flex-wrap xl:flex-row justify-end md:flex-row">
          {SponsorJSON.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorSection;
