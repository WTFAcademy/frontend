import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import QuizForm from "@site/src/components/quiz-form";
import { useHistory } from "@docusaurus/router";
import { useQuery, useMutation } from "react-query";
import { getQuizByLessonId, submitQuizGrade } from "@site/src/api/quiz";
import useSearch from "@site/src/hooks/useSearch";
import { IAnswer } from "@site/src/typings/quiz";
import useCourse from "@site/src/hooks/useCourse";
import Spinner from "@site/src/components/ui/Spinner";

function Quiz() {
  const history = useHistory();
  const { params } = useSearch();

  const lessonId =
    params.get("lesson_id") || "8225d76c-f5cb-4398-a7bc-fda7cd8252cb";

  const courseId =
    params.get("course_id") || "4f58676C-4a60-49d3-8ce6-6a36e9b49c2c";

  const { data, isLoading: isQuizLoading } = useQuery(
    ["getQuizByLessonId", lessonId],
    () => (lessonId ? getQuizByLessonId(lessonId) : null),
  );
  const { courseDetail, isCourseLoading, isLessonsLoading } =
    useCourse(courseId);

  const { mutateAsync } = useMutation(["getQuizByLessonId"], submitQuizGrade);

  const quizId = useMemo(() => {
    return data?.quiz_id || "1";
  }, [data]);

  const onSubmit = async (values: Record<string, string | Array<string>>) => {
    const answers = Object.keys(values).reduce((prev: IAnswer[], next) => {
      const [id] = next.split("@@");
      const answers =
        typeof values[next] === "string" ? [values[next]] : values[next];
      prev.push({ id: Number(id), answers } as any);
      return prev;
    }, []);

    mutateAsync({
      lesson_id: lessonId,
      course_id: courseId,
      answers,
      quiz_id: quizId,
    }).then(res => {
      console.log(res);
      history.push(
        `/quiz/score?score=${res?.score}&error_count=${res?.error_cnt}&course_id=${courseId}`,
      );
    });
  };

  const isLoading = isQuizLoading || isCourseLoading || isLessonsLoading;

  return (
    <Layout>
      <div className="relative">
        <div className="relative mx-auto mt-8 w-[960px] min-h-[1080px]">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <Spinner loading />
            </div>
          ) : (
            <QuizForm
              courseDetail={courseDetail}
              quizzes={data?.exercise_list || []}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;
