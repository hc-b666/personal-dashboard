import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeMirror from "@uiw/react-codemirror";

import { Button } from "@/common/components/ui/button";

export default function AboutMeEditor() {
  const [tab, setTab] = useState<"preview" | "code">("code");
  const [code, setCode] = useState("# Hello, *World*!");

  const handleChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  return (
    <div className="flex-grow flex flex-col gap-5">
      <div className="flex items-center">
        <Button
          size="sm"
          variant={tab === "preview" ? "secondary" : "ghost"}
          onClick={() => setTab("preview")}
        >
          Preview
        </Button>
        <Button
          size="sm"
          variant={tab === "code" ? "secondary" : "ghost"}
          onClick={() => setTab("code")}
        >
          Code
        </Button>
      </div>

      <div className="flex-grow">
        {tab === "preview" ? (
          <Preview code={code} />
        ) : (
          <Code code={code} handleChange={handleChange} />
        )}
      </div>

      <Button className="self-end">Save</Button>
    </div>
  );
}

function Preview({ code }: { code: string }) {
  return (
    <div className="h-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h1 className="text-xl font-semibold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h1 className="text-lg font-medium" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h1 className="text-base font-medium" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h1 className="text-sm font-medium" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h1 className="text-xs font-medium" {...props} />
          ),
          a: ({ node, ...props }) => {
            return (
              <a
                className="text-blue-500 text-base"
                {...props}
                target="_blank"
                rel="noopener noreferrer"
              />
            );
          },
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside ml-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {code}
      </ReactMarkdown>
    </div>
  );
}

function Code({
  code,
  handleChange,
}: {
  code: string;
  handleChange: (value: string) => void;
}) {
  return (
    <div className="h-full">
      <CodeMirror
        value={code}
        height="100%"
        className="h-full"
        theme={"light"}
        onChange={handleChange}
      />
    </div>
  );
}
