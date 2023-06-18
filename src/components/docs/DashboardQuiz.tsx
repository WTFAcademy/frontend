import React from "react";
import {TLesson} from "@site/src/typings/course";
import {Button} from "../ui/Button";
import {ShortArrowRight} from "@site/src/icons";
import {useQuery} from "react-query";
import {getLessons} from "@site/src/api/course";

import {cn} from "@site/src/utils/class-utils";
import {TCourseMeta} from "@site/src/typings/doc";

type TProps = {
    meta: TCourseMeta;
}

const LessonItem = ({lesson}: { lesson: TLesson }) => {
    return (
        <div className="relative border-[0.5px] shadow rounded-md h-[57px]">
            <div className="bg-primary-darker h-full" style={{width: `${lesson.score_percent}%`}}/>

            <div className="flex items-center justify-between absolute inset-0 px-5 py-[18px]">
                <div>{lesson.lesson_title}</div>
                <div className="flex items-center">
                    <div className="inline-flex items-center mr-5">
                        <span className="text-[#626770] mr-2">Progress{" "}</span>
                        <span className="text-primary font-bold">{lesson.score_percent}%</span>
                    </div>
                    <div className="inline-flex items-center">
                        <span className="text-[#626770] mr-2">Status{" "}</span>
                        <span
                            className={cn("text-[#626770] font-bold", {"text-primary": lesson.is_finish})}>{lesson.is_finish ? "Complete" : "Pending"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DashboardQuiz = (props: TProps) => {
    const {meta} = props;
    const courseId = meta.course_id;

    const {data: lessons, isLoading} = useQuery(["course", courseId], () => getLessons(courseId));

    return (
        <div className="w-full mt-[60px]">
            <h4>课程学习进度</h4>
            <div className="flex flex-col gap-[14px] mt-7">
                {lessons?.map(lesson => (
                    <LessonItem key={lesson.lesson_id} lesson={lesson}/>
                ))}
            </div>
            <p className="mt-7">When you have completed all the courses, please click the button below to get the
                certificate.</p>
            <Button className="mt-4">Mint Certificate <ShortArrowRight className="ml-2"/></Button>
        </div>
    )
}

export default DashboardQuiz;
