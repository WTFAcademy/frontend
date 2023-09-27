import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import React from "react";
import { Button } from "@site/src/components/ui/Button";
import { marked } from "marked";
import defaultEditorProps from "@site/src/components/editor/props";

// define your extension array
const extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 -mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 -mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          "rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  Markdown,
];

const content = "<p>Hello World!</p>";

const Editor = ({
  className,
  onChange,
}: {
  className?: string;
  onChange: (value: any[]) => void;
}) => {
  const editor = useEditor({
    editorProps: {
      ...defaultEditorProps,
    },
    extensions: [...extensions],
    content,
    autofocus: "end",
  });

  const handleClick = () => {
    const markdownOutput = editor.storage.markdown.getMarkdown();
    console.log(markdownOutput);
    console.log(transform(markdownOutput));
    onChange(transform(markdownOutput));
  };

  return (
    <div className={className}>
      <Button onClick={handleClick}>测试</Button>
      <EditorContent editor={editor} />
    </div>
  );
};

const transform = (markdown: string) => {
  const jsonArr = marked.lexer(markdown);
  const group = chunkByHeading(jsonArr);

  const result = [];

  for (const item of group) {
    const [heading, metaContent, ...content] = item;
    const title = transformQuizTitle(heading);
    const meta = transformQuizMeta(metaContent);
    // todo: other 和 content
    const quiz = content.map(transformQuizContent);
    const options = quiz.filter(item => item.option);
    const other = quiz.filter(item => !item.option);
    result.push({
      title,
      meta,
      other,
      quiz: options,
    });
  }

  return result;
};

const chunkByHeading = (jsonArr: any[]) => {
  const result = [];

  jsonArr.forEach(item => {
    if (item.type === "heading") {
      result.push([item]);
    } else if (item.type === "space") {
      // ignore
    } else {
      result[result.length - 1].push(item);
    }
  });

  return result;
};

const transformQuizTitle = (json: any) => {
  const index = json.tokens[0].text;
  const title = json.tokens[2].text.trim();
  return {
    index,
    title,
  };
};

const transformQuizMeta = (json: any) => {
  const hasMeta = json.type === "blockquote";
  if (!hasMeta) return null;

  const metaString = json.tokens[0].tokens[1].text;
  const metaSplitItem = metaString.split(",");
  const obj = metaSplitItem.reduce((acc: any, cur: string) => {
    const [key, value] = cur.split(":");
    acc[key.trim()] = value.trim();
    return acc;
  }, {});

  return obj;
};

const transformQuizContent = (json: any) => {
  const text = json.tokens[0].text;
  const [, option, content] = /\((\w)\)\s*(.*)/.exec(text) || [];

  if (!option) {
    return {
      other: text,
    };
  }

  return {
    option,
    content,
  };
};

export default Editor;
