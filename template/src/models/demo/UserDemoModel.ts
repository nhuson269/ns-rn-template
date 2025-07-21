import storageUtils, {StorageKey} from 'utils/storage-utils';

class UserDemoModel {
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

export default UserDemoModel;

export function getUserDemoData(dataJson: any) {
  const v = dataJson?.__v;
  const id = dataJson?._id;
  const age = dataJson?.age;
  const email = dataJson?.email;
  const name = dataJson?.name;
  if (v && id && age && email && name) {
    const item = new UserDemoModel(v, id, age, email, name);
    return item;
  }
  return undefined;
}

export async function getUserDemoStorage() {
  const data = storageUtils.getString(StorageKey.USER_DEMO_PROFILE);
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
