export type ItemModel = {
  id: number;
  name: string;
};

export function getItemData(dataJson: any) {
  if (dataJson?.id && dataJson?.name) {
    const item: ItemModel = {
      id: dataJson.id,
      name: dataJson.name,
    };
    return item;
  }
  return undefined;
}

export function getArrItemData(dataJson: any) {
  const arrItem: ItemModel[] = [];
  if (Array.isArray(dataJson)) {
    dataJson.forEach((value: any) => {
      const item = getItemData(value);
      if (item?.id) {
        arrItem.push(item);
      }
    });
  }
  return arrItem;
}
