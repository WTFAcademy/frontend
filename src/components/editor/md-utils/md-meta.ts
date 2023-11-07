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
      message: "Markdown source is empty",
      ...position,
    });

    requireError(source.split("---").length === 3, {
      message: "Markdown meta must be wrapped by ---",
      ...position,
    });

    const splitSource = source.split("---");
    const frontMatterString = splitSource[1];
    const markdownString = splitSource[2];

    const frontMatter = yaml.load(frontMatterString);
    const endLine = (splitSource[0] + splitSource[1]).split("\n").length;

    console.log(frontMatter);
    requireError(!!frontMatter, {
      message: "Markdown meta is empty",
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: endLine,
        column: 3,
      },
    });
    requireError(!isNil(frontMatter.quiz_id), {
      message: "Markdown meta must have quiz_id",
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: endLine,
        column: 3,
      },
    });
    requireError(!isNil(frontMatter.course_id), {
      message: "Markdown meta must have course_id",
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: endLine,
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
        line: endLine,
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
          message: "Markdown meta is not valid yaml",
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
