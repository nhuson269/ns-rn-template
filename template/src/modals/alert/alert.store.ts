import create from "zustand";

export type OpenProps = {
  message: string;
  title?: string;
  btLeftTitle?: string;
  btLeftAction?: () => void;
  btRightTitle?: string;
  btRightAction?: () => void;
};

type AlertStore = {
  isVisible: boolean;
  title: string | undefined;
  message: string;
  btLeftTitle: string;
  btRightTitle: string | undefined;
  btLeftAction: (() => void) | undefined;
  btRightAction: (() => void) | undefined;
  open: (props: OpenProps) => void;
  onDismiss: () => void;
  onShow: () => void;
};

export const alertStore = create<AlertStore>((set, get) => ({
  isVisible: false,
  title: undefined,
  message: "",
  btLeftTitle: "Ok",
  btRightTitle: undefined,
  btLeftAction: () => set({ isVisible: false }),
  btRightAction: undefined,
  open: (props: OpenProps) => {
    set({
      isVisible: true,
      title: props.title,
      message: props.message,
      btLeftTitle: props.btLeftTitle || "Ok",
      btRightTitle: props.btRightTitle,
      btLeftAction: props.btLeftAction || (() => set({ isVisible: false })),
      btRightAction: props.btRightAction,
    });
  },
  onDismiss: () => {
    if (get().isVisible) {
      set({ isVisible: false });
    }
  },
  onShow: () => {
    if (!get().isVisible) {
      set({ isVisible: true });
    }
  },
}));
