import { useTutorialStore } from "@/store/useTutorialStore";
import { tutorialConfig, type Chapter } from "@/data/chapters";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface SidebarProps {
  onSelectChapter?: (chapter: Chapter) => void;
}

export default function Sidebar({ onSelectChapter }: SidebarProps) {
  const { currentChapter, isSidebarOpen, setSidebarOpen } = useTutorialStore();

  const handleSelect = (chapter: Chapter) => {
    onSelectChapter?.(chapter);
    setSidebarOpen(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-30 w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:top-auto md:bottom-auto md:z-auto md:w-64 md:shadow-none md:rounded-2xl md:h-fit md:sticky md:top-24",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full overflow-y-auto px-4 py-5 md:px-5 md:py-6">
          <div className="mb-5 flex items-center gap-2 text-slate-900">
            <FileText size={18} className="text-sky-500" />
            <h2 className="text-base font-bold">教程目录</h2>
          </div>

          <nav aria-label="章节导航">
            <ol className="space-y-1">
              {tutorialConfig.chapters.map((chapter) => {
                const isActive = currentChapter.id === chapter.id;
                return (
                  <li key={chapter.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(chapter)}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200",
                        isActive
                          ? "bg-sky-50 text-sky-800 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                          isActive
                            ? "bg-sky-500 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                        )}
                      >
                        {chapter.order}
                      </span>
                      <span className="leading-5">
                        {chapter.title}
                      </span>
                      {isActive && (
                        <span className="ml-auto mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </aside>
    </>
  );
}
