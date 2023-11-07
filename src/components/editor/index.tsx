import React, { useEffect, useRef } from "react";
import MonacoEditor, { EditorProps, Monaco } from "@monaco-editor/react";
import { marked } from "marked";
import { compact } from "lodash-es";
import { resolveMdContent } from "./md-utils/md-content";
import { endowWithPosition } from "./md-utils/common";
import { resolveMdMeta } from "./md-utils/md-meta";
import { TError } from "@site/src/components/editor/md-utils/error";
import {
  IQuizEditorValue,
  TModelWrapper,
} from "@site/src/components/editor/type";
import { formatModels } from "@site/src/components/editor/utils/model";
import { useDebounceFn, useDeepCompareEffect } from "ahooks";

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

export type TQuizEditorProps = {
  onQuizChange?: (value: IQuizEditorValue) => void;
  onError?: (errors: TError[]) => void;
  activeModelIndex?: number;
  onActiveModelChange?: (index: number) => void;
  modelWrappers?: TModelWrapper[];
  onModelWrappersChange?: (modelWrappers: TModelWrapper[]) => void;
};

function Editor(props: TQuizEditorProps & EditorProps) {
  const {
    onQuizChange,
    onError,
    modelWrappers = [],
    onModelWrappersChange,
    activeModelIndex,
    onActiveModelChange,
    ...rest
  } = props;
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    initModels(monaco, editor, modelWrappers);
    initTheme(monaco);
  };

  const handleEditorChange = value => {
    try {
      const {
        meta = {},
        content,
        error: metaResolveError,
        start,
        end,
      } = resolveMdMeta(value);
      const usedLineCount = end.line - start.line;
      const out = marked.lexer(content || value);
      const outWithPosition = endowWithPosition(out, usedLineCount);
      const { result, errors } = resolveMdContent(outWithPosition);

      const allErrors = compact([metaResolveError, ...errors]);

      const allResult = {
        meta,
        exercises: result,
      };

      const models = monacoRef.current.editor.getModels();
      const curModel = models[1];

      const editorErrors = allErrors.map(item => {
        return {
          ...item,
          startLineNumber: item.start.line,
          endLineNumber: item.end.line,
          startColumn: item.start.column,
          endColumn: item.end.column,
        };
      });
      monacoRef.current.editor.setModelMarkers(curModel, "owner", editorErrors);

      onQuizChange?.(allResult);
      onError?.(allErrors);
    } catch (e) {
      console.log(e);
    }
  };

  const { run: debounceEditorChange } = useDebounceFn(handleEditorChange, {
    wait: 1000,
    leading: true,
    trailing: true,
  });

  const initModels = (monaco, editor, newModelWrappers) => {
    const formatModelWrappers = formatModels(
      monaco,
      newModelWrappers,
      [],
      false,
    );
    onModelWrappersChange?.(formatModelWrappers);
    const firstModelWrapper = formatModelWrappers[0];
    if (!firstModelWrapper?.notInitial) {
      editor.setModel(firstModelWrapper?.model);
      const content = firstModelWrapper?.model?.getValue();
      handleEditorChange(content);
      onActiveModelChange?.(0);
    }
  };

  useEffect(() => {
    if (activeModelIndex !== undefined) {
      const curModelWrapper = modelWrappers[activeModelIndex];
      const model = curModelWrapper?.model;
      if (model) {
        editorRef.current?.setModel(model);
      }
      editorRef.current?.updateOptions({
        readOnly: curModelWrapper.readOnly,
      });
    }
  }, [activeModelIndex]);

  useDeepCompareEffect(() => {
    if (modelWrappers?.length > 0 && editorRef.current && monacoRef.current) {
      initModels(monacoRef.current, editorRef.current, modelWrappers);
    }
  }, [modelWrappers, editorRef.current, monacoRef.current]);

  return (
    <MonacoEditor
      height="77vh"
      defaultLanguage="markdown"
      defaultValue={"# Hello, world!\n\nSome content"}
      onMount={handleEditorDidMount}
      onChange={value => debounceEditorChange(value)}
      options={{
        lineNumbersMinChars: 3,
        minimap: {
          enabled: false,
        },
        fontSize: 14,
      }}
      {...rest}
    />
  );
}

export default Editor;
