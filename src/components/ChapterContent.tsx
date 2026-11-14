import { useEffect, useState } from "react";
import { useTutorialStore } from "@/store/useTutorialStore";
import { type Chapter } from "@/data/chapters";
import MarkdownViewer from "./MarkdownViewer";
import InlineVideoPlayer from "./InlineVideoPlayer";
import { Loader2, AlertCircle } from "lucide-react";

interface ChapterContentProps {
  chapter: Chapter;
}

const INLINE_VIDEO_MARKERS: Record<string, { marker: string; src: string }> = {
  "first-model": {
    marker: "Anytown管网搭建全过程视频：",
    src: "videos/anytown-tutorial-h264.mp4",
  },
};

export default function ChapterContent({ chapter }: ChapterContentProps) {
  const { setLoading } = useTutorialStore();
  const [rawContent, setRawContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadContent = async () => {
      setIsFetching(true);
      setError(null);
      setLoading(true);

      try {
        const response = await fetch(chapter.file);
        if (!response.ok) {
          throw new Error(`无法加载章节内容：${response.statusText}`);
        }
        const text = await response.text();
        if (!cancelled) {
          setRawContent(text);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "加载失败");
        }
      } finally {
        if (!cancelled) {
          setIsFetching(false);
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      cancelled = true;
    };
  }, [chapter.file, setLoading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapter.id]);

  const inlineVideo = INLINE_VIDEO_MARKERS[chapter.id];

  let beforeVideo = rawContent;
  let afterVideo = "";

  if (inlineVideo) {
    const markerIndex = rawContent.indexOf(inlineVideo.marker);
    if (markerIndex !== -1) {
      const markerEnd = markerIndex + inlineVideo.marker.length;
      beforeVideo = rawContent.slice(0, markerEnd);
      afterVideo = rawContent.slice(markerEnd);
    }
  }

  if (isFetching) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        <p className="mt-3 text-sm">正在加载章节内容…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 p-8 text-center">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <h3 className="mt-4 text-lg font-semibold text-red-800">内容加载失败</h3>
        <p className="mt-2 text-sm text-red-600">{error}</p>
        <p className="mt-4 text-xs text-red-500">
          该章节可能尚未完成，请先阅读其他章节。
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <span className="inline-flex items-center rounded-xl bg-sky-50 px-4 py-2 text-2xl font-bold text-sky-700 shadow-sm">
          第 {chapter.order} 章
        </span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          {chapter.title}
        </h1>
      </div>

      <MarkdownViewer content={beforeVideo} />

      {inlineVideo && (
        <InlineVideoPlayer src={inlineVideo.src} />
      )}

      {afterVideo && <MarkdownViewer content={afterVideo} />}
    </div>
  );
}
