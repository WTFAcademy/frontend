import React from "react";
import Layout from "@theme/Layout";
import QuizForm from "@site/src/components/quiz-form";
import { IExercise } from "@site/src/typings/quiz";
import { useHistory } from "@docusaurus/router";
import { DEFAULT_QUIZ } from "@site/src/pages/quiz/create/demo";

function Quiz() {
  const history = useHistory();
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
            onSubmit={values => {
              console.log(values);
              // navigate to score
              history.push("/quiz/score");
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;
