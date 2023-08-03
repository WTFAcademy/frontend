import React from "react";
import SponsorJSON from "@site/static/json/sponsor.json";
import SponsorCard from "@site/src/components/SponsorCard";
import Translate from '@docusaurus/Translate';

const SponsorSection = () => {
    return (
        <div className="w-full py-[96px] flex items-center justify-center bg-background-faint">
            <div className="w-full px-8 flex flex-col justify-center md:gap-[120px] md:flex-row md:justify-between md:w-[1224px] relative">
                <div className="flex flex-col flex-shrink-0 items-center mb-8 md:items-start">
                    <div className="flex items-center gap-1">
                        <div className="text-[32px]">🍊</div>
                        <h2 className="font-ubuntu text-content text-[42px] font-bold">
                            <Translate id="home.sponsors.title">
                                赞助商
                            </Translate>
                        </h2>
                    </div>
                    <div className="text-sm mt-4">
                        <Translate id="home.sponsors.intro">
                            支持Web3的未来
                        </Translate>
                    </div>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                    {SponsorJSON.map((sponsor) => (
                        <SponsorCard key={sponsor.name} sponsor={sponsor} />
                    ))}
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 bottom-[-96px] bg-brand-special h-[2px] w-[120px] rounded"></div>
            </div>
        </div>
    )
}

export default SponsorSection;
