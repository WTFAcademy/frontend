import React from "react";
import ContributorList from "@site/src/components/ContributorList";
import Translate from '@docusaurus/Translate';

const ContributorSection = () => {
    return (
        <div className="w-full bg-background py-[96px] flex items-center justify-center">
            <div className="w-full px-8 flex flex-col justify-center md:flex-row md:justify-between md:w-[1224px]">
                <div className="flex flex-col flex-shrink-0 items-center mb-8 md:items-start">
                    <div className="flex items-center gap-1">
                        <div className="text-[32px]">🍇</div>
                        <h2 className="font-ubuntu text-background-foreground text-[42px] font-bold">
                            <Translate id="home.contributors.title">
                                贡献者
                            </Translate>
                        </h2>
                    </div>
                    <div className="text-sm mt-4">
                        <Translate id="home.contributors.intro">
                            分享是最好的学习方法
                        </Translate>
                    </div>
                </div>

                <div className="flex justify-center	">
                    <ContributorList />
                </div>
            </div>
        </div>
    )
}

export default ContributorSection;
