type TaskModel = {
  id: number;
  des: string;
  updatedTime: string;
};

export default TaskModel;

export function getTaskHerokuappData(dataJson: any) {
  const id = dataJson?._id;
  const des = dataJson?.description;
  const updatedTime = dataJson?.updatedAt;
  if (id && des) {
    const item: TaskModel = {
      id: id,
      des: des,
      updatedTime: updatedTime,
    };
    return item;
  }
  return undefined;
}

export function getArrTaskHerokuappData(dataJson: any) {
  const arrItem: TaskModel[] = [];
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
