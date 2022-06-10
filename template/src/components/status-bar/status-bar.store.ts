import create from "zustand";

type StatusBarStore = {
  style: "default" | "light-content" | "dark-content";
  setStyle: (value: "default" | "light-content" | "dark-content") => void;
  setLight: () => void;
  setDark: () => void;
  reset: () => void;
};

export const statusBarStore = create<StatusBarStore>((set, get) => ({
  style: "dark-content",
  setStyle: value => {
    const style = get().style;
    if (value !== style) {
      set({ style: value });
    }
  },
  setLight: () => {
    const style = get().style;
    if (style !== "light-content") {
      set({ style: "light-content" });
    }
  },
  setDark: () => {
    const style = get().style;
    if (style !== "dark-content") {
      set({ style: "dark-content" });
    }
  },
  reset: () => set({ style: "dark-content" }),
}));
