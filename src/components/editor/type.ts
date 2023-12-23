import BaseMonaco, { editor } from "monaco-editor";
import { IExercise } from "@site/src/typings/quiz";
import { Token } from "Tokens";

export type TPosition = {
  line: number;
  column: number;
};

export type TTokenPosition = {
  startLine: number;
  endLine: number;
  lineColumns: TPosition[];
};

export type TToken = Token & { position: TTokenPosition };
export type TTokenList = TToken[];

export enum ESupportLanguage {
  MARKDOWN = "markdown",
}

export type TModelWrapper = {
  notInitial?: boolean;

  shown?: boolean;

  readOnly?: boolean;

  tested?: boolean;

  model?: editor.ITextModel;

  filename: string;

  value: string;

  language: ESupportLanguage;
};

export type TEditor = BaseMonaco.editor.IStandaloneCodeEditor;

export interface IQuizEditorValue {
  meta: {
    lesson_id: string;
  };
  exercises: IExercise[];
}

export type TTokenWithAny = Token & { [key: string]: any };
