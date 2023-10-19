import { Control, useForm } from "react-hook-form";
import FormProvider from "@site/src/components/hook-form/form-provider";
import React from "react";
import QuizSelect from "@site/src/components/quiz-form/QuizSelect";
import QuizMultipleSelect from "@site/src/components/quiz-form/QuizMultipleSelect";
import QuizInset from "@site/src/components/quiz-form/QuizInset";
import { IQuiz } from "@site/src/typings/quiz";

export type IQuizFormValues = Record<string, string | string[]>;

const QuizBridge = ({
  index,
  quiz,
  control,
}: {
  quiz: IQuiz;
  index: number;
  control: Control<Record<string, string | string[]>, any>;
}) => {
  if (quiz?.meta?.type === "select") {
    return <QuizSelect control={control} name={`select${index}`} quiz={quiz} />;
  }
  if (quiz?.meta?.type === "multiple-select") {
    return (
      <QuizMultipleSelect
        control={control}
        name={`multiple-select${index}`}
        quiz={quiz}
      />
    );
  }
  if (quiz?.meta?.type === "inset") {
    return <QuizInset control={control} name={`inset${index}`} quiz={quiz} />;
  }
  return null;
};

const Preview = ({ quizzes }: { quizzes: IQuiz[] }) => {
  console.log(quizzes);
  const methods = useForm<IQuizFormValues>({
    mode: "onChange",
  });
  return (
    <FormProvider methods={methods}>
      {quizzes.map((quiz, index) => (
        <QuizBridge
          control={methods.control}
          index={index}
          quiz={quiz}
          key={index}
        />
      ))}
    </FormProvider>
  );
};

export default Preview;
