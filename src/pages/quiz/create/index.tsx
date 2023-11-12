import Layout from "@theme/Layout";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import EditorTabs from "@site/src/pages/quiz/create/EditorTabs";
import { Button } from "@site/src/components/ui/Button";
import {
  IQuizEditorValue,
  TModelWrapper,
} from "@site/src/components/editor/type";
import FormProvider from "@site/src/components/hook-form/form-provider";
import QuizItem from "@site/src/components/quiz-form/QuizItem";
import Editor from "@site/src/components/editor";
import useQuizEditor from "@site/src/hooks/useQuizEditor";
import useRouterQuery from "@site/src/hooks/useRouterQuery";

const QuizCreate = () => {
  const query = useRouterQuery();
  const lessonId = query.get("lessonId");

  const methods = useForm<FieldValues>();

  const { initModelWrappers, updateQuiz, toSubmitData } =
    useQuizEditor(lessonId);

  const [modelWrappers, setModelWrappers] = useState<TModelWrapper[]>([]);
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [quiz, setQuiz] = useState<IQuizEditorValue>();

  const handleSubmit = async () => {
    const data = toSubmitData(quiz);
    const res = await updateQuiz(data);
    console.log(res);
  };

  useEffect(() => {
    if (initModelWrappers) {
      setModelWrappers(initModelWrappers);
    }
  }, [initModelWrappers]);

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
        onActiveModelChange={e => setActiveModelIndex(Number(e))}
      />
      <div className="flex flex-col pb-10 space-x-2  md:flex-row md:p-5 ">
        <div className="flex-1 h-full mb-5 overflow-x-auto w-max-[50%] md:mb-0">
          <Editor
            modelWrappers={modelWrappers}
            onModelWrappersChange={setModelWrappers}
            activeModelIndex={activeModelIndex}
            onActiveModelChange={setActiveModelIndex}
            onQuizChange={e => setQuiz(e)}
          />
        </div>
        <div className="flex-1 p-2 overflow-y-auto h-[77vh]">
          <FormProvider methods={methods} className="flex flex-col gap-6">
            {(quiz?.exercises || []).map((item, index) => (
              <QuizItem
                key={`${item.meta?.type}-${index}`}
                control={methods.control}
                exercise={item}
                index={index}
                name={`${item.meta?.type}-preview-${index}`}
              />
            ))}
          </FormProvider>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end navbar h-15 border-t border-t-border">
        <Button className="m-5" onClick={handleSubmit}>
          {" "}
          发布
        </Button>
      </div>
    </Layout>
  );
};

export default QuizCreate;
