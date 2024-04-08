import React from "react";
import { TEvent } from "@site/src/typings/event";
import Link from "@docusaurus/Link";

interface TProps {
  event: TEvent;
}

const EventCard = ({ event }: TProps) => {
  return (
    <Link to={event.to} className="hover:no-underline">
      <div className="w-full border border-solid max-h-[317px] md:w-[288px] md:h-[317px] rounded-md shadow-sm transition-shadow hover:shadow-lg cursor-pointer overflow-hidden">
        <div className="w-full mx-auto bg-gray-300 h-[170px] rounded-[8px]">
          <img src={event.img} alt="" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col p-4">
          <div className="font-bold text-[18px] leading-[21px] font-ubuntu">
            {event.title}
          </div>
          <div className="text-sm leading-[17px] my-2">
            {`${event.startDate} - ${event.endDate}`}
          </div>
          <div className="text-sm line-clamp-3">{event.description}</div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
