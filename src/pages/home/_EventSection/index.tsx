import React from "react";
import Link from "@docusaurus/Link";

import EventCard from "@site/src/components/EventCard";
import { Button } from "@site/src/components/ui/Button";
import Translate from '@docusaurus/Translate';

import eventJson from "@site/static/json/events.json";

const EventSection = () => {
  return (
    <div className="w-full bg-white dark:bg-background flex justify-center">
      <div className="flex flex-col items-center md:w-[1224px] md:px-0 px-8 w-full">
        <div className="text-[32px] mt-[96px]">🎪</div>
        <div className="text-[42px] font-bold font-ubuntu">
          <Translate id="home.events.title">
            活动
          </Translate>
        </div>
        <div className="text-sm font-normal mb-[70px]">
          <Translate id="home.events.intro">
            学习的目的是创新
          </Translate>
        </div>

        <div className="w-full flex flex-wrap justify-center md:justify-around gap-6">
          {eventJson.slice(0, 4).map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>

        <Link to='/events'>
          <Button variant="outline" className="mt-[56px] mb-[128px]">
            <Translate id="home.events.button">
              查看所有活动
            </Translate>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventSection;
