import { EExerciseType } from "@site/src/constants/quiz";

interface IExerciseMata {
  index?: number;
  type: EExerciseType;
  answer?: string[];
  id?: string;
}

interface IExerciseOption {
  label: string;
  value: string;
}

interface IMarkDown {
  raw: string;
  tokens?: IMarkDown[];
  type: "blockquote" | "heading" | "code" | "paragraph" | "space" | "list";
  deep?: number;
  lang?: string;
}
interface IExerciseContent {
  extend?: IMarkDown[];
  options?: IExerciseOption[];
}

export interface IExercise {
  title: string;
  meta: IExerciseMata;
  content: IExerciseContent;
}

export interface IAnswer {
  id: string;
  answers: string[];
}

export interface IQuizSubmitPayload {
  lesson_id: string;
  course_id: string;
  quiz_id: string;
  answers: IAnswer[];
}

export interface IEditorQuizSubmitPayload {
  exercise_list: IExercise[];
  lesson_id: string;
  quiz_id?: string;
}

export interface IResponseEditorQuiz {
  exercise_list: IExercise[];
  user: {
    uid: string;
    user_name: string;
  };
}
