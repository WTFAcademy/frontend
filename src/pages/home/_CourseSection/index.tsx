import React from "react";
import Link from "@docusaurus/Link";

import CourseList from "@site/src/components/CoursesList";
import { Button } from "@site/src/components/ui/Button";
import Translate from '@docusaurus/Translate';

const CourseSection = () => {
  return (
    <div className="w-full bg-white dark:bg-background pb-28 flex justify-center">
      <div className="flex flex-col items-center px-8 w-full md:w-[1028px]">
        <div className="text-[32px]">🐝</div>
        <div className="text-[42px] font-bold font-ubuntu">Courses</div>
        <div className="text-sm font-normal mb-[70px] text-center">
          Courses specially designed by developers for developers

        <div className="text-[42px] font-bold font-ubuntu"><Translate id="home.courses.title">课程</Translate></div>
        <div className="text-sm font-normal mb-[70px]">
          <Translate id="home.courses.title">
            为开发者设计的 Web3 课程
          </Translate>
        </div>

        <CourseList isTotal={false} isUpcoming={false} />
        <CourseList isTotal={false} isUpcoming/>

        <Link to="/courses">
          <Button className="mt-16 text-base">
            <Translate id="home.courses.button">
              查看所有课程
            </Translate>
          </Button>
        </Link>
      </div>
    </div>
  );
};


export default CourseSection;
