import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import Image from "@site/src/components/docs/Image";
import { CodeBlock } from "@site/src/components/ui/CodeBlock";
import React from "react";
import { cn } from "@site/src/utils/class-utils";

const Markdown = ({
  raw,
  selectedClassName,
}: {
  raw: string;
  selectedClassName?: string;
}) => {
  return (
    <ReactMarkdown
      className={cn(
        "prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0",
        selectedClassName,
      )}
      skipHtml={false}
      remarkPlugins={[remarkMath, remarkGfm]}
      components={{
        img: Image,
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        code({ inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == "▍") {
              return (
                <span className="mt-1 cursor-default animate-pulse">▍</span>
              );
            }

            children[0] = (children[0] as string).replace("`▍`", "▍");
          }

          const match = /language-(\w+)/.exec(className || "");

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ""}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          );
        },
      }}
    >
      {raw}
    </ReactMarkdown>
  );
};

export default Markdown;
