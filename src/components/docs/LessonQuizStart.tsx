import {TLessonMeta} from "@site/src/typings/doc";
import {useQuery} from "react-query";
import {getLesson} from "@site/src/api/course";
import {Button} from "@site/src/components/ui/Button";
import {ArrowRightIcon} from "lucide-react";
import React from "react";
import Link from "@docusaurus/Link";
import {get} from "lodash-es";
import useAuth from "@site/src/hooks/useAuth";


type TProps = {
    meta: TLessonMeta;
}
const LessonQuizStart = (props: TProps) => {
    const {meta} = props;
    const {isLogin} = useAuth();
    const {data} = useQuery(["lesson", meta.course_id, meta.lesson_id], () => getLesson(meta.course_id, meta.lesson_id));

    if (!isLogin) {
        return <></>
    }

    return (
        <Link to={get(data, 'viewform_url', '')}>
            <Button size="sm">
                <span>Start Quiz</span>
                <ArrowRightIcon className="w-4 h-4 ml-2"/>
            </Button>
        </Link>
    )
}

export default LessonQuizStart;
