import { Control, useController, UseControllerProps } from "react-hook-form";
import React from "react";
import QuizSelect from "@site/src/components/quiz-form/QuizSelect";
import QuizMultipleSelect from "@site/src/components/quiz-form/QuizMultipleSelect";
import QuizInset from "@site/src/components/quiz-form/QuizInset";
import { IQuiz } from "@site/src/typings/quiz";

const QuizItem = ({
  quiz,
  ...rest
}: {
  quiz: IQuiz;
  control: Control;
} & UseControllerProps) => {
  const { field } = useController(rest);
  const { value = [], onChange } = field;

  if (quiz?.meta?.type === "select") {
    return <QuizSelect value={value} quiz={quiz} onChange={onChange} />;
  }
  if (quiz?.meta?.type === "multiple-select") {
    return <QuizMultipleSelect value={value} quiz={quiz} onChange={onChange} />;
  }
  if (quiz?.meta?.type === "inset") {
    return <QuizInset value={value} quiz={quiz} onChange={onChange} />;
  }
  return null;
};

export default QuizItem;
