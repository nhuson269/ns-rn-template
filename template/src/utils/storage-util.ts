import { MMKV } from "react-native-mmkv";

export enum StorageKey {
  LANGUAGE = "language", // string
}

const storage = new MMKV();

export default storage;
