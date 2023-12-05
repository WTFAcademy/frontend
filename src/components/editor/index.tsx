import React, { useEffect, useRef, useState } from "react";
import MonacoEditor, { EditorProps, Monaco } from "@monaco-editor/react";
import { marked } from "marked";
import { compact } from "lodash-es";
import { resolveMdContent } from "./md-utils/md-content";
import { endowWithPosition } from "./md-utils/common";
import { resolveMdMeta } from "./md-utils/md-meta";
import { TError } from "@site/src/components/editor/md-utils/error";
import {
  ESupportLanguage,
  IQuizEditorValue,
  TModelWrapper,
} from "@site/src/components/editor/type";
import { formatModels } from "@site/src/components/editor/utils/model";
import { useDebounceFn, useDeepCompareEffect } from "ahooks";
import prettier from "prettier/standalone";
import parserMarkdown from "prettier/plugins/markdown";
import { useColorMode } from "@docusaurus/theme-common";

function initTheme(monaco: Monaco) {
  monaco.editor.setTheme("vs");
}

export type TQuizEditorProps = {
  onQuizChange?: (value: IQuizEditorValue) => void;
  onError?: (errors: TError[]) => void;
  activeModelIndex?: number;
  onActiveModelChange?: (index: number) => void;
  modelWrappers?: TModelWrapper[];
  onModelWrappersChange?: (modelWrappers: TModelWrapper[]) => void;
  isLoading?: boolean;
};

function Editor(props: TQuizEditorProps & EditorProps) {
  const {
    onQuizChange,
    onError,
    modelWrappers = [],
    onModelWrappersChange,
    activeModelIndex,
    onActiveModelChange,
    isLoading,
    ...rest
  } = props;
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const refresh = useState({})[1];
  const { colorMode } = useColorMode();

  console.log(colorMode);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    initTheme(monaco);
    registerSnippet(monaco);

    editor.addAction({
      id: "format-markdown",
      label: "Format Markdown",
      keybindings: ["ctrl+shift+f"],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: async (ed: any) => {
        const value = ed.getValue();
        const formatted = await prettier.format(value, {
          parser: "markdown",
          plugins: [parserMarkdown],
        });
        console.log(formatted);
        ed.setValue(formatted);
      },
    });

    refresh({});
  };

  const handleEditorChange = value => {
    if (!value || isLoading) {
      return;
    }
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
      console.log("error: ", e);
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
      true,
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

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) {
      return;
    }

    if (colorMode === "dark") {
      monacoRef.current?.editor.setTheme("vs-dark");
    } else {
      monacoRef.current?.editor.setTheme("vs");
    }
  }, [colorMode, editorRef.current, monacoRef.current]);

  useDeepCompareEffect(() => {
    if (
      modelWrappers?.length > 0 &&
      editorRef.current &&
      monacoRef.current &&
      !isLoading
    ) {
      initModels(monacoRef.current, editorRef.current, modelWrappers);
    }
  }, [modelWrappers, editorRef.current, monacoRef.current, isLoading]);

  const registerSnippet = monaco => {
    if (isLoading) {
      return;
    }

    monaco.languages.registerCompletionItemProvider(ESupportLanguage.MARKDOWN, {
      triggerCharacters: ["#"], // 触发自动补全的字符
      provideCompletionItems: function (model, position) {
        return {
          suggestions: [
            {
              label: "## 插入题目模板",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText:
                '## ${1:1}. ${2:输入题目内容}\n> {type: ${3:"select"}, answer: ["${4:A}"], score: ${5:1}}\n\n- (${6:A}) ${7:选项内容}',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: position.column - 1,
                endColumn: position.column,
              },
            },
          ],
        };
      },
    });
    monaco.languages.registerCompletionItemProvider(ESupportLanguage.MARKDOWN, {
      triggerCharacters: [">"], // 触发自动补全的字符
      provideCompletionItems: function (model, position) {
        return {
          suggestions: [
            {
              label: "> 快速插入meta",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText:
                '> {type: ${2:"select"}, answer: [${3:"A"}], score: ${4:1}}',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: position.column - 1,
                endColumn: position.column,
              },
            },
          ],
        };
      },
    });
    monaco.languages.registerCompletionItemProvider(ESupportLanguage.MARKDOWN, {
      triggerCharacters: ["-"], // 触发自动补全的字符
      provideCompletionItems: function (model, position) {
        return {
          suggestions: [
            {
              label: "- 插入选项模版",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "- (${1:A}) ${2:选项内容}",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: position.column - 1,
                endColumn: position.column,
              },
            },
          ],
        };
      },
    });
  };

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
