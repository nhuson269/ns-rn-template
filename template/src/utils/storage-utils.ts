import { MMKV } from "react-native-mmkv";

// interface AsyncStorage {
//   getItem: (key: string) => string | null | Promise<string | null>;
//   setItem: (key: string, value: string) => void | Promise<void>;
//   removeItem: (key: string) => void | Promise<void>;
// }

const storage = new MMKV();

function getItem(key: string) {
  return storage.getString(key) as string | null | Promise<string | null>;
}

function setItem(key: string, value: string) {
  return storage.set(key, value) as void | Promise<void>;
}

function removeItem(key: string) {
  return storage.delete(key) as void | Promise<void>;
}

export const AsyncStorage = {
  getItem,
  setItem,
  removeItem,
};

export enum StorageKey {
  LANGUAGE = "language", // value is string
  NOTIFY_TOKEN = "notification_token", // value is sting
  USER_PROFILE = "user_profile", // value is object
}

export default storage;
