import BaseMonaco, { editor } from "monaco-editor";

export type TPosition = {
  line: number;
  column?: number;
};

export type TTokenPosition = {
  start: TPosition;
  end: TPosition;
};

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
