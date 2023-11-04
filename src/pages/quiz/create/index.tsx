import Layout from "@theme/Layout";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  DEFAULT_VALUE,
  DEFAULT_VALUE2,
} from "@site/src/pages/quiz/create/demo";
import EditorTabs from "@site/src/pages/quiz/create/EditorTabs";
import { Button } from "@site/src/components/ui/Button";
import {
  ESupportLanguage,
  TModelWrapper,
} from "@site/src/components/editor/type";
import QuizEditor from "@site/src/components/quiz-form/QuizEditor";
import FormProvider from "@site/src/components/hook-form/form-provider";
import QuizItem from "@site/src/components/quiz-form/QuizItem";

const QuizCreate = () => {
  const methods = useForm<FieldValues>({
    defaultValues: {
      quiz: DEFAULT_VALUE,
    },
  });
  const quiz = methods.watch("quiz");
  const [modelWrappers, setModelWrappers] = useState<TModelWrapper[]>([
    {
      filename: "my_quiz",
      value: DEFAULT_VALUE,
      language: ESupportLanguage.MARKDOWN,
    },
    {
      filename: "my_quiz_01",
      value: DEFAULT_VALUE2,
      language: ESupportLanguage.MARKDOWN,
      readOnly: true,
    },
  ]);
  const [activeModelIndex, setActiveModelIndex] = useState(0);

  return (
    <Layout
      title={`Hello from`}
      description="Description will go into a meta tag in <head />"
      wrapperClassName="p-5"
      noFooter
    >
      <EditorTabs
        modelWrappers={modelWrappers}
        activeModelIndex={activeModelIndex}
        onActiveModelChange={setActiveModelIndex}
      />
      <FormProvider
        methods={methods}
        onSubmit={() => {
          console.log(123);
        }}
      >
        <div className="flex flex-col pb-10 space-x-2  md:flex-row md:p-5 ">
          <div className="flex-1 h-full mb-5 overflow-x-auto w-max-[50%] md:mb-0">
            <QuizEditor
              name="quiz"
              modelWrappers={modelWrappers}
              onModelWrappersChange={setModelWrappers}
              activeModelIndex={activeModelIndex}
              onActiveModelChange={setActiveModelIndex}
            />
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
