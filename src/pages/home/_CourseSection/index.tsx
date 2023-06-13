import React from "react";
import CourseList from "./CourseList";
import {Button} from "@site/src/components/ui/Button";


const CourseSection = () => {

    return (
        <div className="w-full bg-white pb-[128px] flex justify-center">
            <div className="flex flex-col items-center bg-white px-8 w-full md:w-[1028px]">
                <div className="text-[32px]">🐝</div>
                <div className="text-[42px] font-bold font-ubuntu">Courses</div>
                <div className="text-sm font-normal mb-[70px]">Courses specially designed by developers for developers</div>

                <CourseList/>

                <Button className="mt-[80px] text-base">View All Courses</Button>
            </div>
        </div>
    )
}

export default CourseSection
