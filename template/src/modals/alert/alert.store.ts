import create from "zustand";

export type OpenProps = {
  message: string;
  title?: string | undefined;
  btLeftTitle?: string | undefined;
  btLeftAction?: () => void;
  btRightTitle?: string | undefined;
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
  open: props => {
    set({
      isVisible: true,
      title: props.title,
      message: props.message,
      btLeftTitle: props.btLeftTitle || "Ok",
      btRightTitle: props.btRightTitle,
      btLeftAction: () => {
        set({ isVisible: false });
        props.btLeftAction?.();
      },
      btRightAction: () => {
        set({ isVisible: false });
        props.btRightAction?.();
      },
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
