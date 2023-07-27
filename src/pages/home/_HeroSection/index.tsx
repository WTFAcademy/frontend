import React from "react"
import Banner from "./Banner";
import Translate from '@docusaurus/Translate';

const HeroSection = () => {
    return (
        <div className="flex flex-col">
            <Banner />
            <div className="w-full flex flex-col items-center justify-center py-20">
                <div className="font-press_start_2p font-normal text-sm sm:text-base text-center max-w-[80%]">
                    <Translate id="home.hero.desc01">
                        Educating 100,000 Developers for Web3
                    </Translate>
                </div>
                <div className="mt-7 text-sm leading-5">
                    <a href="https://twitter.com/WTFAcademy_" className="text-brand">
                        <Translate id="home.hero.desc02">
                        在 Twitter 上关注我们，
                        </Translate>
                    </a>
                    <span>{" "}
                        <Translate id="home.hero.desc03">
                            与 web3 开发人员交流。
                        </Translate>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
