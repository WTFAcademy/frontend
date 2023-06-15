import React from "react";
import LongArrowRight from "../../icons/LongArrowRight";

const TipItem = ({title, index}: {title: string; index: number}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="rounded-full border-primary border border-solid w-[60px] h-[60px] bg-primary-darker text-primary text-base font-medium text-center leading-[60px]">
                {index}
            </div>
            <p className="mt-4 font-bold">{title}</p>
        </div>
    )
}

const DashboardProcessTip = () => {
    return (
        <div className="w-full mt-[60px]">
            <h4>学习并获得技术认证</h4>
            <div className="border border-dashed border-gray-400 rounded-md px-[50px] py-8 flex justify-around items-center mt-7">
                <TipItem index={1} title="学习" />
                <LongArrowRight className="text-gray-400 -mt-1" />
                <TipItem index={2} title="练习题" />
                <LongArrowRight className="text-gray-400 -mt-1" />
                <TipItem index={3} title="领证（SBT）" />
            </div>
        </div>
    )
}

export default DashboardProcessTip;
