import React from "react";
import EventCard from "@site/src/components/EventCard";
import {Button} from "@site/src/components/ui/Button";


const EventSection = () => {

    return (
        <div className="w-full bg-white flex justify-center">
            <div className="flex flex-col items-center bg-white w-[1224px]">
                <div className="text-[32px] mt-[96px]">🎪</div>
                <div className="text-[42px] font-bold font-ubuntu">Events</div>
                <div className="text-sm font-normal mb-[70px]">The purpose of learning is to create together</div>

                <div className="w-full flex flex-wrap justify-between gap-6">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>

                <Button variant="outline" className="mt-[56px] mb-[128px]">View Recommended Events</Button>
            </div>
        </div>
    )
}

export default EventSection
