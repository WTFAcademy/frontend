import Editor, { IQuizEditorValue } from "@site/src/components/editor";
import Layout from "@theme/Layout";
import React, { useState } from "react";
import PreviewForm from "@site/src/components/quiz-form/Preview";

const QuizCreate = () => {
  const [value, setQuiz] = useState<IQuizEditorValue>();
  return (
    <Layout
      title={`Hello from`}
      description="Description will go into a meta tag in <head />"
      noFooter
    >
      <div className="flex space-x-2">
        <div className="flex-1 h-full">
          <Editor onChange={setQuiz} />
        </div>
        <div className="flex flex-col flex-1">
          <PreviewForm quizzes={value?.quizzes || []} />
        </div>
      </div>
    </Layout>
  );
};

export default QuizCreate;
