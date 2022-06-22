import { translate } from "languages";
import alertHelper from "modals/alert/helper";
import navActions from "navigators/shared/actions";
import { Keyboard } from "react-native";
import { userService } from "services/herokuapp-service";
import { userStore } from "stores";
import create from "zustand";

type SignInStore = {
  isLoading: boolean;
  isFetched: boolean;
  username: string;
  password: string;
  msgUsername: string | undefined;
  msgPassword: string | undefined;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  login: () => void;
  goSignUp: () => void;
  goForgotPassword: () => void;
  reset: () => void;
};

export const signInDemoStore = create<SignInStore>((set, get) => ({
  isLoading: false,
  isFetched: false,
  username: "muh.nurali43@gmail.com",
  password: "12345678",
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
        set({ msgUsername: translate("errors.emptyUsername") });
      }
      if (!password) {
        set({ msgPassword: translate("errors.emptyPassword") });
      }
      return;
    }
    set({ isLoading: true, msgUsername: "", msgPassword: "" });
    const resultLogin = await userService.login(username, password);
    if (resultLogin.kind === "ok") {
      await userStore.getState().setAuthToken(resultLogin.authToken);
      const resultMe = await userService.userMe();
      if (resultMe.kind === "ok") {
        userStore.getState().setUser(resultMe.data);
        navActions.navigateToMainDemo();
      } else if (resultMe.message) {
        alertHelper.show({ message: resultMe.message });
      }
    } else if (resultLogin.message) {
      alertHelper.show({ message: resultLogin.message });
    }
    set({ isLoading: false });
  },
  goSignUp: () => {
    navActions.navigateToSignUpDemo({ username: get().username });
  },
  goForgotPassword: () => {
    navActions.navigateToForgotPasswordDemo({ username: get().username });
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
