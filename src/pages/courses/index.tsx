import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CourseList from "@site/src/components/CoursesList";
import Translate from '@docusaurus/Translate';

function Courses() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className="w-full pb-[128px] flex justify-center">
        <div className="flex flex-col items-center px-8 w-full md:w-[1028px]">
          <div className="my-16 text-center">
            <div className="text-[42px] font-bold font-ubuntu">
              <Translate id="home.courses.title">课程</Translate>
            </div>
            <div className="text-sm font-normal">
              <Translate id="home.courses.title">
                为开发者设计的 Web3 课程
              </Translate>
            </div>
          </div>

          <CourseList isUpcoming={false} />

          <CourseList isUpcoming/>
        </div>
      </div>
    </Layout>
  );
}

export default Courses;
