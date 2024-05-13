import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import EventCard from "@site/src/components/EventCard";
import eventJson from "@site/static/json/events.json";

function Events() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Web3 Events.">
      <div className="flex justify-center w-full mb-36">
        <div className="flex flex-col items-center w-full px-8 md:w-[1224px] md:px-0">
          <div className="font-bold text-[42px] font-ubuntu">Events</div>
          <div className="text-sm font-normal mb-[70px]">
            The purpose of learning is to create together
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eventJson.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Events;
