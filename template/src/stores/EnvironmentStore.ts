import { MMKVStorage, StorageKey } from "utils/storage-utils";
import create from "zustand";
import { persist } from "zustand/middleware";

type EnvType = {
  baseUrl: string;
  authUrl: string;
  clientId: string;
  clientSecret: string;
  isDEV: boolean;
};

const staging: EnvType = {
  baseUrl: "",
  authUrl: "",
  clientId: "",
  clientSecret: "",
  isDEV: true,
};

const production: EnvType = {
  baseUrl: "",
  authUrl: "",
  clientId: "",
  clientSecret: "",
  isDEV: false,
};

type EnvironmentStore = {
  env: EnvType;
  initStaging: () => void;
  initProduction: () => void;
};

export const environmentStore = create<EnvironmentStore, [["zustand/persist", EnvironmentStore]]>(
  persist(
    set => ({
      env: production,
      initStaging: () => set({ env: staging }),
      initProduction: () => set({ env: production }),
    }),
    {
      name: StorageKey.ENVIRONMENT,
      getStorage: () => MMKVStorage,
    },
  ),
);
