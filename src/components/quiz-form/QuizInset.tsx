import { IQuiz } from "@site/src/typings/quiz";
import ReactMarkdown from "react-markdown";
import { cn } from "@site/src/utils/class-utils";
import React, { useMemo } from "react";

const REPLACEMENT_INSET = "<<!!>>";
const QuizInset = ({
  quiz,
  value,
  index,
  onChange,
}: {
  quiz: IQuiz;
  index?: number;
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
            quiz.content.options.find(option => option.value === next).label,
          ),
        })),
      quiz.content.extend.map(md => ({
        ...md,
        raw: md.raw.replace(/<<!!>>/g, "_____"),
      })),
    );
  }, [quiz.content.extend, value]);

  return (
    <div>
      <div className="flex items-center text-xl font-bold">
        {index && <span className="pr-2 font-bold">{index}.</span>}
        <ReactMarkdown children={quiz?.title} />
      </div>
      <div className="my-5">
        {extend.map((md, index) => (
          <ReactMarkdown key={index} children={md.raw} />
        ))}
      </div>
      <div className="flex flex-wrap border border-solid px-[10px] py-[20px] border-black-500 min-h-[100px]">
        {quiz.content.options.map(answer => (
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
              "border flex items-center px-[10px] mx-[10px] border-solid border-black-500 rounded-[4px] mb-[20px] cursor-pointer",
              {
                "border-green-500 text-green-500": value.includes(answer.value),
              },
            )}
          >
            {`${answer.value}. ${answer.label}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizInset;
