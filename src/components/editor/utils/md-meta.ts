import { marked } from "marked";
import yaml from "js-yaml";
import { requireError } from "@site/src/components/editor/utils/error";

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
    });

    requireError(source.split("---").length === 3, {
      message: "Markdown meta must be wrapped by ---",
      start: {
        line: 0,
        column: 0,
      },
    });

    const splitSource = source.split("---");
    const frontMatterString = splitSource[1];
    const markdownString = splitSource[2];

    const frontMatter = yaml.load(frontMatterString);

    return {
      meta: frontMatter,
      content: markdownString,
    };
  } catch (e) {
    return {
      meta: null,
      content: source,
      error: e,
    };
  }
};
