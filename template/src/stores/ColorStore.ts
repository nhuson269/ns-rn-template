import { blueColor, Color, greenColor, violetColor } from "theme/color";
import { MMKVStorage, StorageKey } from "utils/storage-utils";
import create from "zustand";
import { persist } from "zustand/middleware";

type ColorStore = {
  colors: Color;
  setGreen: () => void;
  setBlue: () => void;
  setViolet: () => void;
};

export const colorStore = create<ColorStore, [["zustand/persist", ColorStore]]>(
  persist(
    set => ({
      colors: greenColor,
      setGreen: () => {
        set({ colors: greenColor });
      },
      setBlue: () => {
        set({ colors: blueColor });
      },
      setViolet: () => {
        set({ colors: violetColor });
      },
    }),
    {
      name: StorageKey.COLOR_THEME,
      getStorage: () => MMKVStorage,
    },
  ),
);
