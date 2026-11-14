import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { preprocessMarkdown } from "@/utils/markdown";

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  const processed = preprocessMarkdown(content);

  return (
    <article className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-slate-300 shadow-sm">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
        }}
      >
        {processed}
      </ReactMarkdown>
    </article>
  );
}
