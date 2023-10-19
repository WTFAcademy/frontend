import { Token, Tokens, TokensList } from "Tokens";
import { IQuiz } from "@site/src/typings/quiz";
import {
  callError,
  makeError,
  TError,
} from "@site/src/components/editor/utils/error";
import { TTokenPosition } from "@site/src/components/editor/type";

const chunkMdGroup = (md: (Token & TTokenPosition)[]) => {
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

const resolveQuizTitle = (md: Tokens.Heading) => {
  return md.raw;
};

const resolveQuizMeta = (token: Tokens.Blockquote & TTokenPosition) => {
  const metaString = token.text.trim().replace(/\n/g, "");
  const processedData = metaString
    .replace(/(\w+):/g, '"$1":')
    .replace(/'/g, '"');

  try {
    return {
      result: callError(() => JSON.parse(processedData), {
        message: "Quiz meta data must be a valid JSON",
        start: token.start,
        end: token.end,
      }),
    };
  } catch (e) {
    return {
      result: null,
      error: e,
    };
  }
};

const resolveQuizOptions = (md: Tokens.List) => {
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

export const resolveMdContent = (
  mds: (Token & TTokenPosition)[],
): { result: IQuiz[]; errors: TError[] } => {
  const group = chunkMdGroup(mds);
  const errors = [];
  const result = group.map(tokens => {
    const quiz: IQuiz = {} as IQuiz;
    let hasList = false;

    for (const token of tokens) {
      switch (token.type) {
        case "heading":
          quiz.title = resolveQuizTitle(token);
          break;
        case "blockquote":
          const { result, error } = resolveQuizMeta(token);
          if (error) {
            errors.push(error);
          }
          quiz.meta = result;
          break;
        case "list":
          hasList = true;
          // list 后表示QUIZ内容获取结束，直接返回
          quiz.content = {
            ...(quiz.content || {}),
            options: resolveQuizOptions(token),
          };
          break;
        default:
          quiz.content = {
            ...(quiz.content || {}),
            extend: (quiz.content?.extend || []).concat(token),
          };
          break;
      }
    }

    if (!hasList) {
      errors.push(
        makeError({
          message: "Quiz content must be a list",
          start: (tokens[0] as Token & TTokenPosition).start,
          end: (tokens[0] as Token & TTokenPosition).end,
          severity: "warning",
        }),
      );
    }

    return quiz;
  });

  return {
    result,
    errors,
  };
};

// const resolveMdContent = (source: string) => {
//     // 1. 去除无用的空行
//
//     // 2. 根据title 拆分成多个quiz
//
//     // 3. 解析每个quiz内容
//     //  a. 解析title，要求##等级开头，给出警告
//     //  b. 解析meta，要求>开头，给出警告，若无>开头，则报错：无quiz meta数据
//     //  c. 解析content, 一直遇到list为止，list后面的内容为quiz的选项，根据meta给出的quiz类型判读若无list，是否报错：无quiz选项数据
//     //  d. 解析quiz选项，要求-开头，给出警告，若无-开头，但则报错：无quiz选项数据
// }
