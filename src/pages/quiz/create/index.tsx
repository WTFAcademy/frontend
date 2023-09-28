import Editor from "@site/src/components/editor";
import Layout from "@theme/Layout";
import React, { useState } from "react";
import PreviewForm from "@site/src/components/quiz-form/Preview";
import { IQuiz } from "@site/src/typings/quiz";

const QuizCreate = () => {
  const [quiz, setQuiz] = useState<IQuiz[]>([]);
  const handleChange = (value: IQuiz[]) => {
    setQuiz(value);
  };
  return (
    <Layout
      title={`Hello from`}
      description="Description will go into a meta tag in <head />"
      noFooter
    >
      <div className="flex space-x-2">
        <div className="flex-1 h-full">
          <Editor onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-1">
          <PreviewForm quizzes={quiz} />
        </div>
      </div>
    </Layout>
  );
};

export default QuizCreate;
