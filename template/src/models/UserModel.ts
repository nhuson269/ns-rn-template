import storage, { StorageKey } from "utils/storage-utils";

export type UserModel = {
  id: number;
  name: string;
};

export function getProfileData(dataJson: any) {
  if (dataJson?.PK_USER_ID && dataJson?.USER_NAME) {
    const item: UserModel = {
      id: dataJson.PK_USER_ID,
      name: dataJson.USER_NAME,
    };
    return item;
  }
  return undefined;
}

export async function getProfileStorage() {
  const data = storage.getString(StorageKey.USER_PROFILE);
  try {
    const dataJson = !data ? undefined : await JSON.parse(data);
    if (dataJson?.PK_USER_ID && dataJson?.USER_NAME) {
      const item: UserModel = {
        id: dataJson.PK_USER_ID,
        name: dataJson.USER_NAME,
      };
      return item;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
}
