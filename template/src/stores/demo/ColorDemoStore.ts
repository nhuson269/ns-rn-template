import { blueDemoColor, ColorDemo, greenDemoColor, violetDemoColor } from "theme";
import { MMKVStorage, StorageKey } from "utils/storage-utils";
import create from "zustand";
import { persist } from "zustand/middleware";

type ColorDemoStore = {
  colors: ColorDemo;
  setGreen: () => void;
  setBlue: () => void;
  setViolet: () => void;
};

export const colorDemoStore = create<ColorDemoStore, [["zustand/persist", ColorDemoStore]]>(
  persist(
    set => ({
      colors: greenDemoColor,
      setGreen: () => {
        set({ colors: greenDemoColor });
      },
      setBlue: () => {
        set({ colors: blueDemoColor });
      },
      setViolet: () => {
        set({ colors: violetDemoColor });
      },
    }),
    {
      name: StorageKey.COLOR_DEMO_THEME,
      getStorage: () => MMKVStorage,
    },
  ),
);
