import alertHelper from '@/modals/alert/helper';
import TaskDemoModel from '@/models/demo/TaskDemoModel';
import { TodoListDemoParams } from '@/navigators';
import { taskService } from '@/services/demo/herokuapp-service';
import { todoService } from '@/services/demo/typicode-services';
import { create } from 'zustand';

type TodoListStore = {
  params: TodoListDemoParams | undefined;
  isLoading: boolean;
  isLoadingMore: boolean;
  isEndPage: boolean;
  limit: number;
  data: TaskDemoModel[];
  setParams: (value: TodoListDemoParams) => void;
  getData: () => Promise<void>;
  getDataMore: () => Promise<void>;
  reset: () => void;
};

export const todoListDemoStore = create<TodoListStore>((set, get) => ({
  params: undefined,
  isLoading: false,
  isLoadingMore: false,
  isEndPage: false,
  limit: 15,
  data: [],
  setParams: value => set({ params: value }),
  getData: async () => {
    const { isLoading, limit, data, params } = get();
    if (isLoading) {
      return;
    }
    set({ isLoading: true });
    const result =
      params?.type === 'Herokuapp'
        ? await taskService.getTasks(data.length)
        : await todoService.getList(data.length);
    if (result.kind === 'ok') {
      const dataResult = result.data;
      set({
        isLoading: false,
        data: dataResult,
        isLoadingMore: false,
        isEndPage: dataResult.length < limit,
      });
    } else {
      set({ isLoading: false });
      if (result.message) {
        alertHelper.show({ message: result.message });
      }
    }
  },
  getDataMore: async () => {
    const { isLoading, isLoadingMore, isEndPage, limit, data, params } = get();
    if (isLoading || isLoadingMore || isEndPage) {
      return;
    }
    set({ isLoadingMore: true });
    const result =
      params?.type === 'Herokuapp'
        ? await taskService.getTasks(data.length)
        : await todoService.getList(data.length);
    if (isLoadingMore) {
      if (result.kind === 'ok') {
        const dataResult = result.data;
        set({
          isLoadingMore: false,
          isEndPage: dataResult.length < limit,
          data: data.concat(dataResult),
        });
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
      params: undefined,
      isLoading: false,
      isLoadingMore: false,
      isEndPage: false,
      limit: 15,
      data: [],
    }),
}));
