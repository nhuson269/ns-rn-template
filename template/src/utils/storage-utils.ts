import { MMKV } from "react-native-mmkv";

// interface AsyncStorage {
//   getItem: (key: string) => string | null | Promise<string | null>;
//   setItem: (key: string, value: string) => void | Promise<void>;
//   removeItem: (key: string) => void | Promise<void>;
// }

const storage = new MMKV();

export const MMKVStorage = {
  getItem: (key: string) => {
    return storage.getString(key) as string | null | Promise<string | null>;
  },
  setItem: (key: string, value: string) => {
    return storage.set(key, value) as void | Promise<void>;
  },
  removeItem: (key: string) => {
    return storage.delete(key) as void | Promise<void>;
  },
};

export enum StorageKey {
  USER_DEMO_PROFILE = "user_demo_profile", // value is object
  COLOR_DEMO_THEME = "color_demo_theme", // value is string
  LANGUAGE = "language", // value is string
  NOTIFY_TOKEN = "notification_token", // value is sting
}

class StorageUtils {
  contains(key: StorageKey) {
    return storage.contains(key);
  }

  set(key: StorageKey, value: string | number | boolean) {
    storage.set(key, value);
  }

  getBoolean(key: StorageKey) {
    return storage.getBoolean(key);
  }

  getNumber(key: StorageKey) {
    return storage.getNumber(key);
  }

  getString(key: StorageKey) {
    return storage.getString(key);
  }

  delete(key: StorageKey) {
    storage.delete(key);
  }

  cleanCache() {
    const keys = storage.getAllKeys();
    keys.forEach(value => {
      if (value !== StorageKey.LANGUAGE && value !== StorageKey.COLOR_DEMO_THEME) {
        storage.delete(value);
      }
    });
  }
}

const storageUtils = new StorageUtils();

export default storageUtils;
