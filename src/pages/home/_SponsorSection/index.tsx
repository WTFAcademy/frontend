import React from "react";
import SponsorJSON from "@site/static/json/sponsor.json";
import SponsorCard from "@site/src/components/SponsorCard";
import Translate from "@docusaurus/Translate";

const SponsorSection = () => {
  return (
    <div className="flex items-center justify-center w-full py-[96px] bg-background-faint">
      <div className="relative flex flex-col justify-center w-full px-8 md:gap-[120px] md:flex-row md:justify-between md:w-[1224px]">
        <div className="flex flex-col items-center flex-shrink-0 mb-8 md:items-start">
          <div className="flex items-center gap-1">
            <div className="text-[32px]">🍊</div>
            <h2 className="font-bold font-ubuntu text-content text-[42px]">
              <Translate id="home.sponsors.title">赞助商</Translate>
            </h2>
          </div>
          <div className="mt-4 text-sm">
            <Translate id="home.sponsors.intro">支持Web3的未来</Translate>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          {SponsorJSON.map(sponsor => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>

        <div className="absolute rounded left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 bottom-[-96px] bg-brand-special h-[2px] w-[120px]"></div>
      </div>
    </div>
  );
};

export default SponsorSection;
