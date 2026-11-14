import { create } from "zustand";
import { type Chapter, getFirstChapter } from "@/data/chapters";

interface TutorialState {
  currentChapter: Chapter;
  isSidebarOpen: boolean;
  isLoading: boolean;
  setCurrentChapter: (chapter: Chapter) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useTutorialStore = create<TutorialState>((set) => ({
  currentChapter: getFirstChapter(),
  isSidebarOpen: false,
  isLoading: false,
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
