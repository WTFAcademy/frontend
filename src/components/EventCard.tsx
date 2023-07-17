import React from "react";
import { TEvent } from "@site/src/typings/event";

interface TProps {
  event: TEvent;
}

const EventCard = ({ event }: TProps) => {
  return (
    <div className="w-full h-[357px] md:w-[288px] md:h-[357px] p-4 border border-solid rounded-md shadow-sm relative transition-shadow hover:shadow-lg">
      <div className="bg-gray-300 w-[256px] h-[170px] mx-auto rounded-[8px] md:rounded-none">
        <img src={event.img} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <div className="text-[18px] leading-[21px] font-bold font-ubuntu mt-4">
          {event.title}
        </div>
        <div className="text-sm leading-[17px] my-[6px]">
          {`${event.startDate} - ${event.endDate}`}
        </div>
        <div className="line-clamp-3 text-gray-700 text-sm">
          {event.description}
        </div>
        <a
          className="text-brand-primary mt-3 absolute left-4 bottom-2"
          href={event.to}
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default EventCard;
