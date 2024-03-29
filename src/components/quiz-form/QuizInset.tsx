import { IExercise } from "@site/src/typings/quiz";
import { cn } from "@site/src/utils/class-utils";
import React, { useMemo } from "react";
import Markdown from "@site/src/components/Markdown";

// const REPLACEMENT_INSET = "<<!!>>";
const QuizInset = ({
  quiz,
  value,
  onChange,
}: {
  quiz: IExercise;
  value?: string[];
  onChange?: (value: string[]) => void;
}) => {
  const extend = useMemo(() => {
    return (value as string[]).reduce(
      (prev, next) =>
        prev.map(md => ({
          ...md,
          raw: md.raw.replace(
            "_____",
            quiz.content?.options?.find(option => option.value === next).label,
          ),
        })),
      quiz.content?.extend?.map(md => ({
        ...md,
        raw: md.raw.replace(/<<!!>>/g, "_____"),
      })),
    );
  }, [quiz.content?.extend, value]);

  return (
    <div className="text-content">
      <div className="flex items-center text-xl font-bold">
        <Markdown raw={quiz?.title} />
      </div>
      <div className="my-5 flex flex-col gap-2">
        {extend.map((md, index) => (
          <Markdown key={index} raw={md.raw} />
        ))}
      </div>
      <div className="mb-4">
        <span className="text-xs opacity-50 text-content">Choose answers</span>
      </div>
      <div className="flex flex-wrap items-center px-5 pt-4 mb-2 border border-solid pb-2.5 border-black-500">
        {quiz.content?.options?.map(answer => (
          <div
            key={answer.value}
            onClick={() => {
              if (!value.includes(answer.value)) {
                onChange([...(value as string[]), answer.value]);
              } else {
                onChange((value as string[]).filter(v => v !== answer.value));
              }
            }}
            className={cn(
              "h-10 mr-2 flex  items-center mb-1.5 ",
              value.includes(answer.value)
                ? "px-4 py-1 rounded-md shadow-sm border border-solid border-blue-600 cursor-pointer bg-blue-600"
                : "px-4 py-1 bg-bg rounded-md shadow-sm border border-solid border-border-muted cursor-pointer hover:bg-bg-faint",
            )}
          >
            <Markdown
              selectedClassName={value.includes(answer.value) && "text-white"}
              raw={`${answer.value}. ${answer.label}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizInset;
