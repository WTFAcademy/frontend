import React from "react";
import EventCard from "@site/src/components/EventCard";
import {Button} from "@site/src/components/ui/Button";


const EventSection = () => {

    return (
        <div className="w-full bg-white dark:bg-background flex justify-center">
            <div className="flex flex-col items-center md:w-[1224px] md:px-0 px-8 w-full">
                <div className="text-[32px] mt-[96px]">🎪</div>
                <div className="text-[42px] font-bold font-ubuntu">Events</div>
                <div className="text-sm font-normal mb-[70px]">The purpose of learning is to create together</div>

                <div className="w-full flex flex-wrap justify-center md:justify-around gap-6">
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
