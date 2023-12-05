import { IExercise } from "@site/src/typings/quiz";
import {
  IQuizEditorValue,
  TTokenWithAny,
} from "@site/src/components/editor/type";

function convertTokenToMd(token: TTokenWithAny) {
  switch (token.type) {
    case "heading":
      return `${"#".repeat(token.depth)} ${
        token.tokens ? convertTokensToMd(token.tokens) : token.raw
      }\n`;
    case "paragraph":
      return `${token.tokens ? convertTokensToMd(token.tokens) : token.raw}\n`;
    case "list_item":
      return `* ${
        token.tokens ? convertTokensToMd(token.tokens) : token.raw
      }\n`;
    case "list":
      return `${token.items
        .map(item => `${convertTokensToMd(item.tokens)}\n`)
        .join("")}\n`;
    case "text":
      return `${token.tokens ? convertTokensToMd(token.tokens) : token.raw}`;
    case "link":
      return `[${token.tokens ? convertTokensToMd(token.tokens) : token.raw}](${
        token.href
      })`;
    case "image":
      return `![${token.raw}](${token.href}${
        token.title ? ` "${token.title}"` : ""
      })`;
    case "strong":
      return `**${
        token.tokens ? convertTokensToMd(token.tokens) : token.raw
      }**`;
    case "em":
      return `*${token.tokens ? convertTokensToMd(token.tokens) : token.raw}*`;
    case "codespan":
      return `\`${token.raw}\``;
    case "space":
      return token.raw;
    case "table": {
      const header = token.header.map(convertTokensToMd);
      const aligns = token.align.reduce(
        (prev, cur) => prev + (cur === null ? "-" : cur) + " | ",
        "| ",
      );
      const rows = token.rows
        .map(row => "| " + row.map(convertTokensToMd).join(" | ") + " |")
        .join("\n");
      return header + "\n" + aligns + "\n" + rows;
    }
    // Add more cases as needed
    default:
      return token.raw || "";
  }
}

function convertTokensToMd(tokens: TTokenWithAny[]) {
  return tokens.map(token => convertTokenToMd(token)).join("");
}

export function convertQuizToMd(exercise: IExercise) {
  const quizTitle = `${exercise.title}`;
  const quizMeta = `> ${JSON.stringify(exercise.meta)}\n\n`;
  const quizExtend = exercise.content?.extend
    ? convertTokensToMd(exercise.content.extend)
    : "";
  const quizSelection = exercise.content?.options
    ?.map(option => `- (${option.value}) ${option.label}\n`)
    ?.join("");
  return quizTitle + quizMeta + quizExtend + quizSelection;
}

export function convertCourseToMd(quiz: IQuizEditorValue) {
  const { meta, exercises } = quiz;

  const courseMeta = `---\nlesson_id: ${meta.lesson_id}\n---\n\n`;
  const courseContents = exercises
    .map(item => convertQuizToMd(item))
    .join("\n\n");
  return courseMeta + courseContents;
}
