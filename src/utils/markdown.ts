export const FALLBACK_IMAGES: Record<string, string> = {
  "10001 1.png": "10001.png",
  "10003 1.png": "10003.png",
  "10004 1.png": "10004.png",
  "f8809105045c42e6b00ca69aef83ea7a 1.png": "f8809105045c42e6b00ca69aef83ea7a.png",
};

const DOWNLOAD_LINKS: Record<string, { href: string; label: string }> = {
  "==点击下载==": {
    href: "downloads/epanet2.2.zip",
    label: "点击下载",
  },
  "==实测数据可在这里下载==": {
    href: "downloads/Anytown%20-%20Observed%20Pressures.dat",
    label: "实测数据可在这里下载",
  },
  "==自动校核工具可在这里下载==": {
    href: "downloads/AnytownCalibration.exe",
    label: "自动校核工具可在这里下载",
  },
  // 第五章 Markdown 中该标记缺少右半部分，做容错处理
  "==自动校核工具": {
    href: "downloads/AnytownCalibration.exe",
    label: "自动校核工具可在这里下载",
  },
};

export function preprocessMarkdown(content: string): string {
  let result = content;

  // 将 Obsidian 风格的图片引用 ![[filename.png|width]] 转换为标准 Markdown
  result = result.replace(
    /!\[\[([^|\]]+)(?:\|[^\]]*)?\]\]/g,
    (_match, rawFilename: string) => {
      const filename = rawFilename.trim();
      const resolved = FALLBACK_IMAGES[filename] ?? filename;
      const encoded = encodeURIComponent(resolved);
      return `![${resolved}](images/${encoded})`;
    }
  );

  // 将 ==高亮文本== 转换为下载链接（仅匹配已知下载标记）
  for (const [marker, { href, label }] of Object.entries(DOWNLOAD_LINKS)) {
    const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(
      new RegExp(escaped, "g"),
      `[${label}](${href})`
    );
  }

  // 移除 Obsidian 风格的高亮 ==文本==（未匹配下载链接的）
  result = result.replace(/==(.+?)==/g, "**$1**");

  // 确保 <center> 标签作为独立的 HTML 块被识别：前后添加空行
  result = result.replace(/\n<center>/g, "\n\n<center>");
  result = result.replace(/<\/center>\n/g, "</center>\n\n");

  return result;
}
