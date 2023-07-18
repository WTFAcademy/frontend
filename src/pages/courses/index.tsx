import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CourseList from "@site/src/components/CoursesList";

function Courses() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className="w-full pb-[128px] flex justify-center">
        <div className="flex flex-col items-center px-8 w-full md:w-[1028px]">
          <div className="text-[42px] font-bold font-ubuntu">Courses</div>
          <div className="text-sm font-normal text-center">
            Courses specially designed by developers for developers
          </div>

          <CourseList isUpcoming={false} />

          <CourseList isUpcoming/>
        </div>
      </div>
    </Layout>
  );
}

export default Courses;
