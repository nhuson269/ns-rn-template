import alertHelper from "modals/alert/helper";
import TaskDemoModel from "models/demo/TaskDemoModel";
import { todoService } from "services/demo/typicode-services";
import create from "zustand";

type TodoListTypicodeStore = {
  isLoading: boolean;
  data: TaskDemoModel[];
  getData: () => Promise<void>;
  reset: () => void;
};

export const todoListTypicodeDemoStore = create<TodoListTypicodeStore>((set, get) => ({
  isLoading: false,
  data: [],
  getData: async () => {
    if (get().isLoading) {
      return;
    }
    set({ isLoading: true });
    const result = await todoService.getList(get().data.length);
    if (result.kind === "ok") {
      const dataResult = result.data;
      set({ isLoading: false, data: dataResult });
    } else {
      set({ isLoading: false });
      if (result.message) {
        alertHelper.show({ message: result.message });
      }
    }
  },
  reset: () =>
    set({
      isLoading: false,
      data: [],
    }),
}));
