import request from "@site/src/api/request";
import { TResult } from "@site/src/typings/common";
import {
  IExercise,
  IEditorQuizSubmitPayload,
  IQuizSubmitPayload,
  IResponseEditorQuiz,
} from "@site/src/typings/quiz";

export const getQuizByLessonId = (lessonId: string) => {
  return (
    request
      // .get<unknown, TResult<{ list: TLesson[] }>>(
      .get<unknown, TResult<{ exercise_list: IExercise[]; quiz_id: string }>>(
        `/lesson/quiz?lesson_id=${lessonId}`,
      )
      .then(res => res.data)
  );
};

export const submitQuizGrade = (data: IQuizSubmitPayload) => {
  return (
    request
      .post<unknown, TResult<{ error_cnt: number; score: number }>>(
        `/grade`,
        data,
      )
      // .post<unknown, TResult<{ list: TLesson[] }>>(`/grade`, data)
      .then(res => res.data)
  );
};

export const getEditorQuizDetail = (lessonId: string) => {
  return request
    .get<unknown, TResult<{ exercises: IExercise[] }>>(`/quiz/${lessonId}`)
    .then(res => res.data);
};

export const getSelectedEditorQuizDetail = (lessonId: string) => {
  return request
    .get<unknown, TResult<{ exercises: IExercise[] }>>(
      `/quiz/selected?lesson_id=${lessonId}`,
    )
    .then(res => res.data);
};

export const submitEditorQuiz = (data: IEditorQuizSubmitPayload) => {
  return request
    .post<unknown, TResult<number>>(`/quiz/submit`, data)
    .then(res => res.data);
};

export const getUserQuizList = (lessonId: string) => {
  return request
    .get<unknown, TResult<IResponseEditorQuiz[]>>(
      `/quiz/list?lesson_id=${lessonId}`,
    )
    .then(res => res.data);
};

export const reviewEditorQuiz = (data: IEditorQuizSubmitPayload) => {
  return request
    .post<unknown, TResult<number>>(`/quiz/review`, data)
    .then(res => res.data);
};
