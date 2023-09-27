import { Tokens, TokensList } from "Tokens";
import { IQuiz } from "@site/src/typings/quiz";

const chunkMdGroup = (md: TokensList) => {
  const result = [];

  for (let i = 0; i < md.length; i++) {
    const token = md[i];

    if (result.length === 0 && token.type !== "heading") {
      continue;
    }

    switch (token.type) {
      case "heading":
        result.push([token]);
        break;
      default:
        result[result.length - 1].push(token);
    }
  }

  return result;
};

const transformQuizTitle = (md: Tokens.Heading) => {
  return md.raw;
};

const transformQuizMeta = (token: Tokens.Blockquote) => {
  const metaString = token.text.trim().replace(/\n/g, "");
  const processedData = metaString
    .replace(/(\w+):/g, '"$1":')
    .replace(/'/g, '"');
  try {
    return JSON.parse(processedData);
  } catch (e) {
    console.error(e);
  }

  return null;
};

const transformQuizOptions = (md: Tokens.List) => {
  const transformOption = (md: Tokens.ListItem) => {
    // (A) 选项内容
    const text = md.text.trim();
    const [, option, content] = /\((\w)\)\s*(.*)/.exec(text) || [];
    return {
      label: content,
      value: option,
    };
  };

  return md.items.map(transformOption);
};

export const transform = (mds: TokensList): IQuiz[] => {
  const group = chunkMdGroup(mds);
  return group.map(tokens => {
    const quiz: IQuiz = {} as IQuiz;

    for (const token of tokens) {
      switch (token.type) {
        case "heading":
          quiz.title = transformQuizTitle(token);
          break;
        case "blockquote":
          quiz.meta = transformQuizMeta(token);
          break;
        case "list":
          // list 后表示QUIZ内容获取结束，直接返回
          quiz.content = {
            ...(quiz.content || {}),
            options: transformQuizOptions(token),
          };
          continue;
        default:
          quiz.content = {
            ...(quiz.content || {}),
            extend: (quiz.content?.extend || []).concat(token),
          };
          break;
      }
    }

    return quiz;
  });
};
