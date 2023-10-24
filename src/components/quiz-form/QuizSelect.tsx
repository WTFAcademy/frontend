import { IQuiz } from "@site/src/typings/quiz";
import ReactMarkdown from "react-markdown";
import Image from "@site/src/components/docs/Image";
import { cn } from "@site/src/utils/class-utils";
import React from "react";

const QuizSelect = ({
  quiz,
  value,
  onChange,
  index,
}: {
  quiz: IQuiz;
  value?: string;
  index?: number;
  onChange?: (value: string) => void;
}) => {
  return (
    <div>
      <div className="flex items-center text-xl font-bold">
        {index && <span className="pr-2 font-bold">{index}.</span>}
        <ReactMarkdown children={quiz?.title} />
      </div>
      <div className="my-5">
        {quiz.content.extend.length &&
          quiz.content.extend.map((md, index) => (
            <ReactMarkdown
              components={{ img: Image }}
              key={index}
              children={md.raw}
            />
          ))}
      </div>
      <div>
        {quiz.content.options.map(answer => (
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
              "px-[10px] py-[20px] border border-solid border-black-500 rounded-[4px] mb-[20px] cursor-pointer",
              { "border-green-500 text-green-500": value === answer.value },
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
