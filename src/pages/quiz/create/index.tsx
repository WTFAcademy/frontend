import Layout from "@theme/Layout";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import EditorTabs from "@site/src/pages/quiz/create/_EditorTabs";
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
import useCourseRole from "@site/src/hooks/useCourseRole";
import { ECourseRole } from "@site/src/constants/quiz";
import { useHistory } from "@docusaurus/router";
import { toast } from "react-hot-toast";
import Spinner from "@site/src/components/ui/Spinner";
import { TError } from "@site/src/components/editor/utils/error";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";

const QuizCreate = () => {
  const query = useRouterQuery();
  const history = useHistory();
  const { i18n } = useDocusaurusContext();

  const lessonId = query.get("lessonId");
  const courseId = query.get("courseId");
  const methods = useForm<FieldValues>();
  const { role, isLoading: roleLoading } = useCourseRole(courseId);
  const {
    initModelWrappers,
    toSubmitData,
    loading,
    submitLoading,
    submitQuiz,
    publishQuiz,
    publishLoading,
  } = useQuizEditor(courseId, lessonId);

  const [modelWrappers, setModelWrappers] = useState<TModelWrapper[]>([]);
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [quiz, setQuiz] = useState<IQuizEditorValue>();
  const [error, setError] = useState<TError[]>();

  const handlePublish = async () => {
    if (error?.length > 0) {
      toast.error(<Translate id="quiz.check.question.error.tips">请检查题目是否有错误</Translate>);
      return;
    }

    if (!quiz) {
      toast.error(<Translate id="quiz.empty.error.tips">请勿提交空题库</Translate>);
      return;
    }

    const data = toSubmitData(quiz);
    const res = await publishQuiz(data);
    if (res) {
      toast.success(<Translate id="quiz.poste.success.tips">发布成功</Translate>);
      if (history.length > 1) {
        history.goBack();
      } else {
        history.push(`/`);
      }
    }
  };

  const handleSubmit = async () => {
    if (error?.length > 0) {
      toast.error(<Translate id="quiz.check.question.error.tips">请检查题目是否有错误</Translate>);
      return;
    }

    if (!quiz) {
      toast.error(<Translate id="quiz.empty.error.tips">请勿提交空题库</Translate>);
      return;
    }

    const data = toSubmitData(quiz);
    const res = await submitQuiz(data);
    if (res) {
      toast.success(<Translate id="quiz.save.success.tips">提交成功</Translate>);
      if (history.length > 1) {
        history.goBack();
      } else {
        history.push(`/`);
      }
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      history.goBack();
    } else {
      history.push(`/`);
    }
  };

  useEffect(() => {
    if ((!roleLoading && role === ECourseRole.USER) || !lessonId || !courseId) {
      history.replace("/");
      toast.error(<Translate id="quiz.noaccess.error.tips">您没有权限访问该页面</Translate>);
    }
  }, [role, roleLoading]);

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
      <Spinner loading={loading || publishLoading || submitLoading}>
        <div className="flex flex-col pb-10 space-x-2  md:flex-row md:p-5 ">
          <div className="flex-1 h-full mb-5 overflow-x-auto w-max-[50%] md:mb-0">
            <Editor
              modelWrappers={modelWrappers}
              onModelWrappersChange={setModelWrappers}
              activeModelIndex={activeModelIndex}
              onActiveModelChange={setActiveModelIndex}
              onQuizChange={e => setQuiz(e)}
              onError={e => setError(e)}
              isLoading={loading}
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
      </Spinner>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end navbar h-15 border-t border-t-border">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={publishLoading || submitLoading}
        >
          <Translate id="quiz.return.button">返回</Translate>
        </Button>
        <Button
          className="m-5"
          onClick={handleSubmit}
          disabled={publishLoading || submitLoading || loading}
        >
          {ECourseRole.REVIEWER === role ? <Translate id="quiz.save.button">保存</Translate> : <Translate id="quiz.submit.button">提交</Translate>}
        </Button>
        {role === ECourseRole.REVIEWER && (
          <Button
            onClick={handlePublish}
            disabled={publishLoading || submitLoading || loading}
          >
            <Translate id="quiz.publish.button">发布</Translate>
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default QuizCreate;
