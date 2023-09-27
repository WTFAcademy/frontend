import React from "react";
import { TEvent } from "@site/src/typings/event";

interface TProps {
  event: TEvent;
}

const EventCard = ({ event }: TProps) => {
  return (
    <div className="relative w-full p-4 border border-solid h-[357px] md:w-[288px] md:h-[357px] rounded-md shadow-sm transition-shadow hover:shadow-lg">
      <div className="w-full mx-auto bg-gray-300 h-[170px] rounded-[8px] md:rounded-none">
        <img src={event.img} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col">
        <div className="mt-4 font-bold text-[18px] leading-[21px] font-ubuntu">
          {event.title}
        </div>
        <div className="text-sm leading-[17px] my-[6px]">
          {`${event.startDate} - ${event.endDate}`}
        </div>
        <div className="text-sm text-gray-700 line-clamp-3">
          {event.description}
        </div>
        <a
          className="absolute mt-3 text-brand-primary left-4 bottom-2"
          href={event.to}
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default EventCard;
