import React from "react"
import Banner from "./Banner";

const HeroSection = () => {
    return (
        <div className="flex flex-col h-safe-screen bg-white">
            <Banner />
            <div className="flex-auto w-full flex flex-col items-center justify-center">
                <div className="font-press_start_2p font-normal text-base text-center">Educating 100,000 Developers for Web3</div>
                <div className="mt-7 text-sm leading-5">
                    <a href="https://twitter.com/WTFAcademy_" className="text-brand-secondary">Follow us on Twitter, </a>
                    <span>{" "}connect with web3 developers.</span>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
