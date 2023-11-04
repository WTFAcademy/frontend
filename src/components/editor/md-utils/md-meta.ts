import yaml from "js-yaml";
import { requireError } from "@site/src/components/editor/md-utils/error";

export const resolveMdMeta = (source: string) => {
  try {
    if (!source) {
      return null;
    }
    requireError(!!source, {
      message: "Markdown source is empty",
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 3,
      },
    });

    requireError(source.split("---").length === 3, {
      message: "Markdown meta must be wrapped by ---",
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 3,
      },
    });

    const splitSource = source.split("---");
    const frontMatterString = splitSource[1];
    const markdownString = splitSource[2];

    const frontMatter = yaml.load(frontMatterString);

    const endLine = (splitSource[0] + splitSource[1]).split("\n").length;

    return {
      course: frontMatter,
      quizzes: markdownString,
      start: {
        line: 0,
      },
      end: {
        line: endLine,
      },
    };
  } catch (e) {
    return {
      course: null,
      quizzes: source,
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
