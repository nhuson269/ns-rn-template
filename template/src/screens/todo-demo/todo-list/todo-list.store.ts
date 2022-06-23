import alertHelper from "modals/alert/helper";
import TaskDemoModel from "models/demo/TaskModel";
import { taskService } from "services/herokuapp-service";
import create from "zustand";

type TodoListStore = {
  isLoading: boolean;
  isFetched: boolean;
  isLoadingMore: boolean;
  data: TaskDemoModel[];
  getData: () => Promise<void>;
  getDataMore: () => Promise<void>;
  reset: () => void;
};

export const todoListDemoStore = create<TodoListStore>((set, get) => ({
  isLoading: false,
  isFetched: false,
  isLoadingMore: false,
  data: [],
  getData: async () => {
    if (get().isLoading) {
      return;
    }
    set({ isLoading: true });
    const result = await taskService.getTasks(get().data.length);
    if (result.kind === "ok") {
      set({ isLoading: false, isFetched: true, data: result.data, isLoadingMore: false });
    } else {
      set({ isLoading: false, isFetched: true, isLoadingMore: false });
      if (result.message) {
        alertHelper.show({ message: result.message });
      }
    }
  },
  getDataMore: async () => {
    if (get().isLoading || get().isLoadingMore) {
      return;
    }
    set({ isLoadingMore: true });
    const result = await taskService.getTasks(get().data.length);
    if (get().isLoadingMore) {
      if (result.kind === "ok") {
        set({ isLoadingMore: false, data: get().data.concat(result.data) });
      } else {
        set({ isLoadingMore: false });
        if (result.message) {
          alertHelper.show({ message: result.message });
        }
      }
    }
  },
  reset: () =>
    set({
      isLoading: false,
      isFetched: false,
      isLoadingMore: false,
      data: [],
    }),
}));
