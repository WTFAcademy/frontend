import React from "react";
import Link from "@docusaurus/Link";

import CourseList from "@site/src/components/CoursesList";
import { Button } from "@site/src/components/ui/Button";

const CourseSection = () => {
  return (
    <div className="w-full bg-white dark:bg-background pb-28 flex justify-center">
      <div className="flex flex-col items-center px-8 w-full md:w-[1028px]">
        <div className="text-[32px]">🐝</div>
        <div className="text-[42px] font-bold font-ubuntu">Courses</div>
        <div className="text-sm font-normal mb-[70px] text-center">
          Courses specially designed by developers for developers
        </div>

        <CourseList isTotal={false} isUpcoming={false} />
        <CourseList isTotal={false} isUpcoming/>

        <Link to="/courses">
          <Button className="mt-16 text-base">View All Courses</Button>
        </Link>
      </div>
    </div>
  );
};


export default CourseSection;
