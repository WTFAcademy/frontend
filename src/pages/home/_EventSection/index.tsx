import React from "react";
import Link from "@docusaurus/Link";

import EventCard from "@site/src/components/EventCard";
import { Button } from "@site/src/components/ui/Button";
import Translate from "@docusaurus/Translate";

import eventJson from "@site/static/json/events.json";

const EventSection = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full px-8 md:w-[1224px] md:px-0">
        <div className="flex items-center gap-1 mt-[96px]">
          <div className="text-[32px]">🎪</div>
          <div className="font-bold text-[42px] font-ubuntu">
            <Translate id="home.events.title">活动</Translate>
          </div>
        </div>
        <div className="mt-4 text-sm font-normal mb-[70px]">
          <Translate id="home.events.intro">学习的目的是创新</Translate>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eventJson.slice(0, 4).map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>

        <Link to="/events">
          <Button variant="outline" className="mt-[56px] mb-[128px]">
            <Translate id="home.events.button">查看所有活动</Translate>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventSection;
