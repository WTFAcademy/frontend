import React from "react";
import { useHistory } from "@docusaurus/router";
import { useQuery } from "react-query";
import Tag from "@site/src/components/ui/Tag";
import Spinner from "@site/src/components/ui/Spinner";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { getCourses } from "@site/src/api/course";
import { TCourse } from "../typings/course";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';

type TProps = {
  course: TCourse;
};

const CourseCard = (props: TProps) => {
  const { course } = props;
  const history = useHistory();
  const { i18n } = useDocusaurusContext();
  
  return (
    <div
      onClick={() => history.push(course.route_path)}
      className="w-full md:w-[300px] border border-solid rounded-md shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="bg-gray-300 w-full h-[150px]">
        <img
          src={course.cover_img}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center text-[22px] leading-[25px] font-bold font-ubuntu">
          <span>{course.title}</span>
          {/* <ArrowTopRightOnSquareIcon
            onClick={(e) => {
              e.stopPropagation();
              
            }}
            className="h-5 w-5 text-gray-500"
          /> */}
        </div>
        <div className="text-sm leading-[17px] mt-[10px]">
          {course.description}
        </div>
        {course.user_cnt && (
          <div className="flex gap-2 mt-[14px]">
            {/* {course?.tags.map((tag) => (
          <Tag key={tag} className="bg-blue-100">
            {tag}
          </Tag>
        ))} */}
            <Tag className="bg-blue-100">{`${course.user_cnt} learners`}</Tag>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseList = ({
  isTotal = true,
  isUpcoming,
}: {
  isTotal?: boolean;
  isUpcoming: boolean;
}) => {
  const { data, isLoading } = useQuery(["getCourses", isUpcoming], () =>
    getCourses(isUpcoming ? 2 : 1)
  );
  // console.log(data)

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full font-ubuntu font-bold">
        <span>{isUpcoming ? <Translate id="home.courses.upcoming.title">即将推出的课程</Translate> : <Translate id="home.courses.popular.title">热门课程</Translate>}</span>
        <Tag circle className="h-6 w-6 bg-gray-200 ml-3">
          {data?.list.length}
        </Tag>
      </div>
      <div className="flex w-full flex-wrap justify-center md:justify-around gap-6 mt-[35px]">
        {isLoading
          ? new Array(3).fill("").map((_, index) => (
              <div
                key={index}
                className="w-full md:w-[300px] h-[276px] border border-solid rounded-md shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="h-[150px] w-full bg-gray-200"></div>
                <div className="w-1/2 h-8 bg-gray-200 mt-6 rounded-full ml-2"></div>
                <div className="w-3/4 h-4 bg-gray-200 mt-6 rounded-full ml-2"></div>
              </div>
            ))
          : ((isTotal ? data?.list : data?.list.slice(0, 6)) || []).map(
              (item) => <CourseCard key={item.id} course={item} />
            )}
        {Array(3 - (data?.list.length % 3) || 0)
          .fill("")
          .map((_, index: number) => (
            <div key={index} className="w-full md:w-[300px] h-0"></div>
          ))}
      </div>
    </div>
  );
};

export default CourseList;
