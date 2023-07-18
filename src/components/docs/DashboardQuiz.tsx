import React from "react";
import {TLesson} from "@site/src/typings/course";
import {Button} from "../ui/Button";
import {ShortArrowRight} from "@site/src/icons";
import {useQuery} from "react-query";
import {getLessons} from "@site/src/api/course";

import {cn} from "@site/src/utils/class-utils";
import {TCourseMeta} from "@site/src/typings/doc";
import useAuth from "@site/src/hooks/useAuth";
import {Skeleton} from "@site/src/components/ui/Skeleton";
import {ArrowRightIcon} from "lucide-react";
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type TProps = {
    meta: TCourseMeta;
}

const LessonItem = ({lesson}: { lesson: TLesson }) => {
    const {isLogin} = useAuth();
    const { i18n } = useDocusaurusContext();

    return (
        <div className="relative border-[0.5px] shadow rounded-md h-[57px]">
            <div className="bg-primary-darker h-full" style={{width: `${lesson.score_percent}%`}}/>
            <div className="flex items-center justify-between absolute inset-0 px-5 py-[18px] text-sm md:text-base">
                <div>{ i18n.currentLocale === 'zh' ? lesson.lesson_title : lesson.en_title}</div>
                {isLogin ? (
                    <>
                        <div className="flex items-center gap-2 md:hidden">
                            <span className="text-primary font-bold">{lesson.score_percent}%</span>
                            <div className="w-px h-[16px] bg-gray-300"/>
                            <span
                                className={cn("text-[#626770] font-bold", {"text-primary": lesson.is_finish})}>{lesson.is_finish ? <Translate id="docs.101.DashboardQuiz.LessonItem.complete">完成</Translate> : <Translate id="docs.101.DashboardQuiz.LessonItem.pending">进行中</Translate>}</span>
                        </div>
                        <div className="items-center hidden md:flex">
                            <div className="inline-flex items-center mr-5">
                                <span className="text-[#626770] mr-2"><Translate id="docs.101.DashboardQuiz.LessonItem.progress">进度</Translate>{" "}</span>
                                <span className="text-primary font-bold">{lesson.score_percent}%</span>
                            </div>
                            <div className="inline-flex items-center">
                                <span className="text-[#626770] mr-2"><Translate id="docs.101.DashboardQuiz.LessonItem.status">状态</Translate>{" "}</span>
                                <span
                                    className={cn("text-[#626770] font-bold", {"text-primary": lesson.is_finish})}>{lesson.is_finish ? <Translate id="docs.101.DashboardQuiz.LessonItem.complete">完成</Translate> : <Translate id="docs.101.DashboardQuiz.LessonItem.pending">进行中</Translate>}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <a className="mr-2 text-sm cursor-pointer"><Translate id="docs.101.DashboardQuiz.LessonItem.loginLink">去登录</Translate></a>
                )}
            </div>
        </div>
    )
}

const DashboardQuiz = (props: TProps) => {
    const {meta} = props;
    const courseId = meta.course_id;
    const {isLogin} = useAuth();

    const {data: lessons, isLoading} = useQuery(["course", courseId], () => getLessons(courseId));

    return (
        <div className="w-full mt-[60px]">
            <h4><Translate id="docs.101.DashboardQuiz.title">学习进度</Translate></h4>
            <div className="flex flex-col gap-[14px] mt-7">
                {isLoading ? (
                    <>
                        <Skeleton className="h-[57px] w-full flex justify-between items-center px-5">
                            <Skeleton className="h-4 w-[150px] bg-gray-200"/>
                            <Skeleton className="h-4 w-[100px] bg-gray-200"/>
                        </Skeleton>
                        <Skeleton className="h-[57px] w-full flex justify-between items-center px-5">
                            <Skeleton className="h-4 w-[150px] bg-gray-200"/>
                            <Skeleton className="h-4 w-[100px] bg-gray-200"/>
                        </Skeleton>
                        <Skeleton className="h-[57px] w-full flex justify-between items-center px-5">
                            <Skeleton className="h-4 w-[150px] bg-gray-200"/>
                            <Skeleton className="h-4 w-[100px] bg-gray-200"/>
                        </Skeleton>
                    </>
                ) : (
                    <>
                        {lessons?.map(lesson => (
                            <LessonItem key={lesson.lesson_id} lesson={lesson}/>
                        ))}
                    </>
                )}
            </div>
            {isLogin && (
                <>
                    <p className="mt-7"><Translate id="docs.101.DashboardQuiz.mintTips">当您通过全部考试后，点击按钮获取链上技术认证。</Translate></p>
                    <Button className="mt-4"><Translate id="docs.101.DashboardQuiz.mintButton">领取证书</Translate> <ArrowRightIcon className="w-4 h-4 ml-2"/></Button>
                </>
            )}
        </div>
    )
}

export default DashboardQuiz;
