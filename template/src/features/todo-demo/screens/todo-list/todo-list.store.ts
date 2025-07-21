import alertHelper from 'modals/alert/helper';
import TaskDemoModel from 'models/demo/TaskDemoModel';
import {TodoListDemoParams} from 'navigators';
import {taskService} from 'services/demo/herokuapp-service';
import {todoService} from 'services/demo/typicode-services';
import {create} from 'zustand';

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
  setParams: value => set({params: value}),
  getData: async () => {
    if (get().isLoading) {
      return;
    }
    set({isLoading: true});
    const result =
      get().params?.type === 'Herokuapp'
        ? await taskService.getTasks(get().data.length)
        : await todoService.getList(get().data.length);
    if (result.kind === 'ok') {
      const dataResult = result.data;
      set({
        isLoading: false,
        data: dataResult,
        isLoadingMore: false,
        isEndPage: dataResult.length < get().limit,
      });
    } else {
      set({isLoading: false});
      if (result.message) {
        alertHelper.show({message: result.message});
      }
    }
  },
  getDataMore: async () => {
    if (get().isLoading || get().isLoadingMore || get().isEndPage) {
      return;
    }
    set({isLoadingMore: true});
    const result =
      get().params?.type === 'Herokuapp'
        ? await taskService.getTasks(get().data.length)
        : await todoService.getList(get().data.length);
    if (get().isLoadingMore) {
      if (result.kind === 'ok') {
        const dataResult = result.data;
        set({
          isLoadingMore: false,
          isEndPage: dataResult.length < get().limit,
          data: get().data.concat(dataResult),
        });
      } else {
        set({isLoadingMore: false});
        if (result.message) {
          alertHelper.show({message: result.message});
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
