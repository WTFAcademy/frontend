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
import { DEMO_MD } from "@site/src/pages/quiz/create/demo";

const useQuizEditor = (lessonId: string) => {
  const role = useCourseRole();

  const { data: quizDetail } = useQuery(
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
      enabled: !!lessonId,
    },
  );

  const { data: userQuizList } = useQuery(
    ["user-quiz-list", role, lessonId],
    async () => {
      if (role === ECourseRole.REVIEWER) {
        return getUserQuizList(lessonId);
      } else {
        return [];
      }
    },
    {
      enabled: !!lessonId,
    },
  );

  const { mutate: updateQuiz } = useMutation(
    async (data: IEditorQuizSubmitPayload) => {
      if (role === ECourseRole.REVIEWER) {
        return reviewEditorQuiz(data);
      } else {
        return submitEditorQuiz(data);
      }
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
    const selfModelWrappers = {
      filename: "My Quiz",
      value: convertCourseToMd(toEditorJSON(quizDetail?.exercise_list)),
      language: ESupportLanguage.MARKDOWN,
    };
    const userModelWrappers = userQuizList?.map(quiz => {
      return {
        filename: quiz.user.user_name,
        value: convertCourseToMd(toEditorJSON(quiz.exercise_list)),
        language: ESupportLanguage.MARKDOWN,
        readOnly: true,
      };
    });

    return [selfModelWrappers, ...userModelWrappers];
  };

  const toSubmitData = (quiz: IQuizEditorValue): IEditorQuizSubmitPayload => {
    return {
      lesson_id: quiz.meta.lesson_id,
      exercise_list: quiz.exercises,
    };
  };

  const initModelWrappers = useMemo(
    () => toEditorData(),
    [quizDetail, userQuizList],
  );
  console.log(initModelWrappers);
  const initModelWrappers1 = useMemo(
    () => [
      {
        filename: "My Quiz",
        value: DEMO_MD,
        language: ESupportLanguage.MARKDOWN,
      },
      {
        filename: "daxiongya",
        value: DEMO_MD,
        language: ESupportLanguage.MARKDOWN,
        readOnly: true,
      },
    ],
    [],
  );

  return {
    initModelWrappers: initModelWrappers1,
    updateQuiz,
    toSubmitData,
  };
};

export default useQuizEditor;
