import React from "react";
import Layout from "@theme/Layout";
import QuizForm from "@site/src/components/quiz-form";
import { IExercise } from "@site/src/typings/quiz";
import { useHistory } from "@docusaurus/router";
import { DEFAULT_QUIZ } from "@site/src/pages/quiz/create/demo";
import { useQuery, useMutation } from "react-query";
import { getQuizByLessonId, submitQuizGrade } from "@site/src/api/quiz";
import useSearch from "@site/src/hooks/useSearch";

function Quiz() {
  const history = useHistory();
  const { params } = useSearch();

  const id = params.get("lesson_id");
  console.log(id);
  const { data } = useQuery(["getQuizByLessonId"], () =>
    id ? getQuizByLessonId(params.get("lesson_id")) : null,
  );

  const { data: grades, mutateAsync } = useMutation(
    ["getQuizByLessonId"],
    submitQuizGrade,
  );

  const onSubmit = async (values: any) => {
    mutateAsync(values)
      .then(() => {
        history.push("/quiz/score");
      })
      .catch(() => {
        //
      });
  };
  console.log(data, grades);
  return (
    <Layout>
      <div className="relative">
        <div className="relative mx-auto mt-8 w-[960px] min-h-[1080px]">
          <div className="mb-8">
            <span className="text-content">Solidity 101</span> /
            <span className="text-content">3. Function</span> /
            <span className="opacity-50 text-content">Quiz</span>
          </div>

          <QuizForm
            quizzes={
              DEFAULT_QUIZ.exercises.filter(
                item => !!item?.meta?.type,
              ) as IExercise[]
            }
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;
