import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import QuizForm from "@site/src/components/quiz-form";
import { useHistory } from "@docusaurus/router";
import { useQuery, useMutation } from "react-query";
import { getQuizByLessonId, submitQuizGrade } from "@site/src/api/quiz";
import useSearch from "@site/src/hooks/useSearch";
import { IAnswer } from "@site/src/typings/quiz";

function Quiz() {
  const history = useHistory();
  const { params } = useSearch();

  const lessonId =
    params.get("lesson_id") || "8225d76c-f5cb-4398-a7bc-fda7cd8252cb";

  const courseId =
    params.get("course_id") || "4f58676C-4a60-49d3-8ce6-6a36e9b49c2c";

  const { data } = useQuery(["getQuizByLessonId"], () =>
    lessonId ? getQuizByLessonId(lessonId) : null,
  );

  const { mutateAsync } = useMutation(["getQuizByLessonId"], submitQuizGrade);

  const quizId = useMemo(() => {
    return data?.quiz_id || 1;
  }, [data]);

  const onSubmit = async (values: Record<string, string | Array<string>>) => {
    const answers = Object.keys(values).reduce((prev: IAnswer[], next) => {
      const [id] = next.split("@@");
      const answers =
        typeof values[next] === "string" ? [values[next]] : values[next];
      prev.push({ id, answers } as IAnswer);
      return prev;
    }, []);

    mutateAsync({
      lesson_id: lessonId,
      course_id: courseId,
      answers,
      quiz_id: quizId,
    })
      .then(() => {
        history.push("/quiz/score");
      })
      .catch(() => {
        //
      });
  };
  return (
    <Layout>
      <div className="relative">
        <div className="relative mx-auto mt-8 w-[960px] min-h-[1080px]">
          <div className="mb-8">
            <span className="text-content">Solidity 101</span> /
            <span className="text-content">3. Function</span> /
            <span className="opacity-50 text-content">Quiz</span>
          </div>

          <QuizForm quizzes={data?.exercise_list || []} onSubmit={onSubmit} />
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;
