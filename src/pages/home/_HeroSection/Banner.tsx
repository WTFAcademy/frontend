import React from "react";
import {Button} from "@site/src/components/ui/Button";
import Translate from '@docusaurus/Translate';

const Banner = () => {
    return (
        <div className="bg-image h-[500px] lg:h-[700px] w-full flex flex-col items-center justify-center bg-gray-200 text-white">
            <div className="font-ubuntu font-bold text-[48px] leading-[55px] md:text-[56px] md:leading-[64px]">WTF Academy</div>
            <div className="font-ubuntu font-normal text-[20px] mt-4">
                <Translate id="home.hero.intro">
                    开发者的 Web3 开源大学
                </Translate>
            </div>
            <div className="rounded-full bg-[#251A12] h-10 flex gap-[10px] px-6 py-2 my-[42px] text-base">
                <div className="flex items-center gap-[10px]">
                    <span className="bg-[#C38E64] w-[3px] h-[3px] rounded-full" />
                    <span className="font-medium text-[#EFDCCD]">
                        <Translate id="home.hero.tag01">
                            学习
                        </Translate>
                    </span>
                </div>
                <div className="flex items-center gap-[10px]">
                    <span className="bg-[#C38E64] w-[3px] h-[3px] rounded-full" />
                    <span className="font-medium text-[#EFDCCD]">
                        <Translate id="home.hero.tag02">
                            贡献
                        </Translate>
                    </span>
                </div>
                <div className="flex items-center gap-[10px]">
                    <span className="bg-[#C38E64] w-[3px] h-[3px] rounded-full" />
                    <span className="font-medium text-[#EFDCCD]">
                        <Translate id="home.hero.tag03">
                            获取认证
                        </Translate>
                    </span>
                </div>
            </div>
            <div className="flex gap-[10px]">
                <Button className="h-[42px] text-base">
                    <Translate id="home.hero.button01">
                        开始学习
                    </Translate>
                </Button>
                <Button className="h-[42px] text-base" variant="outline">
                    <Translate id="home.hero.button02">
                        加入社区
                    </Translate>
                </Button>
            </div>
        </div>
    )
}

export default Banner;
