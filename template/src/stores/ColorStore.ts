import { MMKVStorage, StorageKey } from "utils/storage-utils";
import create from "zustand";
import { persist } from "zustand/middleware";

type ColorStore = {
  // text
  t_01: string;
  t_02: string;
  t_03: string;
  // background
  bg_01: string;
  bg_02: string;
  // border
  b_01: string;
  b_02: string;
  // other
  line_01: string;
  unactive_02: string;
  error: string;
  // method
  setGreen: () => void;
  setBlue: () => void;
  setViolet: () => void;
};

export const colorStore = create<ColorStore, [["zustand/persist", ColorStore]]>(
  persist(
    set => ({
      t_01: "#FFFFFF",
      t_02: "#1F1C39",
      t_03: "green",
      bg_01: "#FFFFFF",
      bg_02: "#F0F5FA",
      b_01: "#C9D9E0",
      b_02: "#F4F6F8",
      line_01: "#F1E0DC",
      unactive_02: "#BBC3C6",
      error: "red",
      setGreen: () => {
        set({ t_03: "green" });
      },
      setBlue: () => {
        set({ t_03: "blue" });
      },
      setViolet: () => {
        set({ t_03: "violet" });
      },
    }),
    {
      name: StorageKey.COLOR_THEME,
      getStorage: () => MMKVStorage,
    },
  ),
);
