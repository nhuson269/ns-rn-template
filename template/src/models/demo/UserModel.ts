import storage, { StorageKey } from "utils/storage-utils";

class UserModel {
  v: number;
  id: string;
  age: number;
  email: string;
  name: string;

  constructor(v: number, id: string, age: number, email: string, name: string) {
    this.v = v;
    this.id = id;
    this.age = age;
    this.email = email;
    this.name = name;
  }
}

export default UserModel;

export function getUserData(dataJson: any) {
  const v = dataJson?.__v;
  const id = dataJson?._id;
  const age = dataJson?.age;
  const email = dataJson?.email;
  const name = dataJson?.name;
  if (v && id && age && email && name) {
    const item = new UserModel(v, id, age, email, name);
    return item;
  }
  return undefined;
}

export async function getUserStorage() {
  const data = storage.getString(StorageKey.USER_PROFILE);
  try {
    const dataJson = !data ? undefined : await JSON.parse(data);
    if (dataJson?.id && dataJson?.name) {
      return dataJson;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
}
