import storage, { StorageKey } from "utils/storage-utils";

type UserModel = {
  id: number;
  name: string;
};

export default UserModel;

export function getProfileData(dataJson: any) {
  if (dataJson?.user_id && dataJson?.use_name) {
    const item: UserModel = {
      id: dataJson.user_id,
      name: dataJson.use_name,
    };
    return item;
  }
  return undefined;
}

export async function getProfileStorage() {
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
