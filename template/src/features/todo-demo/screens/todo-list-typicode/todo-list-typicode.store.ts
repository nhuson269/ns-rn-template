import alertHelper from 'modals/alert/helper';
import TaskDemoModel from 'models/demo/TaskDemoModel';
import {todoService} from 'services/demo/typicode-services';
import {create} from 'zustand';

type TodoListTypicodeStore = {
  isLoading: boolean;
  isEndPage: boolean;
  limit: number;
  data: TaskDemoModel[];
  dataDisplay: TaskDemoModel[];
  getData: () => Promise<void>;
  getDataMore: () => void;
  reset: () => void;
};

export const todoListTypicodeDemoStore = create<TodoListTypicodeStore>(
  (set, get) => ({
    isLoading: false,
    isLoadingMore: false,
    isEndPage: false,
    limit: 15,
    data: [],
    dataDisplay: [],
    getData: async () => {
      if (get().isLoading) {
        return;
      }
      set({isLoading: true});
      const result = await todoService.getList();
      if (result.kind === 'ok') {
        const dataResult = result.data;
        const displayData = getDataDisplay(dataResult, [], get().limit);
        set({
          isLoading: false,
          data: dataResult,
          dataDisplay: displayData,
          isEndPage: displayData.length >= dataResult.length,
        });
      } else {
        set({isLoading: false});
        if (result.message) {
          alertHelper.show({message: result.message});
        }
      }
    },
    getDataMore: async () => {
      const {data, dataDisplay, limit, isLoading, isEndPage} = get();
      if (
        !isLoading &&
        !isEndPage &&
        data.length > 0 &&
        dataDisplay.length > 0
      ) {
        const displayData = getDataDisplay(data, dataDisplay, limit);
        set({
          isEndPage: displayData.length >= data.length,
          dataDisplay: displayData,
        });
      }
    },
    reset: () =>
      set({
        isLoading: false,
        isEndPage: false,
        limit: 15,
        data: [],
        dataDisplay: [],
      }),
  }),
);

function getDataDisplay(
  data: TaskDemoModel[],
  dataDisplay: TaskDemoModel[],
  limit: number,
) {
  const indexStart = dataDisplay.length;
  const indexEnd = limit + dataDisplay.length;
  const indexEndNew = indexEnd > data.length ? data.length : indexEnd;
  for (let i = indexStart; i < indexEndNew; i++) {
    const iItem = data[i];
    if (iItem?.id) {
      dataDisplay.push(iItem);
    }
  }
  return dataDisplay;
}
