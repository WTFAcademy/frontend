import { IExercise } from "@site/src/typings/quiz";
import React, { useState, useMemo } from "react";
import QuizItem from "@site/src/components/quiz-form/QuizItem";
import FormProvider from "../hook-form/form-provider";
import { FieldValues, useForm } from "react-hook-form";
import { cn } from "@site/src/utils/class-utils";
import { buttonVariants } from "@site/src/components/ui/Button";
import { LoaderIcon } from "lucide-react";
import { isEmpty } from "lodash-es";
import { TCourseResponse, TLesson } from "@site/src/typings/course";
import { get } from "lodash-es";

const QuizForm = ({
  courseDetail,
  quizzes = [],
  onSubmit,
}: {
  quizzes: IExercise[];
  courseDetail?: TCourseResponse["course_info"] & { lessons: TLesson[] };
  onSubmit?: (values: FieldValues) => Promise<void>;
}) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const methods = useForm<FieldValues>({
    mode: "onChange",
  });
  const { getValues, formState, control } = methods;
  const prev = () => {
    setQuizIndex(quizIndex - 1 < 0 ? quizIndex : quizIndex - 1);
  };

  const next = async () => {
    const nextIndex = quizIndex + 1;
    if (nextIndex > quizzes.length - 1) {
      setLoading(true);
      Promise.resolve(onSubmit)
        .then(submit => {
          submit?.(getValues());
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setQuizIndex(nextIndex);
    }
  };

  const disabled = useMemo(() => {
    const values = getValues();
    const currentKey = Object.keys(values).find(
      key => key.split("@@")[1] === String(quizIndex),
    );
    return !Object.keys(values).length || isEmpty(values[currentKey]);
  }, [quizIndex, formState.isValidating]);

  const continueText = useMemo(() => {
    return quizIndex < quizzes.length - 1 ? "继续" : "提交";
  }, [quizIndex, quizzes]);

  const courseTitle = useMemo(
    () => get(courseDetail, "course_title", ""),
    [courseDetail],
  );
  const lessonTitle = useMemo(
    () => get(courseDetail, `lessons[${quizIndex}].lesson_title`, ""),
    [quizIndex, courseDetail],
  );

  return (
    <>
      <div className="mb-8">
        <span className="text-content">{courseTitle}</span> /{" "}
        <span className="text-content opacity-50">
          {quizIndex + 1}. {lessonTitle}
        </span>
      </div>

      <FormProvider methods={methods}>
        {quizzes.map((item, index) => (
          <div
            key={`${item?.meta?.type}-${index}`}
            className={cn({ hidden: quizIndex !== index })}
          >
            <QuizItem
              control={control}
              exercise={item}
              index={index + 1}
              name={`${item.meta.id}@@${index}`}
            />
          </div>
        ))}
        <div className="flex justify-end w-full mt-5 mb-12">
          <div
            className={cn(
              "cursor-pointer",
              buttonVariants({ variant: "outline" }),
              {
                "cursor-not-allowed": quizIndex === 0,
              },
            )}
            onClick={() => quizIndex !== 0 && prev()}
          >
            返回上一题
          </div>
          <div
            className={cn(
              "cursor-pointer ml-3",
              buttonVariants({ variant: "default" }),
              { "cursor-not-allowed opacity-50": disabled },
            )}
            onClick={() => !disabled && next()}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : continueText}
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default QuizForm;
