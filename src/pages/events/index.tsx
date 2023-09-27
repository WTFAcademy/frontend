import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import EventCard from "@site/src/components/EventCard";

import eventJson from "@site/static/json/events.json";

function Events() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className="flex justify-center w-full mb-36">
        <div className="flex flex-col items-center w-full px-8 md:w-[1224px] md:px-0">
          <div className="font-bold text-[42px] font-ubuntu">Events</div>
          <div className="text-sm font-normal mb-[70px]">
            The purpose of learning is to create together
          </div>

          <div className="flex flex-wrap justify-center w-full md:justify-around gap-6">
            {eventJson.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
            {Array(4 - (eventJson.length % 4) || 0)
              .fill("")
              .map((_, index: number) => (
                <div key={index} className="w-full h-0 md:w-[288px]"></div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Events;
