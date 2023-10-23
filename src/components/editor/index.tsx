import React, { useEffect, useRef } from "react";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { marked } from "marked";
import { IQuiz } from "@site/src/typings/quiz";
import { resolveMdMeta } from "@site/src/components/editor/utils/md-meta";
import { endowWithPosition } from "./utils/common";
import { resolveMdContent } from "@site/src/components/editor/utils/md-content";
import { compact } from "lodash-es";
import { TError } from "@site/src/components/editor/utils/error";
import { useEditor } from "@tiptap/react";

function initTheme(monaco: Monaco) {
  monaco.editor.defineTheme("myCustomTheme", {
    base: "vs",
    inherit: true,
    rules: [
      {
        background: "FFFFFF",
        token: "",
      },
      {
        foreground: "008e00",
        token: "comment",
      },
      {
        foreground: "7d4726",
        token: "meta.preprocessor",
      },
      {
        foreground: "7d4726",
        token: "keyword.control.import",
      },
      {
        foreground: "df0002",
        token: "string",
      },
      {
        foreground: "3a00dc",
        token: "constant.numeric",
      },
      {
        foreground: "c800a4",
        token: "constant.language",
      },
      {
        foreground: "275a5e",
        token: "constant.character",
      },
      {
        foreground: "275a5e",
        token: "constant.other",
      },
      {
        foreground: "c800a4",
        token: "variable.language",
      },
      {
        foreground: "c800a4",
        token: "variable.other",
      },
      {
        foreground: "c800a4",
        token: "keyword",
      },
      {
        foreground: "c900a4",
        token: "storage",
      },
      {
        foreground: "438288",
        token: "entity.name.class",
      },
      {
        foreground: "790ead",
        token: "entity.name.tag",
      },
      {
        foreground: "450084",
        token: "entity.other.attribute-name",
      },
      {
        foreground: "450084",
        token: "support.function",
      },
      {
        foreground: "450084",
        token: "support.constant",
      },
      {
        foreground: "790ead",
        token: "support.type",
      },
      {
        foreground: "790ead",
        token: "support.class",
      },
      {
        foreground: "790ead",
        token: "support.other.variable",
      },
    ],
    colors: {
      "editor.foreground": "#000000",
      "editor.background": "#FFFFFF",
      "editor.selectionBackground": "#B5D5FF",
      "editor.lineHighlightBackground": "#00000012",
      "editorCursor.foreground": "#000000",
      "editorWhitespace.foreground": "#BFBFBF",
    },
  });
  monaco.editor.setTheme("myCustomTheme");
}

export interface IQuizEditorValue {
  course: {
    quiz_id: string;
    course_id: string;
  };
  content: IQuiz[];
}

export type TQuizEditorProps = {
  onChange?: (value: string) => void;
  onQuizChange?: (value: IQuizEditorValue) => void;
  onError?: (errors: TError[]) => void;
  value?: string;
  defaultValue?: string;
};

function Editor(props: TQuizEditorProps) {
  const { onChange, value, onQuizChange, onError, defaultValue } = props;
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    initTheme(monaco);
  };

  useEffect(() => {
    try {
      const { course, quizzes, error: metaResolveError } = resolveMdMeta(value);
      const out = marked.lexer(quizzes || value);
      const outWithPosition = endowWithPosition(out);
      const { result, errors } = resolveMdContent(outWithPosition);
      const allErrors = compact([...errors, metaResolveError]);
      const allResult = {
        course,
        content: result,
      };
      onQuizChange?.(allResult);
      onError?.(allErrors);
    } catch (e) {
      console.log(e);
    }
  }, [value]);

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="markdown"
      defaultValue={defaultValue}
      value={value}
      onMount={handleEditorDidMount}
      onChange={onChange}
      options={{
        lineNumbersMinChars: 3,
        minimap: {
          enabled: false,
        },
        fontSize: 14,
      }}
    />
  );
}

export default Editor;
