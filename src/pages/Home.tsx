import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChapterContent from "@/components/ChapterContent";
import { useTutorialStore } from "@/store/useTutorialStore";
import { getChapterById, getFirstChapter } from "@/data/chapters";

export default function Home() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { currentChapter, setCurrentChapter } = useTutorialStore();

  useEffect(() => {
    if (slug) {
      const matched = getChapterById(slug);
      if (matched) {
        setCurrentChapter(matched);
      } else {
        navigate(`/${getFirstChapter().id}`, { replace: true });
      }
    } else {
      navigate(`/${getFirstChapter().id}`, { replace: true });
    }
  }, [slug, setCurrentChapter, navigate]);

  const handleSelectChapter = (chapter: ReturnType<typeof getChapterById>) => {
    if (!chapter) return;
    setCurrentChapter(chapter);
    navigate(`/${chapter.id}`);
  };

  return (
    <div className="min-h-screen bg-[#e8f4fc]">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Sidebar onSelectChapter={handleSelectChapter} />

          <section className="min-w-0 flex-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 sm:p-8 lg:p-10">
              <ChapterContent chapter={currentChapter} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
