import React from "react";
import Link from "@docusaurus/Link";

import CourseList from "@site/src/components/CoursesList";
import { Button } from "@site/src/components/ui/Button";
import Translate from "@docusaurus/Translate";

const CourseSection = () => {
  return (
    <div className="flex justify-center w-full pb-28">
      <div className="flex flex-col items-center w-full px-8 md:w-[1028px]">
        <div className="flex items-center gap-1">
          <div className="text-[32px]">🐝</div>
          <div className="font-bold text-[42px] font-ubuntu">
            <Translate id="home.courses.title">课程</Translate>
          </div>
        </div>
        <div className="mt-4 text-sm font-normal mb-[70px]">
          <Translate id="home.courses.title">
            为开发者设计的 Web3 课程
          </Translate>
        </div>

        <CourseList isTotal={false} isUpcoming={false} />
        <CourseList isTotal={false} isUpcoming />

        <Link to="/courses">
          <Button className="mt-16 text-base">
            <Translate id="home.courses.button">查看所有课程</Translate>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;
