import AuthTokenModel from "models/AuthTokenModel";
import UserModel from "models/demo/UserModel";
import navActions from "navigators/shared/actions";
import storage, { StorageKey } from "utils/storage-utils";
import create from "zustand";
import * as Keychain from "react-native-keychain";
import { userService } from "services/herokuapp-service";
import { delay } from "utils/delay";

type UserStore = {
  isLoading: boolean;
  isSignIn: boolean;
  authToken: AuthTokenModel | undefined;
  user: UserModel | undefined;
  getCache: () => Promise<void>;
  setAuthToken: (token: AuthTokenModel) => Promise<void>;
  setUser: (value: UserModel) => void;
  removeUser: () => Promise<void>;
};

export const userStore = create<UserStore>((set, get) => ({
  isLoading: false,
  isSignIn: false,
  authToken: undefined,
  user: undefined,
  getCache: async () => {
    const isLoading = get().isLoading;
    if (isLoading) {
      return;
    }
    set({ isLoading: true });
    let authToken: AuthTokenModel | undefined;
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        authToken = { accessToken: credentials.username, refreshToken: credentials.password };
        set({ authToken: authToken });
      }
    } catch {}
    if (authToken?.refreshToken) {
      // Call Api RefreshToken
    }
    if (!authToken?.accessToken) {
      await delay(1000);
      set({ isLoading: false, isSignIn: false, user: undefined });
      get().removeUser();
    } else {
      const resultMe = await userService.userMe();
      const isOK = resultMe.kind === "ok";
      set({
        isLoading: false,
        isSignIn: isOK,
        user: isOK ? resultMe.data : undefined,
        authToken: isOK ? authToken : undefined,
      });
      if (isOK) {
        navActions.navigateToMain();
      } else {
        get().removeUser();
      }
    }
  },
  setAuthToken: async (token: AuthTokenModel) => {
    if (token.accessToken) {
      await Keychain.setGenericPassword(token.accessToken, token.refreshToken || "refresh_token");
    } else {
      await Keychain.resetGenericPassword();
    }
    set({ authToken: token });
  },
  setUser: value => {
    set({ user: value });
    storage.set(StorageKey.USER_PROFILE, JSON.stringify(value));
  },
  removeUser: async () => {
    const { isSignIn, user, authToken } = get();
    if (isSignIn || user !== undefined) {
      set({ isSignIn: false, user: undefined });
    }
    navActions.navigateToAuth();
    storage.delete(StorageKey.USER_PROFILE);
    await Keychain.resetGenericPassword();
    if (authToken?.accessToken) {
      await userService.logout();
    }
  },
}));
