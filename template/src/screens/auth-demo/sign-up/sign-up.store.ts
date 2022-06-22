import { translate } from "languages";
import alertHelper from "modals/alert/helper";
import navActions from "navigators/shared/actions";
import { Keyboard } from "react-native";
import { userService } from "services/herokuapp-service";
import { userStore } from "stores";
import create from "zustand";

type SignUpStore = {
  isLoading: boolean;
  isFetched: boolean;
  username: string;
  fullname: string;
  password: string;
  passwordConfirm: string;
  msgUsername: string | undefined;
  msgFullname: string | undefined;
  msgPassword: string | undefined;
  msgPasswordConfirm: string | undefined;
  setUsername: (value: string) => void;
  setFullname: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  signUp: () => void;
  reset: () => void;
};

export const signUpDemoStore = create<SignUpStore>((set, get) => ({
  isLoading: false,
  isFetched: false,
  username: "",
  fullname: "",
  password: "",
  passwordConfirm: "",
  msgUsername: "",
  msgFullname: "",
  msgPassword: "",
  msgPasswordConfirm: "",
  setUsername: value => {
    if (value !== get().username) {
      set({ username: value, msgUsername: "" });
    }
  },
  setFullname: value => {
    if (value !== get().fullname) {
      set({ fullname: value, msgFullname: "" });
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
    const { isLoading, username, fullname, password, passwordConfirm } = get();
    if (isLoading) {
      return;
    }
    if (!username || !fullname || !password || !passwordConfirm) {
      if (!username) {
        set({ msgUsername: translate("errors.emptyUsername") });
      }
      if (!fullname) {
        set({ msgUsername: translate("errors.emptyFullname") });
      }
      if (!password) {
        set({ msgPassword: translate("errors.emptyPassword") });
      }
      if (!passwordConfirm) {
        set({ msgPasswordConfirm: translate("errors.emptyPassword") });
      }
      return;
    }
    if (password !== passwordConfirm) {
      set({ msgPasswordConfirm: translate("errors.passwordConfirmFail") });
      return;
    }
    set({ isLoading: true, msgUsername: "", msgPassword: "", msgPasswordConfirm: "" });
    const resultRegister = await userService.register(fullname, username, password);
    if (resultRegister.kind === "ok") {
      await userStore.getState().setAuthToken(resultRegister.authToken);
      const resultMe = await userService.userMe();
      if (resultMe.kind === "ok") {
        userStore.getState().setUser(resultMe.data);
        navActions.navigateToMainDemo();
      } else if (resultMe.message) {
        alertHelper.show({ message: resultMe.message });
      }
    } else if (resultRegister.message) {
      alertHelper.show({ message: resultRegister.message });
    }
    set({ isLoading: false });
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
