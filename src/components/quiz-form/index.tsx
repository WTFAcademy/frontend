import { IQuiz } from "@site/src/typings/quiz";
import React, { useState } from "react";
import QuizItem from "@site/src/components/quiz-form/QuizItem";
import FormProvider from "../hook-form/form-provider";
import { FieldValues, useForm } from "react-hook-form";
import { cn } from "@site/src/utils/class-utils";
import { buttonVariants } from "@site/src/components/ui/Button";

const QuizForm = ({
  quizzes = [],
  onSubmit,
}: {
  quizzes: IQuiz[];
  onSubmit?: (values: FieldValues) => void;
}) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const methods = useForm<FieldValues>({
    mode: "onChange",
  });
  const prev = () => {
    setQuizIndex(quizIndex - 1 < 0 ? quizIndex : quizIndex - 1);
  };

  const next = () => {
    const nextIndex = quizIndex + 1;
    if (nextIndex > quizzes.length - 1) {
      //TODO 1. validate form values.
      //TODO 2. disabled button if need.
      onSubmit?.(methods.getValues());
    } else {
      setQuizIndex(nextIndex);
    }
  };
  return (
    <FormProvider methods={methods}>
      {quizzes.map((item, index) => (
        <div
          key={`${item?.meta?.type}-${index}`}
          className={cn({ hidden: quizIndex !== index })}
        >
          <QuizItem
            control={methods.control}
            quiz={item}
            index={index + 1}
            name={`${item.meta.type}-preview-${index}`}
          />
        </div>
      ))}
      <div className="flex justify-end w-full mt-5 mb-12">
        <div
          className={cn(
            "cursor-pointer",
            buttonVariants({ variant: "outline" }),
          )}
          onClick={prev}
        >
          Back
        </div>
        <div
          className={cn(
            "cursor-pointer ml-3",
            buttonVariants({ variant: "default" }),
          )}
          onClick={next}
        >
          Continue
        </div>
      </div>
    </FormProvider>
  );
};

export default QuizForm;
