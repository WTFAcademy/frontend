import React from "react";
import Tag from "@site/src/components/ui/Tag";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { TCourseAsset } from "@site/src/typings/common";

type TProps = {
  course: TCourseAsset;
};

const CourseCard = (props: TProps) => {
  const { course } = props;

  return (
    <div className="w-full border border-solid md:w-[300px] h-[272px] rounded-md shadow-sm">
      <div className="w-full bg-gray-300 h-[150px]" />
      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between font-bold text-[22px] leading-[25px] font-ubuntu">
          <span>{course.name}</span>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
        </div>
        <div className="text-sm leading-[17px] mt-[10px]">
          {course.description}
        </div>

        <div className="flex gap-2 mt-[14px]">
          {course.tags.map(tag => (
            <Tag key={tag} className="bg-blue-100">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
