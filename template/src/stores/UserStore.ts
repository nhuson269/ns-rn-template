import { getProfileStorage, UserModel } from "models";
import navActions from "navigators/shared/actions";
import { delay } from "utils/delay";
import storage, { StorageKey } from "utils/storage-utils";
import create from "zustand";

type UserStore = {
  isLoading: boolean;
  isFetched: boolean;
  isSignIn: boolean;
  profile: UserModel | undefined;
  getProfile: (isNavigate?: boolean) => void;
  setProfile: (value: any) => void;
  removeProfile: (isNavigate?: boolean) => void;
  reset: () => void;
};

export const userStore = create<UserStore>((set, get) => ({
  isLoading: false,
  isFetched: false,
  isSignIn: false,
  profile: undefined,
  getProfile: async (isNavigate?: boolean) => {
    const isLoading = get().isLoading;
    if (isLoading) {
      return;
    }
    set({ isLoading: true });
    const profile = await getProfileStorage();
    await delay(2000);
    set({ isLoading: false, isFetched: true, isSignIn: profile !== undefined, profile: profile });
    if (isNavigate) {
      if (profile) {
        navActions.navigateToMain();
      } else {
        navActions.navigateToAuth();
      }
    }
  },
  setProfile: value => {
    set({ profile: value });
    storage.set(StorageKey.USER_PROFILE, JSON.stringify(value));
  },
  removeProfile: (isNavigate?: boolean) => {
    set({ isSignIn: false, profile: undefined });
    if (isNavigate) {
      navActions.navigateToAuth();
    }
    storage.delete(StorageKey.USER_PROFILE);
  },
  reset: () =>
    set({
      isLoading: false,
      isFetched: false,
      isSignIn: false,
      profile: undefined,
    }),
}));
