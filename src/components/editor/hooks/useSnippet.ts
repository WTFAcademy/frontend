import { ESupportLanguage } from "@site/src/components/editor/type";
import { useEffect, useRef } from "react";

const useSnippet = () => {
  const snippetDisposableRefs = useRef([]);

  const registerSnippet = monaco => {
    snippetDisposableRefs.current = [
      monaco.languages.registerCompletionItemProvider(
        ESupportLanguage.MARKDOWN,
        {
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
                    monaco.languages.CompletionItemInsertTextRule
                      .InsertAsSnippet,
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
        },
      ),
      monaco.languages.registerCompletionItemProvider(
        ESupportLanguage.MARKDOWN,
        {
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
                    monaco.languages.CompletionItemInsertTextRule
                      .InsertAsSnippet,
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
        },
      ),
      monaco.languages.registerCompletionItemProvider(
        ESupportLanguage.MARKDOWN,
        {
          triggerCharacters: ["-"], // 触发自动补全的字符
          provideCompletionItems: function (model, position) {
            return {
              suggestions: [
                {
                  label: "- 插入选项模版",
                  kind: monaco.languages.CompletionItemKind.Keyword,
                  insertText: "- (${1:A}) ${2:选项内容}",
                  insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                      .InsertAsSnippet,
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
        },
      ),
    ];
  };

  const disposeSnippet = () => {
    snippetDisposableRefs.current.forEach(disposable => disposable?.dispose());
  };

  useEffect(() => {
    return () => {
      disposeSnippet();
    };
  }, []);

  return {
    registerSnippet,
  };
};

export default useSnippet;
