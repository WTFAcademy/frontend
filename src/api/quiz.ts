import request from "@site/src/api/request";
import { TResult } from "@site/src/typings/common";
import { TLesson } from "@site/src/typings/course";
import { IExercise, IQuizSubmitPayload } from "@site/src/typings/quiz";

export const getQuizByLessonId = (lessonId: string) => {
  return (
    request
      // .get<unknown, TResult<{ list: TLesson[] }>>(
      .get<unknown, TResult<{ exercise_list: IExercise[]; quiz_id: string }>>(
        `http://features-testing-env.eba-mau9qkgr.us-east-1.elasticbeanstalk.com/lesson/quiz?lesson_id=${lessonId}`,
      )
      .then(res => res.data)
  );
};

export const submitQuizGrade = (data: IQuizSubmitPayload) => {
  return (
    request
      .post<unknown, TResult<{ list: TLesson[] }>>(
        `http://features-testing-env.eba-mau9qkgr.us-east-1.elasticbeanstalk.com/grade`,
        data,
      )
      // .post<unknown, TResult<{ list: TLesson[] }>>(`/grade`, data)
      .then(res => res.data)
  );
};
