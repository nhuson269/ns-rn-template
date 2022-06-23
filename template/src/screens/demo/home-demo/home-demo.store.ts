import navActions from "navigators/shared/actions";
import create from "zustand";

type HomeStore = {
  goTodoListHerokuapp: () => void;
  goTodoDetailHerokuapp: () => void;
  reset: () => void;
};

export const homeDemoStore = create<HomeStore>(() => ({
  goTodoListHerokuapp: () => {
    navActions.navigateToTodoListDemo();
  },
  goTodoDetailHerokuapp: () => {},
  reset: () => {},
}));
