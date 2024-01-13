import React from "react";
import { useQuery } from "react-query";
import Tag from "@site/src/components/ui/Tag";
import { Skeleton } from "@site/src/components/ui/Skeleton";
import { getCourses } from "@site/src/api/course";
import { TCourse } from "../typings/course";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

type TProps = {
  course: TCourse;
};

const CourseCard = (props: TProps) => {
  const { course } = props;

  return (
    <Link
      to={`/${course.route_path}`}
      className="hover:no-underline hover:text-gray-900"
    >
      <div className="w-full overflow-hidden border border-solid md:w-[300px] rounded-md shadow-sm transition-shadow hover:shadow-lg">
        <div className="w-full bg-background-subtle h-[150px]">
          <img
            src={course.cover_img}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between font-bold text-[22px] leading-[25px] font-ubuntu">
            <span>{course.title}</span>
          </div>
          <div className="text-sm leading-[17px] mt-[10px]">
            {course.description}
          </div>
          {Boolean(course.user_cnt) && (
            <div className="flex gap-2 mt-[14px]">
              <Tag className="bg-brand-muted">{`${course.user_cnt} learners`}</Tag>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const CourseList = ({
  isTotal = true,
  isUpcoming,
}: {
  isTotal?: boolean;
  isUpcoming: boolean;
}) => {
  const { i18n } = useDocusaurusContext();

  const { data, isLoading } = useQuery(
    ["getCourses", isUpcoming, i18n.currentLocale],
    () =>
      getCourses(
        isUpcoming ? 2 : 1,
        i18n.currentLocale === "en" ? "en" : undefined,
      ),
  );

  return (
    <div
      className={[
        "w-full flex flex-col items-center",
        isUpcoming ? "mt-8" : "",
      ].join(" ")}
    >
      <div className="w-full font-bold font-ubuntu">
        <span>
          {isUpcoming ? (
            <Translate id="home.courses.upcoming.title">
              即将推出的课程
            </Translate>
          ) : (
            <Translate id="home.courses.popular.title">热门课程</Translate>
          )}
        </span>
        <Tag circle className="w-6 h-6 ml-3 bg-background-muted">
          {data?.list.length ?? 0}
        </Tag>
      </div>
      <div className="flex flex-wrap justify-center md:justify-around gap-6 mt-[35px]">
        {isLoading ? (
          <>
            {new Array(3).fill("").map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[276px] md:w-[300px] rounded-md shadow-sm transition-shadow hover:shadow-lg"
              >
                <Skeleton className="w-full bg-gray-200 h-[150px]" />
                <Skeleton className="w-1/2 h-10 mx-4 mt-4 bg-gray-200" />
                <Skeleton className="w-3/4 h-6 mx-4 mt-4 bg-gray-200" />
              </Skeleton>
            ))}
          </>
        ) : (
          ((isTotal ? data?.list : data?.list.slice(0, 6)) || []).map(item => (
            <CourseCard key={item.id} course={item} />
          ))
        )}
        {Array(3 - (data?.list.length % 3) || 0)
          .fill("")
          .map((_, index: number) => (
            <div key={index} className="w-full h-0 md:w-[300px]"></div>
          ))}
      </div>
    </div>
  );
};

export default CourseList;
