import { Play, FileVideo } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
          <Play size={18} fill="currentColor" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">实操演示视频</p>
        </div>
        <a
          href={src}
          download
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <FileVideo size={14} />
          下载视频
        </a>
      </div>

      <div className="overflow-hidden rounded-xl bg-slate-900">
        <video
          controls
          preload="metadata"
          className="aspect-video w-full"
          poster=""
        >
          <source src={src} type="video/mp4" />
          <p className="p-6 text-center text-sm text-slate-300">
            您的浏览器不支持 HTML5 视频播放，请
            <a href={src} download className="text-sky-400 underline">
              点击下载
            </a>
            后观看。
          </p>
        </video>
      </div>
    </div>
  );
}
