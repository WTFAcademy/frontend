import { IExercise } from "@site/src/typings/quiz";
import ReactMarkdown from "react-markdown";
import Image from "@site/src/components/docs/Image";
import { cn } from "@site/src/utils/class-utils";
import React from "react";

const QuizSelect = ({
  quiz,
  value,
  onChange,
}: {
  quiz: IExercise;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="text-content">
      <div className="flex items-center text-xl font-bold">
        {/*{index && <span className="pr-2 font-bold">{index}.</span>}*/}
        <ReactMarkdown children={quiz?.title} />
      </div>
      <div className="my-5">
        {quiz.content?.extend &&
          quiz.content?.extend.length !== 0 &&
          quiz.content?.extend?.map((md, index) => (
            <ReactMarkdown
              components={{ img: Image }}
              key={index}
              children={md.raw}
            />
          ))}
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
                ? "px-4 py-4 rounded-md shadow-sm border border-solid border-blue-600 cursor-pointer bg-blue-600 text-white"
                : "px-4 py-4 bg-bg rounded-md shadow-sm border border-solid border-border-muted cursor-pointer hover:bg-bg-faint",
            )}
          >
            <ReactMarkdown>{`${answer.value}. ${answer.label}`}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSelect;
