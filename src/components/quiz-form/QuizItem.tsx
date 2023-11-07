import { Control, useController, UseControllerProps } from "react-hook-form";
import React from "react";
import QuizSelect from "@site/src/components/quiz-form/QuizSelect";
import QuizMultipleSelect from "@site/src/components/quiz-form/QuizMultipleSelect";
import QuizInset from "@site/src/components/quiz-form/QuizInset";
import { IExercise } from "@site/src/typings/quiz";

const QuizItem = ({
  exercise,
  index,
  ...rest
}: {
  exercise: IExercise;
  index?: number;
  control: Control;
} & UseControllerProps) => {
  const { field } = useController(rest);
  const { value = [], onChange } = field;

  if (exercise?.meta?.type === "select") {
    return (
      <QuizSelect
        value={value}
        quiz={exercise}
        onChange={onChange}
        index={exercise?.meta?.index || index}
      />
    );
  }
  if (exercise?.meta?.type === "multiple-select") {
    return (
      <QuizMultipleSelect
        value={value}
        quiz={exercise}
        onChange={onChange}
        index={exercise?.meta?.index || index}
      />
    );
  }
  if (exercise?.meta?.type === "inset") {
    return (
      <QuizInset
        value={value}
        quiz={exercise}
        onChange={onChange}
        index={exercise?.meta?.index || index}
      />
    );
  }
  return null;
};

export default QuizItem;
