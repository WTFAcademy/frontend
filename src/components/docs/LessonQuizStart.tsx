import { TLessonMeta } from "@site/src/typings/doc";
import { useQuery } from "react-query";
import { getLessons } from "@site/src/api/course";
import { Button } from "@site/src/components/ui/Button";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import Link from "@docusaurus/Link";
import useAuth from "@site/src/hooks/useAuth";
import Translate from "@docusaurus/Translate";

type TProps = {
  meta: TLessonMeta;
};
const LessonQuizStart = (props: TProps) => {
  const { meta } = props;
  const { isLogin } = useAuth();

  const { data, isLoading } = useQuery(
    ["course", meta.course_id],
    () => getLessons(meta.course_id),
    {
      enabled: isLogin,
    },
  );

  const isPublished = data?.course?.start_status === 1;

  if (!isLogin || !isPublished) {
    return <></>;
  }

  return (
    <Link to={`/quiz?course_id=${meta.course_id}&lesson_id=${meta.lesson_id}`}>
      <Button size="sm">
        <span>
          <Translate id="docs.101.LessonQuizStart.button">
            开始测试 Beta
          </Translate>
        </span>
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </Link>
  );
};

export default LessonQuizStart;
