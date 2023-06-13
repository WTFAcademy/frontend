import React from "react";
import CourseCard from "@site/src/components/CourseCard";
import Tag from "@site/src/components/ui/Tag";
import CourseJSON from "@site/static/json/course.json";


const CourseList = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full font-ubuntu font-bold">
               <span>Popular Courses</span>
                <Tag circle className="h-6 w-6 bg-gray-200 ml-3">{CourseJSON.length}</Tag>
            </div>
            <div className="flex flex-wrap justify-center md:justify-around gap-6 mt-[35px]">
                {CourseJSON.map(item => (
                    <CourseCard course={item} />
                ))}
            </div>
        </div>
    )
}

export default CourseList
