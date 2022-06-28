import { translate } from "languages";
import alertHelper from "modals/alert/helper";
import { SignInDemoParams } from "navigators";
import navActions from "navigators/shared/actions";
import { Keyboard } from "react-native";
import { userService } from "services/demo/herokuapp-service";
import { userDemoStore } from "stores";
import create from "zustand";

type SignInStore = {
  isLoading: boolean;
  params: SignInDemoParams | undefined;
  username: string;
  password: string;
  msgUsername: string | undefined;
  msgPassword: string | undefined;
  setParams: (value?: SignInDemoParams) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  login: () => void;
  goSignUp: () => void;
  goForgotPassword: () => void;
  onSkip: () => void;
  reset: () => void;
};

export const signInDemoStore = create<SignInStore>((set, get) => ({
  isLoading: false,
  params: undefined,
  username: "muh.nurali43@gmail.com",
  password: "12345678",
  msgUsername: "",
  msgPassword: "",
  setParams: value => set({ params: value }),
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
    const { isLoading, username, password, params } = get();
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
      userDemoStore.setState({ authToken: resultLogin.authToken });
      const resultMe = await userService.userMe();
      if (resultMe.kind === "ok") {
        userDemoStore.setState({ isSignIn: true, user: resultMe.data });
        if (params?.onNavigateSuccess === "goTodoListHerokuapp") {
          navActions.replaceToTodoListDemo({ type: "Herokuapp" });
        } else if (params?.onNavigateSuccess === "goTodoListTypicode") {
          navActions.replaceToTodoListDemo({ type: "Typicode" });
        } else {
          navActions.replaceToMainDemo();
        }
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
  onSkip: () => {
    if (!get().params?.onNavigateSuccess) {
      navActions.replaceToMainDemo();
    } else {
      navActions.goBack();
    }
  },
  reset: () =>
    set({
      isLoading: false,
      params: undefined,
      username: "muh.nurali43@gmail.com",
      password: "12345678",
      msgUsername: "",
      msgPassword: "",
    }),
}));
