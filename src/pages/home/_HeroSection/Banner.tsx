import React from "react";
import {Button} from "@site/src/components/ui/Button";

const Banner = () => {
    return (
        <div className="bg-image h-[500px] w-full flex flex-col items-center justify-center bg-gray-200 text-white">
            <div className="font-ubuntu font-bold text-[56px] leading-[64px]">WTF Academy</div>
            <div className="font-ubuntu font-normal text-[20px] mt-4">Web3 Open University for Developers</div>
            <div className="rounded-full bg-[#251A12] h-10 flex gap-[10px] px-6 py-2 my-[42px]">
                <div className="flex items-center gap-[10px]">
                    <span className="bg-[#C38E64] w-[3px] h-[3px] rounded-full" />
                    <span className="text-base font-medium text-[#EFDCCD]">Learn</span>
                </div>
                <div className="flex items-center gap-[10px]">
                    <span className="bg-[#C38E64] w-[3px] h-[3px] rounded-full" />
                    <span className="text-base font-medium text-[#EFDCCD]">Contribute</span>
                </div>
                <div className="flex items-center gap-[10px]">
                    <span className="bg-[#C38E64] w-[3px] h-[3px] rounded-full" />
                    <span className="text-base font-medium text-[#EFDCCD]">Get Certified</span>
                </div>
            </div>
            <div className="flex gap-[10px]">
                <Button className="h-[42px] text-base">Start Learning</Button>
                <Button className="h-[42px] text-base" variant="outline">Join Community</Button>
            </div>
        </div>
    )
}

export default Banner;
