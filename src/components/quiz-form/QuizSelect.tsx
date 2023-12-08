import { IExercise } from "@site/src/typings/quiz";
import { cn } from "@site/src/utils/class-utils";
import React, { useMemo } from "react";
import Markdown from "@site/src/components/Markdown";

interface IProps {
  quiz: IExercise;
  value?: string;
  onChange?: (value: string) => void;
}

const QuizSelect = ({ quiz, value, onChange }: IProps) => {
  const extendRaw = useMemo(() => {
    const raws = quiz.content?.extend?.map(md => md.raw) || [];
    return raws.join("\n");
  }, [quiz.content]);

  return (
    <div className="text-content">
      <div className="flex items-center text-xl font-bold">
        <Markdown raw={quiz?.title} />
      </div>
      <div className="my-5">
        <Markdown raw={extendRaw} />
      </div>
      <div className="mb-4">
        <span className="text-xs opacity-50 text-content">选择一个答案</span>
      </div>
      <div>
        {quiz.content?.options?.map(answer => (
          <div
            key={answer.value}
            onClick={() => {
              if (value !== answer.value) {
                onChange(answer.value);
              } else {
                onChange("");
              }
            }}
            className={cn(
              "mb-2",
              value.includes(answer.value)
                ? "px-4 py-4 rounded-md shadow-sm border border-solid border-blue-600 cursor-pointer bg-blue-600"
                : "px-4 py-4 bg-bg rounded-md shadow-sm border border-solid border-border-muted cursor-pointer hover:bg-bg-faint",
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

export default QuizSelect;
