import { translate } from "languages";
import navActions from "navigators/shared/actions";
import { Keyboard } from "react-native";
import { delay } from "utils/delay";
import create from "zustand";

type SignUpStore = {
  isLoading: boolean;
  isFetched: boolean;
  username: string;
  password: string;
  passwordConfirm: string;
  msgUsername: string;
  msgPassword: string;
  msgPasswordConfirm: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  signUp: () => void;
  reset: () => void;
};

export const signUpStore = create<SignUpStore>((set, get) => ({
  isLoading: false,
  isFetched: false,
  username: "",
  password: "",
  passwordConfirm: "",
  msgUsername: "",
  msgPassword: "",
  msgPasswordConfirm: "",
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
  setPasswordConfirm: value => {
    if (value !== get().passwordConfirm) {
      set({ passwordConfirm: value, msgPasswordConfirm: "" });
    }
  },
  signUp: async () => {
    Keyboard.dismiss();
    const { isLoading, username, password, passwordConfirm } = get();
    if (isLoading) {
      return;
    }
    if (!username || !password || !passwordConfirm) {
      if (!username) {
        set({ msgUsername: translate("errors.emptyUsername") ?? "" });
      }
      if (!password) {
        set({ msgPassword: translate("errors.emptyPassword") ?? "" });
      }
      if (!passwordConfirm) {
        set({ msgPasswordConfirm: translate("errors.emptyPassword") ?? "" });
      }
      return;
    }
    if (password !== passwordConfirm) {
      set({ msgPasswordConfirm: translate("errors.passwordConfirmFail") ?? "" });
      return;
    }
    set({ isLoading: true, msgUsername: "", msgPassword: "", msgPasswordConfirm: "" });
    await delay(1500);
    set({ isLoading: false });
    navActions.navigateToMain();
  },
  reset: () =>
    set({
      isLoading: false,
      isFetched: false,
      username: "",
      password: "",
      passwordConfirm: "",
      msgUsername: "",
      msgPassword: "",
      msgPasswordConfirm: "",
    }),
}));
