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
      description="Web3 Events."
    >
      <div className="w-full flex justify-center mb-36">
        <div className="flex flex-col items-center md:w-[1224px] md:px-0 px-8 w-full">
          <div className="text-[42px] font-bold font-ubuntu">Events</div>
          <div className="text-sm font-normal mb-[70px]">
            The purpose of learning is to create together
          </div>

          <div className="w-full flex flex-wrap justify-center md:justify-around gap-6">
            {eventJson.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
            {Array(4 - (eventJson.length % 4) || 0)
              .fill("")
              .map((_, index: number) => (
                <div key={index} className="w-full md:w-[288px] h-0"></div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Events;
