import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import { Button } from "@site/src/components/ui/Button";
import Link from "@docusaurus/Link";
import Confettiful from "@site/src/components/Confettiful";
import useSearch from "@site/src/hooks/useSearch";
import { useHistory } from "@docusaurus/router";
import useCourse from "@site/src/hooks/useCourse";
import { get } from "lodash-es";
import Spinner from "@site/src/components/ui/Spinner";
import Translate from "@docusaurus/Translate";
import usePath from "@site/src/hooks/usePath";

function QuizScore() {
  const { params } = useSearch();
  const history = useHistory();
  const score = Number(params.get("score")) || 0;
  const errorCount = Number(params.get("error_count")) || 0;
  const courseId = params.get("course_id") || "";
  const { courseDetail, isCourseLoading } = useCourse(courseId);
  const { generateDocPath } = usePath();

  const handleTryAgain = () => {
    history.goBack();
  };

  const courseTitle = useMemo(
    () => get(courseDetail, "course_title", ""),
    [courseDetail],
  );

  const routePath = useMemo(
    () => generateDocPath(get(courseDetail, "course.route_path", "")),
    [courseDetail],
  );

  return (
    <Layout noFooter>
      <div className="relative">
        {score == 100 && <Confettiful />}
        <div className="relative mx-auto mt-8 max-sm:w-full max-sm:min-h-[auto] max-sm:px-4 w-[960px]">
          <div className="mb-8">
            <span className="text-content inline-flex items-center">
              <Spinner loading={isCourseLoading} />
              {courseTitle}
            </span>{" "}
            /{" "}
            <span className="opacity-50 text-content">
              <Translate id="quiz.score.result.title">结果</Translate>
            </span>
          </div>
          {score == 100 ? (
            <div>
              <div className="text-center mb-[42px]">
                <p className="text-[64px]">🎉</p>
                <p className="mt-4 text-sm font-normal text-content">
                  <Translate id="quiz.score.pageContent.title">
                    恭喜您完成本次测验。
                  </Translate>
                </p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-medium text-center text-content">
                  <Translate id="quiz.score.scoreContent.title">
                    本次得分
                  </Translate>
                </p>
              </div>

              <div className="flex items-center justify-center px-6 py-2 mx-auto border border-green-200 border-solid rounded-sm w-[150px] h-[100px] box-content bg-green-50 dark:bg-green-950 dark:border-green-800">
                <p className="font-bold leading-none text-center text-green-500 text-[80px]">
                  {score}
                </p>
              </div>

              <div className="flex justify-center w-full mb-12 mt-14">
                <Link to={routePath}>
                  <Button className="ml-3">
                    <Translate id="quiz.score.endanswer.button">
                      结束答题
                    </Translate>
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-[42px]">
                <p className="text-[64px]">🚧</p>
                <p className="mt-4 text-sm font-normal text-content">
                  <Translate id="quiz.score.errorContent.intro01">
                    本次有
                  </Translate>{" "}
                  <span className="text-lg font-bold">{errorCount}</span>
                  <Translate id="quiz.score.errorContent.intro01">
                    道错误答案
                  </Translate>
                </p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-medium text-center text-content">
                  <Translate id="quiz.score.scoreContent.title">
                    本次得分
                  </Translate>
                </p>
              </div>

              <div className="flex items-center justify-center px-6 py-2 mx-auto border border-blue-200 border-solid rounded-sm w-[150px] h-[100px] box-content bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <p className="font-bold leading-none text-center text-blue-600 text-[80px] dark:text-blue-400">
                  {score}
                </p>
              </div>

              <div className="flex justify-center w-full mb-12 mt-14">
                {/* <Link to="/quiz/score"> */}
                <Button variant="outline" onClick={handleTryAgain}>
                  <Translate id="quiz.score.againanswer.button">
                    再做一轮
                  </Translate>
                </Button>
                {/* </Link> */}
                <Link to={routePath}>
                  <Button className="ml-3">
                    <Translate id="quiz.score.endanswer.button">
                      结束答题
                    </Translate>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default QuizScore;
