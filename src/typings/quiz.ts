interface IQuizMata {
  index?: number;
  type: "inset" | "select" | "multiple-select";
  answer: string[];
}
interface IQuizOption {
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
interface IQuizContent {
  extend?: IMarkDown[];
  options?: IQuizOption[];
}

export interface IQuiz {
  title: string;
  meta: IQuizMata;
  content: IQuizContent;
}
