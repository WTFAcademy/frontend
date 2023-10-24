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
      wrapperClassName="p-5"
      noFooter
    >
      <EditorTabs />
      <FormProvider
        methods={methods}
        onSubmit={() => {
          console.log(123);
        }}
      >
        <div className="flex flex-col pb-10 space-x-2  md:flex-row md:p-5 ">
          <div className="flex-1 h-full mb-5 overflow-x-auto w-max-[50%] md:mb-0">
            <QuizEditor name="quiz" onQuizChange={setQuiz} />
          </div>
          <div className="flex-1 p-2 overflow-y-auto h-[77vh]">
            {(quiz?.content || []).map((item, index) => (
              <QuizItem
                key={`${item.type}-${index}`}
                control={methods.control}
                quiz={item}
                index={index}
                name={`${item.type}-preview-${index}`}
              />
            ))}
          </div>
        </div>
      </FormProvider>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end navbar h-15">
        <Button className="m-5"> 发布</Button>
      </div>
    </Layout>
  );
};

export default QuizCreate;
