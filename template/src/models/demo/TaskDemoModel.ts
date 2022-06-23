type TaskDemoModel = {
  id: number;
  des: string;
  updatedTime: string;
};

export default TaskDemoModel;

export function getTaskHerokuappData(dataJson: any) {
  const id = dataJson?._id;
  const des = dataJson?.description;
  const updatedTime = dataJson?.updatedAt;
  if (id && des) {
    const item: TaskDemoModel = {
      id: id,
      des: des,
      updatedTime: updatedTime,
    };
    return item;
  }
  return undefined;
}

export function getArrTaskHerokuappData(dataJson: any) {
  const arrItem: TaskDemoModel[] = [];
  if (Array.isArray(dataJson)) {
    dataJson.forEach((value: any) => {
      const item = getTaskHerokuappData(value);
      if (item?.id) {
        arrItem.push(item);
      }
    });
  }
  return arrItem;
}

export function getTaskTypicodeData(dataJson: any) {
  const id = dataJson?._id;
  const des = dataJson?.description;
  const updatedTime = dataJson?.updatedAt;
  if (id && des) {
    const item: TaskDemoModel = {
      id: id,
      des: des,
      updatedTime: updatedTime,
    };
    return item;
  }
  return undefined;
}

export function getArrTaskTypicodeData(dataJson: any) {
  const arrItem: TaskDemoModel[] = [];
  if (Array.isArray(dataJson)) {
    dataJson.forEach((value: any) => {
      const item = getTaskTypicodeData(value);
      if (item?.id) {
        arrItem.push(item);
      }
    });
  }
  return arrItem;
}
