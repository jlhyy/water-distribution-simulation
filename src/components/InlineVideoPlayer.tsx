interface InlineVideoPlayerProps {
  src: string;
}

export default function InlineVideoPlayer({ src }: InlineVideoPlayerProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl bg-slate-900 shadow-sm">
      <video
        controls
        preload="metadata"
        className="aspect-video w-full"
      >
        <source src={src} type="video/mp4" />
        <p className="p-6 text-center text-sm text-slate-300">
          您的浏览器不支持 HTML5 视频播放。
        </p>
      </video>
    </div>
  );
}
