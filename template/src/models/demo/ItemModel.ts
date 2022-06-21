type ItemModel = {
  id: number;
  name: string;
};

export default ItemModel;

export function getItemData(dataJson: any) {
  const id = dataJson?.id;
  const name = dataJson?.name;
  if (id && name) {
    const item: ItemModel = {
      id: id,
      name: name,
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
