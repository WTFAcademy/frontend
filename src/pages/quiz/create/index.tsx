import { IQuizEditorValue } from "@site/src/components/editor";
import Layout from "@theme/Layout";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FormProvider from "@site/src/components/hook-form/form-provider";
import QuizEditor from "@site/src/components/quiz-form/QuizEditor";
import QuizItem from "@site/src/components/quiz-form/QuizItem";
import { DEFAULT_VALUE } from "@site/src/pages/quiz/create/demo";
import EditorTabs from "@site/src/pages/quiz/create/EditorTabs";
import { Button } from "@site/src/components/ui/Button";

const QuizCreate = () => {
  const [quiz, setQuiz] = useState<IQuizEditorValue>();
  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      quiz: DEFAULT_VALUE,
    },
  });

  return (
    <Layout
      title={`Hello from`}
      description="Description will go into a meta tag in <head />"
    >
      <FormProvider
        methods={methods}
        onSubmit={() => {
          console.log(123);
        }}
      >
        <div className="flex space-x-2 p-[20px]">
          <div className="flex-1 h-full overflow-x-auto w-max-[50%]">
            <EditorTabs />
            <QuizEditor name="quiz" onQuizChange={setQuiz} />
          </div>
          <div className="flex-1 overflow-y-auto h-[85vh] p-[20px]">
            {(quiz?.content || []).map((item, index) => (
              <QuizItem
                key={`${item.type}-${index}`}
                control={methods.control}
                quiz={item}
                name={`${item.type}-preview-${index}`}
              />
            ))}
          </div>
          <div>
            <Button> 发布</Button>
          </div>
        </div>
      </FormProvider>
    </Layout>
  );
};

export default QuizCreate;
