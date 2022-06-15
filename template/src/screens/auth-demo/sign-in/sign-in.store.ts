import { translate } from "languages";
import navActions from "navigators/shared/actions";
import { Keyboard } from "react-native";
import { delay } from "utils/delay";
import create from "zustand";

type SignInDemoStore = {
  isLoading: boolean;
  isFetched: boolean;
  username: string;
  password: string;
  msgUsername: string;
  msgPassword: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  login: () => void;
  goSignUp: () => void;
  goForgotPassword: () => void;
  reset: () => void;
};

export const signInDemoStore = create<SignInDemoStore>((set, get) => ({
  isLoading: false,
  isFetched: false,
  username: "",
  password: "",
  msgUsername: "",
  msgPassword: "",
  setUsername: value => {
    if (value !== get().username) {
      set({ username: value, msgUsername: "" });
    }
  },
  setPassword: value => {
    if (value !== get().password) {
      set({ password: value, msgPassword: "" });
    }
  },
  login: async () => {
    Keyboard.dismiss();
    const { isLoading, username, password } = get();
    if (isLoading) {
      return;
    }
    if (!username || !password) {
      if (!username) {
        set({ msgUsername: translate("errors.emptyUsername") ?? "" });
      }
      if (!password) {
        set({ msgPassword: translate("errors.emptyPassword") ?? "" });
      }
      return;
    }
    set({ isLoading: true, msgUsername: "", msgPassword: "" });
    await delay(1500);
    set({ isLoading: false });
    navActions.navigateToMain();
  },
  goSignUp: () => {
    navActions.navigateToSignUp({ username: get().username });
  },
  goForgotPassword: () => {
    navActions.navigateToForgotPassword({ username: get().username });
  },
  reset: () =>
    set({
      isLoading: false,
      isFetched: false,
      username: "",
      password: "",
      msgUsername: "",
      msgPassword: "",
    }),
}));
