import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  text: string;
}

export default function ReactMarkdownComponent({ text }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold mb-10" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-semibold" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-medium" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-base font-medium" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-sm font-medium" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-xs font-medium" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-4 text-justify" {...props} />
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
        br: () => <br className="mb-10" />,
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside ml-4 mb-4" {...props} />
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
      {text}
    </ReactMarkdown>
  );
}
