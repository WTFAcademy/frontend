import React from "react";
import {useQuery} from "react-query";
import {getLesson} from "@site/src/api/course";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {TLessonMeta} from "@site/src/typings/doc";
import Translate from "@docusaurus/core/lib/client/exports/Translate";
import {get} from "lodash-es";

type TProps = {
    meta: TLessonMeta;
}

const LessonProcess = (props: TProps) => {
    const { meta} = props;
    const { i18n } = useDocusaurusContext();

    const {data, isLoading} = useQuery(["lesson", meta.course_id, meta.lesson_id], () => getLesson(meta.course_id, meta.lesson_id));

    return (
        <div className="flex gap-2">
            <div className="px-2 py-2 bg-gray-200 rounded-md text-xs text-primary font-bold">
                <Translate id="component.QuizProgress.time">Time: </Translate>
                {i18n.currentLocale === 'zh' ? get(data, 'estimated_time') : get(data, 'estimated_time')?.replace('分钟', ' minutes')}
            </div>
            <div className="px-2 py-2 bg-gray-200 rounded-md text-xs text-primary font-bold">
                <Translate id="component.QuizProgress.score">Best Score: </Translate>
                {get(data, 'score_percent')}
            </div>
        </div>
    )
}

export default LessonProcess;
