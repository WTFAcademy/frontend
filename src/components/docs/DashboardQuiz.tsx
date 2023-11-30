import React, { useMemo } from "react";
import { TCourse, TLesson } from "@site/src/typings/course";
import { Button } from "../ui/Button";
import { useQuery } from "react-query";
import { getLessons } from "@site/src/api/course";

import { cn } from "@site/src/utils/class-utils";
import { TCourseMeta } from "@site/src/typings/doc";
import useAuth from "@site/src/hooks/useAuth";
import { Skeleton } from "@site/src/components/ui/Skeleton";
import { ArrowRightIcon } from "lucide-react";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import { ECourseRole } from "@site/src/constants/quiz";
import useCourseRole from "@site/src/hooks/useCourseRole";

type TProps = {
  meta: TCourseMeta;
};

const Empty = () => (
  <>
    <Skeleton className="h-[57px] w-full flex justify-between items-center px-5">
      <Skeleton className="h-4 w-[150px] bg-gray-200" />
      <Skeleton className="h-4 w-[100px] bg-gray-200" />
    </Skeleton>
    <Skeleton className="h-[57px] w-full flex justify-between items-center px-5">
      <Skeleton className="h-4 w-[150px] bg-gray-200" />
      <Skeleton className="h-4 w-[100px] bg-gray-200" />
    </Skeleton>
    <Skeleton className="h-[57px] w-full flex justify-between items-center px-5">
      <Skeleton className="h-4 w-[150px] bg-gray-200" />
      <Skeleton className="h-4 w-[100px] bg-gray-200" />
    </Skeleton>
  </>
);

const LessonItem = ({
  lesson,
  role,
  cursor_id,
}: {
  lesson: TLesson;
  role: string;
  cursor_id: string;
}) => {
  const { isLogin } = useAuth();
  const { i18n } = useDocusaurusContext();
  const history = useHistory();

  const goEditorQuiz = (
    event: React.MouseEvent,
    lesson_id: string,
    course_id: string,
  ) => {
    event.preventDefault();
    history.push(`/quiz/create/?lessonId=${lesson_id}&courseId=${course_id}`);
  };

  const isReviewed = Number(lesson.quiz_id) > 0;

  return (
    <Link to={lesson.route_path}>
      <div className="relative border-[0.5px] shadow rounded-md h-[57px] overflow-hidden">
        <div
          className="bg-brand-faint h-full"
          style={{ width: `${lesson.score_percent}%` }}
        />
        <div className="flex items-center justify-between absolute inset-0 px-5 py-[18px] text-sm md:text-base">
          <div className="text-content">
            {i18n.currentLocale === "zh"
              ? lesson.lesson_title
              : lesson.en_title}
          </div>
          {isLogin ? (
            <>
              <div className="flex items-center gap-2 md:hidden">
                <span className="text-primary font-bold">
                  {lesson.score_percent}%
                </span>
                <div className="w-px h-[16px] bg-gray-300"></div>
                <span
                  className={cn("text-[#626770] font-bold", {
                    "text-primary": lesson.is_finish,
                  })}
                >
                  {lesson.is_finish ? (
                    <Translate id="docs.101.DashboardQuiz.LessonItem.complete">
                      完成
                    </Translate>
                  ) : (
                    <Translate id="docs.101.DashboardQuiz.LessonItem.pending">
                      进行中
                    </Translate>
                  )}
                </span>
              </div>
              <div className="items-center hidden md:flex">
                <div className="mr-3">
                  {role && role !== ECourseRole.USER && (
                    <div className="inline-flex items-center gap-2">
                      {isReviewed && (
                        <span className="text-content-muted text-xs">
                          已审核
                        </span>
                      )}
                      <span
                        className="mr-2 text-primary"
                        onClick={event =>
                          goEditorQuiz(event, lesson.lesson_id, cursor_id)
                        }
                      >
                        {role === ECourseRole.EDITOR && "去出题"}
                        {role === ECourseRole.REVIEWER && "审核"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="inline-flex items-center mr-5">
                  <span className="text-[#626770] mr-2">
                    <Translate id="docs.101.DashboardQuiz.LessonItem.progress">
                      进度
                    </Translate>{" "}
                  </span>
                  <span className="text-primary font-bold">
                    {lesson.score_percent}%
                  </span>
                </div>
                <div className="inline-flex items-center">
                  <span className="text-[#626770] mr-2">
                    <Translate id="docs.101.DashboardQuiz.LessonItem.status">
                      状态
                    </Translate>{" "}
                  </span>
                  <span
                    className={cn("text-[#626770] font-bold", {
                      "text-primary": lesson.is_finish,
                    })}
                  >
                    {lesson.is_finish ? (
                      <Translate id="docs.101.DashboardQuiz.LessonItem.complete">
                        完成
                      </Translate>
                    ) : (
                      <Translate id="docs.101.DashboardQuiz.LessonItem.pending">
                        进行中
                      </Translate>
                    )}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <a className="mr-2 text-sm cursor-pointer">
              <Translate id="docs.101.DashboardQuiz.LessonItem.loginLink">
                去登录
              </Translate>
            </a>
          )}
        </div>
      </div>
    </Link>
  );
};

const DashboardQuiz = (props: TProps) => {
  const { meta } = props;
  const courseId = meta.course_id;
  const { isLogin } = useAuth();
  const history = useHistory();
  const { i18n } = useDocusaurusContext();

  const { role } = useCourseRole(courseId);

  const { data, isLoading } = useQuery(
    ["course", courseId],
    () => getLessons(courseId),
    { enabled: courseId && isLogin },
  );

  const lessons = data?.list || [];

  const handleGraduate = () => {
    i18n.currentLocale === "zh"
      ? history.push(`/certificate?cid=${courseId}`)
      : history.push(`/en/certificate?cid=${courseId}`);
  };

  return (
    <div className="w-full mt-[60px]">
      <div className="flex items-center justify-between">
        <h4>
          <Translate id="docs.101.DashboardQuiz.title">学习进度</Translate>
        </h4>
      </div>
      <div className="flex flex-col gap-[14px] mt-7">
        {isLoading ? (
          <Empty />
        ) : (
          <>
            {lessons?.map(lesson => (
              <LessonItem
                key={lesson.lesson_id}
                lesson={lesson}
                role={role}
                cursor_id={courseId}
              />
            ))}
          </>
        )}
      </div>
      {isLogin && (
        <>
          <p className="mt-7">
            <Translate id="docs.101.DashboardQuiz.mintTips">
              当您通过全部考试后，点击按钮获取链上技术认证。
            </Translate>
          </p>
          <Button className="mt-4" onClick={handleGraduate}>
            <Translate id="docs.101.DashboardQuiz.mintButton">
              领取证书
            </Translate>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </>
      )}
    </div>
  );
};

export default DashboardQuiz;
