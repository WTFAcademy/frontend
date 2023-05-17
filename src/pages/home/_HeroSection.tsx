import React from "react"

const HeroSection = () => {
    return (
        <div className="flex flex-col h-safe-screen">
            <div className="h-[527px] w-full flex items-center justify-center bg-gray-200">
                Hero Test
            </div>
            <div className="flex-auto w-full flex flex-col items-center justify-center">
                <p>Educating 100,000 Developers for Web3</p>
                <p>
                    <a>Follow us on Twitter, </a>
                    <span>{" "}connect with web3 developers.</span>
                </p>
            </div>
        </div>
    )
}

export default HeroSection
