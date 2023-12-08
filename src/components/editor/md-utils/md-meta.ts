import yaml from "js-yaml";
import {
  makeError,
  requireError,
} from "@site/src/components/editor/md-utils/error";
import { isNil } from "lodash-es";

export const resolveMdMeta = (source: string) => {
  const position = {
    start: {
      line: 0,
      column: 0,
    },
    end: {
      line: 0,
      column: 3,
    },
  };
  try {
    requireError(!!source, {
      message: "Markdown不允许为空",
      ...position,
    });

    requireError(source.split("---").length === 3, {
      message: "Markdown元数据缺少---包裹",
      ...position,
    });

    const splitSource = source.includes("---\n")
      ? source.split("---\n")
      : source.split("---");
    const frontMatterString = splitSource[1];
    const markdownString = splitSource[2];

    const frontMatter = yaml.load(frontMatterString);
    const endLine = (splitSource[0] + splitSource[1]).split("\n").length;
    console.log("----------------------------------------");

    requireError(!!frontMatter, {
      message: "Markdown元数据不能为空",
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: endLine + 1,
        column: 3,
      },
    });
    requireError(!isNil(frontMatter.lesson_id), {
      message: "Markdown元数据缺少lesson_id",
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: endLine + 1,
        column: 3,
      },
    });

    return {
      meta: frontMatter,
      content: markdownString,
      start: {
        line: 0,
      },
      end: {
        line: endLine + 1,
      },
    };
  } catch (e) {
    if (e?.end?.line && e?.end?.line !== 0) {
      const splitSource = source.split("---");
      const markdownString = splitSource[2];
      const endLine = (splitSource[0] + splitSource[1]).split("\n").length;

      return {
        meta: {},
        content: markdownString,
        error: e,
        start: {
          line: 0,
        },
        end: {
          line: endLine || 0,
        },
      };
    }

    if (e.name === "YAMLException") {
      const splitSource = source.split("---");
      const markdownString = splitSource[2];
      const endLine = (splitSource[0] + splitSource[1]).split("\n").length;

      return {
        meta: {},
        content: markdownString,
        error: makeError({
          message: "Markdown元数据格式错误",
          start: {
            line: e?.mark?.line,
            column: 0,
          },
          end: {
            line: e.mark.line,
            column: e.mark.column,
          },
        }),
        start: {
          line: 0,
        },
        end: {
          line: endLine,
        },
      };
    }

    return {
      meta: {},
      content: source,
      error: e,
      start: {
        line: 0,
      },
      end: {
        line: 0,
      },
    };
  }
};
