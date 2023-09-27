import React, { useRef } from "react";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { marked } from "marked";
import { transform } from "@site/src/components/editor/transform";
import { IQuiz } from "@site/src/typings/quiz";

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

const DEFAULT_VALUE = `
## What happens when you call \`__string()\` ?
> {index: 1, type: 'select', answer: ['A']}

![图片](https://avatars.githubusercontent.com/u/20828177?v=4)

\`\`\`solidity
    // 用户领取代币函数
    function requestTokens() external {
        require(requestedAddress[msg.sender] == false, "Can't Request Multiple Times!"); // 每个地址只能领一次
        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象
        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了

        token.transfer(msg.sender, amountAllowed); // 发送token
        requestedAddress[msg.sender] = true; // 记录领取地址
        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件
    }
\`\`\`

- (A) Two Strings are printed: "The current time is 3 pm" and aThe mood is good"
- (B) One Strings is printed: "The current time is 3 pm"
- (C) No String is printed
- (D) All of above are correct.

`;

type TProps = {
  onChange: (value: IQuiz[]) => void;
};

function Editor(props: TProps) {
  const { onChange } = props;
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    initTheme(monaco);
  };

  const handleChange = value => {
    try {
      const out = marked.lexer(value);
      onChange(transform(out));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="markdown"
      defaultValue={DEFAULT_VALUE}
      onMount={handleEditorDidMount}
      onChange={handleChange}
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
