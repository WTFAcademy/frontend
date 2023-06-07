import React from "react";

const EventCard = () => {
    return (
        <div className="w-full h-[357px] md:w-[288px] md:h-[357px] p-4 border border-solid rounded-md shadow-sm">
            <div className="bg-gray-300 w-[256px] h-[170px] mx-auto rounded-[8px] md:rounded-none"/>
            <div className="flex flex-col">
                <div className="text-[18px] leading-[21px] font-bold font-ubuntu mt-4">
                    ETH Beijing Hackathon
                </div>
                <div className="text-sm leading-[17px] my-[6px]">Closed Apr 5-8, 2023</div>
                <div className="line-clamp-3 text-gray-700 text-sm">A global hackathon hosted by PKU Blockchain DAO (Beijing University Blockchain Association) and WTF Academy, co-organized by ETHPlanet and Scroll. This event features 3 main tracks and a total prize pool of $30,000+. Selected partners include Scroll, StarkWare, Mask Network etc.</div>
                <a className="text-brand-primary mt-3">Visit ETH Beijing website</a>
            </div>
        </div>
    )
}

export default EventCard
