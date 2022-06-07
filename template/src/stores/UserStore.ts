import navActions from "navigators/shared/actions";
import { delay } from "utils/delay";
import storage, { StorageKey } from "utils/storage-utils";
import create from "zustand";

type UserStore = {
  isLoading: boolean;
  isFetched: boolean;
  isSignIn: boolean;
  profile: any;
  getProfile: (isNavigate?: boolean) => void;
  setProfile: (value: any) => void;
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
    const data = storage.getString(StorageKey.USER_PROFILE);
    const profile = !data ? undefined : await JSON.parse(data);
    await delay(2000);
    set({ isLoading: false, isFetched: true, profile: profile });
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
  reset: () =>
    set({
      isLoading: false,
      isFetched: false,
      isSignIn: false,
      profile: undefined,
    }),
}));
