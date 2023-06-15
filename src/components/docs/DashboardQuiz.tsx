import React from "react";
import {TLesson} from "@site/src/typings/course";
import {Button} from "../ui/Button";
import {ShortArrowRight} from "@site/src/icons";

type TProps = {
    courseId: string;
}

const LessonItem = ({lesson}: { lesson?: TLesson }) => {
    return (
        <div className="border-[0.5px] shadow rounded-md px-5 py-[18px] flex items-center justify-between">
            <div>Tutorial Intro</div>
            <div className="flex items-center">
                <div className="inline-flex items-center mr-5">
                    <span className="text-[#626770] mr-2">Progress{" "}</span>
                    <span className="text-primary font-bold">100%</span>
                </div>
                <div className="inline-flex items-center">
                    <span className="text-[#626770] mr-2">Status{" "}</span>
                    <span className="text-primary font-bold">Complete</span>
                </div>
            </div>
        </div>
    )
}

const DashboardQuiz = (props: TProps) => {
    const {courseId} = props;

    return (
        <div className="w-full mt-[60px]">
            <h4>课程学习进度</h4>
            <div className="flex flex-col gap-[14px] mt-7">
                <LessonItem/>
                <LessonItem/>
                <LessonItem/>
                <LessonItem/>
            </div>
            <p className="mt-7">When you have completed all the courses, please click the button below to get the certificate.</p>
            <Button className="mt-4">Mint Certificate <ShortArrowRight className="ml-2" /></Button>
        </div>
    )
}

export default DashboardQuiz;
