import useCourseRole from "@site/src/hooks/useCourseRole";
import { useMutation, useQuery } from "react-query";
import {
  ESupportLanguage,
  IQuizEditorValue,
  TModelWrapper,
} from "@site/src/components/editor/type";
import { ECourseRole } from "@site/src/constants/quiz";
import {
  getEditorQuizDetail,
  getSelectedEditorQuizDetail,
  getUserQuizList,
  reviewEditorQuiz,
  submitEditorQuiz,
} from "@site/src/api/quiz";
import { IEditorQuizSubmitPayload, IExercise } from "@site/src/typings/quiz";
import { convertCourseToMd } from "@site/src/components/editor/utils/convert";
import { useMemo } from "react";

const useQuizEditor = (courseId: string, lessonId: string) => {
  const { role, isLoading: roleLoading } = useCourseRole(courseId);

  const { data: quizDetail, isLoading: detailLoading } = useQuery(
    ["quiz-editor-detail", role, lessonId],
    async () => {
      if (role === ECourseRole.REVIEWER) {
        return getSelectedEditorQuizDetail(lessonId);
      } else if (role === ECourseRole.EDITOR) {
        return getEditorQuizDetail(lessonId);
      } else {
        return null;
      }
    },
    {
      enabled: !!lessonId && !roleLoading,
      cacheTime: 0,
    },
  );

  const { data: userQuizList, isLoading: listLoading } = useQuery(
    ["user-quiz-list", role, lessonId],
    async () => {
      if (role === ECourseRole.REVIEWER) {
        return getUserQuizList(lessonId);
      } else {
        return [];
      }
    },
    {
      enabled: !!lessonId && !roleLoading,
      cacheTime: 0,
    },
  );

  const { mutateAsync: publishQuiz, isLoading: publishLoading } = useMutation(
    async (data: IEditorQuizSubmitPayload) => {
      return reviewEditorQuiz(data);
    },
  );

  const { mutateAsync: submitQuiz, isLoading: submitLoading } = useMutation(
    async (data: IEditorQuizSubmitPayload) => {
      return submitEditorQuiz(data);
    },
  );

  const toEditorJSON = (exercises: IExercise[]): IQuizEditorValue => {
    return {
      meta: {
        lesson_id: lessonId,
      },
      exercises,
    };
  };

  const toEditorData = (): TModelWrapper[] => {
    if (detailLoading || listLoading || roleLoading) {
      return;
    }

    const selfModelWrappers = {
      filename: "My Quiz",
      value: convertCourseToMd(toEditorJSON(quizDetail?.exercises || [])),
      language: ESupportLanguage.MARKDOWN,
    };
    const userModelWrappers =
      userQuizList?.map(quiz => {
        return {
          filename: quiz.user.user_name,
          value: convertCourseToMd(toEditorJSON(quiz?.exercises || [])),
          language: ESupportLanguage.MARKDOWN,
          readOnly: true,
        };
      }) || [];

    return [selfModelWrappers, ...userModelWrappers];
  };

  const toSubmitData = (quiz: IQuizEditorValue): IEditorQuizSubmitPayload => {
    return {
      lesson_id: quiz.meta.lesson_id,
      exercises: quiz.exercises,
    };
  };

  const initModelWrappers = useMemo(() => {
    return toEditorData();
  }, [quizDetail, userQuizList, detailLoading, listLoading]);

  return {
    initModelWrappers,
    toSubmitData,
    role,
    loading: detailLoading || listLoading || roleLoading,
    publishQuiz,
    publishLoading,
    submitLoading,
    submitQuiz,
  };
};

export default useQuizEditor;
