import { Tokens } from "Tokens";
import { IExercise } from "@site/src/typings/quiz";
import {
  callError,
  makeError,
  requireError,
  TError,
} from "@site/src/components/editor/utils/error";
import {
  TToken,
  TTokenList,
  TTokenPosition,
} from "@site/src/components/editor/type";
import { EExerciseType } from "@site/src/constants/quiz";

const chunkMdGroup = (mds: TTokenList) => {
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
        line: notEmptyMd.position.startLine,
        column: 0,
      },
      end: {
        line: notEmptyMd.position.endLine,
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

const resolveExerciseTitle = (md: TToken) => {
  try {
    requireError(md.raw.includes("## "), {
      message: "Exercise title must be use ## to start",
      start: {
        line: md.position.startLine,
        column: 0,
      },
      end: {
        line: md.position.endLine,
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

const resolveExerciseMeta = (
  token: Tokens.Blockquote & { position: TTokenPosition },
) => {
  const metaString = token.text.trim().replace(/\n/g, "");
  const processedData = metaString
    .replace(/(\w+):/g, '"$1":')
    .replace(/'/g, '"');

  try {
    const position = {
      start: {
        line: token.position.startLine,
        column: 0,
      },
      end: {
        line: token.position.endLine,
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
    const [, option, content] = /\((\w)\)\s*(.*)/s.exec(text) || [];
    return {
      label: content,
      value: option,
    };
  };

  return md.items.map(transformOption);
};

export const resolveMdContent = (
  mds: TTokenList,
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
          // dev(daxiongya): 处理extend存在list的情况
          if (!/^-\s*\([A-Z]\)/.test(token.raw)) {
            const items = token.items;
            const nonOptionItems = items.filter(
              it => !/^-\s*\([A-Z]\)/.test(it.raw),
            );
            const optionItems = items.slice(nonOptionItems.length);
            if (optionItems.length > 0) {
              hasList = true;
            }

            const splitRawFlag =
              nonOptionItems[nonOptionItems.length - 1]?.raw || "";
            const nonOptionRaw =
              token.raw.split(splitRawFlag)[0] + splitRawFlag;
            const optionRaw = token.raw.split(splitRawFlag)[1];

            quiz.content = {
              ...(quiz.content || {}),
              extend: (quiz.content?.extend || []).concat({
                ...token,
                raw: nonOptionRaw,
                items: nonOptionItems,
              }),
              options: resolveExerciseOptions({
                ...token,
                raw: optionRaw,
                items: optionItems,
              }),
            };
            break;
          }
          hasList = true;
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
          start: {
            line: (tokens[0] as TToken).position.startLine,
            column: 0,
          },
          end: {
            line: (tokens[0] as TToken).position.endLine,
            column: (tokens[0] as TToken).raw.length - 1,
          },
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
