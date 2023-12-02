import { Token, Tokens } from "Tokens";
import { IExercise } from "@site/src/typings/quiz";
import {
  callError,
  makeError,
  requireError,
  TError,
} from "@site/src/components/editor/md-utils/error";
import { TTokenPosition } from "@site/src/components/editor/type";
import { EExerciseType } from "@site/src/constants/quiz";

const chunkMdGroup = (mds: (Token & TTokenPosition)[]) => {
  try {
    const result = [];
    let hasHeading = false;

    for (let i = 0; i < mds.length; i++) {
      const token = mds[i];

      if (result.length === 0 && token.type !== "heading") {
        continue;
      }

      switch (token.type) {
        case "heading":
          hasHeading = true;
          result.push([token]);
          break;
        default:
          result[result.length - 1].push(token);
      }
    }

    const notEmptyMd = mds.find(item => item.type !== "space");

    requireError(hasHeading, {
      message: "习题必须还有标题##开头",
      start: {
        line: notEmptyMd.start.line,
        column: 0,
      },
      end: {
        line: notEmptyMd.end.line,
        column: notEmptyMd.raw.length - 1,
      },
    });

    return {
      result,
    };
  } catch (e) {
    return {
      result: [],
      error: e,
    };
  }
};

const resolveExerciseTitle = (md: Tokens.Heading & TTokenPosition) => {
  try {
    requireError(md.raw.includes("## "), {
      message: "Exercise title must be use ## to start",
      start: {
        ...md.start,
        column: 0,
      },
      end: {
        ...md.end,
        column: md.raw.length - 1,
      },
    });

    return {
      result: md.raw,
    };
  } catch (e) {
    return {
      result: null,
      error: e,
    };
  }
};

const resolveExerciseMeta = (token: Tokens.Blockquote & TTokenPosition) => {
  const metaString = token.text.trim().replace(/\n/g, "");
  const processedData = metaString
    .replace(/(\w+):/g, '"$1":')
    .replace(/'/g, '"');

  try {
    const position = {
      start: {
        ...token.start,
        column: 0,
      },
      end: {
        ...token.end,
        column: metaString.length - 1,
      },
    };
    const meta =
      callError(() => JSON.parse(processedData), {
        message: "Exercise meta data must be a valid JSON",
        ...position,
      }) || {};

    requireError(meta.score, {
      message: "Exercise meta data must have score",
      ...position,
    });

    // todo: 单选题，多选题，插空题
    requireError(meta.type, {
      message: "Exercise meta data must have type",
      ...position,
    });

    requireError(
      meta.type === EExerciseType.MULTIPLE_SELECT ||
        meta.type === EExerciseType.INSET ||
        meta.type === EExerciseType.SELECT,
      {
        message:
          "Exercise meta data type must be one of [multiple_select, inset, select]",
        ...position,
      },
    );

    const answer = meta.answer;
    requireError(answer, {
      message: "Exercise meta data must have answer",
      ...position,
    });
    requireError(Array.isArray(answer), {
      message: "Exercise meta data answer must be an array",
      ...position,
    });
    requireError(answer.length > 0, {
      message: "Exercise meta data answer must have at least one item",
      ...position,
    });

    return {
      result: meta,
    };
  } catch (e) {
    return {
      result: null,
      error: e,
    };
  }
};

const resolveExerciseOptions = (md: Tokens.List) => {
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
): { result: IExercise[]; errors: TError[] } => {
  const { result: group, error } = chunkMdGroup(mds);
  const errors = [error];
  const result = group?.map(tokens => {
    const quiz: IExercise = {} as IExercise;
    let hasList = false;

    for (const token of tokens) {
      switch (token.type) {
        case "heading":
          const { result: titleResult, error: titleError } =
            resolveExerciseTitle(token);
          if (titleError) {
            errors.push(titleError);
          }
          quiz.title = titleResult;
          break;
        case "blockquote":
          const { result, error } = resolveExerciseMeta(token);
          if (error) {
            errors.push(error);
          }
          quiz.meta = result;
          break;
        case "list":
          hasList = true;
          console.log(token);
          // list 后表示QUIZ内容获取结束，直接返回
          quiz.content = {
            ...(quiz.content || {}),
            extend: quiz.content?.extend || [],
            options: resolveExerciseOptions(token),
          };
          break;
        case "space":
          if (hasList) break;
          quiz.content = {
            ...(quiz.content || {}),
            extend: (quiz.content?.extend || []).concat(token),
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
          message: "Exercise content must be a list",
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
