export interface Chapter {
  id: string;
  title: string;
  file: string;
  order: number;
}

export interface TutorialConfig {
  title: string;
  subtitle: string;
  navTitle: string;
  chapters: Chapter[];
}

export const tutorialConfig: TutorialConfig = {
  title: "供水管网水力建模基础教程",
  subtitle: "从零开始建立、校核与应用水力模型",
  navTitle: "水力建模教程",
  chapters: [
    {
      id: "what-is-hydraulic-model",
      title: "供水管网水力模型是干什么的",
      file: "chapters/1.供水管网水力模型是干什么的.md",
      order: 1,
    },
    {
      id: "intro-epanet",
      title: "认识 EPANET 软件",
      file: "chapters/2.认识EPANET软件.md",
      order: 2,
    },
    {
      id: "epanet-interface",
      title: "EPANET 界面介绍",
      file: "chapters/3.EPANET界面介绍.md",
      order: 3,
    },
    {
      id: "first-model",
      title: "搭建第一个水力模型",
      file: "chapters/4.搭建第一个水力模型.md",
      order: 4,
    },
    {
      id: "model-calibration",
      title: "水力模型校核",
      file: "chapters/5.水力模型校核.md",
      order: 5,
    },
    {
      id: "auto-calibration-tool",
      title: "自动校核工具分析",
      file: "chapters/6.自动校核工具分析.md",
      order: 6,
    },
  ],
};

export const getChapterById = (id: string): Chapter | undefined =>
  tutorialConfig.chapters.find((chapter) => chapter.id === id);

export const getFirstChapter = (): Chapter => tutorialConfig.chapters[0];
