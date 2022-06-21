import { translate } from "languages";
import alertHelper from "modals/alert/helper";
import { Keyboard } from "react-native";
import { delay } from "utils/delay";
import create from "zustand";

type ForgotPasswordDemoStore = {
  isLoading: boolean;
  isFetched: boolean;
  username: string;
  msgUsername: string | undefined;
  setUsername: (value: string) => void;
  goConfirm: () => void;
  reset: () => void;
};

export const forgotPasswordDemoStore = create<ForgotPasswordDemoStore>((set, get) => ({
  isLoading: false,
  isFetched: false,
  username: "",
  msgUsername: "",
  setUsername: value => {
    if (value !== get().username) {
      set({ username: value, msgUsername: "" });
    }
  },
  goConfirm: async () => {
    Keyboard.dismiss();
    const { isLoading, username } = get();
    if (isLoading) {
      return;
    }
    if (!username) {
      set({ msgUsername: translate("errors.emptyUsername") });
      return;
    }
    set({ isLoading: true, msgUsername: "" });
    await delay(1500);
    set({ isLoading: false });
    alertHelper.show({ message: translate("errors.featureBeingWorked") || "" });
  },
  reset: () =>
    set({
      isLoading: false,
      isFetched: false,
      username: "",
      msgUsername: "",
    }),
}));
