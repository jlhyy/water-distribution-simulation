import { Menu, Droplets, BookOpen } from "lucide-react";
import { useTutorialStore } from "@/store/useTutorialStore";
import { tutorialConfig } from "@/data/chapters";

export default function Header() {
  const { toggleSidebar } = useTutorialStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-md shadow-sky-200">
              <Droplets size={20} strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                {tutorialConfig.title}
              </h1>
              <p className="text-xs text-slate-500 leading-tight">
                {tutorialConfig.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center">
              <a
                href="/"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors"
              >
                <BookOpen size={16} />
                {tutorialConfig.navTitle}
              </a>
            </nav>

            <button
              type="button"
              onClick={toggleSidebar}
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="切换章节导航"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
