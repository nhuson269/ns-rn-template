import navActions from "navigators/shared/actions";
import { userDemoStore } from "stores";
import create from "zustand";

type HomeStore = {
  goTodoListHerokuapp: () => void;
  goTodoListTypicode: () => void;
  goTodoDetailHerokuapp: () => void;
  reset: () => void;
};

export const homeDemoStore = create<HomeStore>(() => ({
  goTodoListHerokuapp: () => {
    if (userDemoStore.getState().isSignIn) {
      navActions.navigateToTodoListDemo({ type: "Herokuapp" });
    } else {
      navActions.navigateToSignInDemo({ onNavigateSuccess: "goTodoListHerokuapp" });
    }
  },
  goTodoListTypicode: () => {
    // navActions.navigateToTodoListDemo({ type: "Typicode" });
    navActions.navigateToTodoListTypicodeDemo();
  },
  goTodoDetailHerokuapp: () => {},
  reset: () => {},
}));
