import { MMKV } from "react-native-mmkv";

export enum StorageKey {
  LANGUAGE = "language", // value is string
  NOTIFY_TOKEN = "notification_token", // value is sting
}

const storage = new MMKV();

export default storage;
