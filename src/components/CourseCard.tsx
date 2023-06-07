import React from "react";
import Tag from "@site/src/components/ui/Tag";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/20/solid";


const CourseCard = () => {
    return (
        <div className="w-full md:w-[300px] h-[272px] border border-solid rounded-md shadow-sm">
            <div className="bg-gray-300 w-full h-[150px]"/>
            <div className="flex flex-col p-4">
                <div className="flex justify-between items-center text-[22px] leading-[25px] font-bold font-ubuntu">
                    <span>Solidity 101</span>
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-500"/>
                </div>
                <div className="text-sm leading-[17px] mt-[10px]">Learn Solidity Basics</div>

                <div className="flex gap-2 mt-[14px]">
                    <Tag className="bg-blue-100">Web3 Builder</Tag>
                    <Tag className="bg-blue-100">2000 Pass</Tag>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
