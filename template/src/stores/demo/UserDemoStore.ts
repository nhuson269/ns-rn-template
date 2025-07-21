import AuthTokenModel from 'models/AuthTokenModel';
import UserDemoModel from 'models/demo/UserDemoModel';
import navActions from 'navigators/shared/actions';
import storageUtils, {StorageKey} from 'utils/storage-utils';
import {create} from 'zustand';
import * as Keychain from 'react-native-keychain';
import {userService} from 'services/demo/herokuapp-service';
import {delay} from 'utils/delay';

type UserDemoStore = {
  isLoading: boolean;
  isSignIn: boolean;
  authToken: AuthTokenModel | undefined;
  user: UserDemoModel | undefined;
  getCache: () => Promise<void>;
  setAuthToken: (token: AuthTokenModel) => Promise<void>;
  setUser: (value: UserDemoModel) => void;
  removeUser: () => Promise<void>;
};

export const userDemoStore = create<UserDemoStore>((set, get) => ({
  isLoading: false,
  isSignIn: false,
  authToken: undefined,
  user: undefined,
  getCache: async () => {
    const isLoading = get().isLoading;
    if (isLoading) {
      return;
    }
    set({isLoading: true});
    let authToken: AuthTokenModel | undefined;
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        authToken = {
          accessToken: credentials.username,
          refreshToken: credentials.password,
        };
        set({authToken: authToken});
      }
    } catch {}
    if (authToken?.refreshToken) {
      // Call Api RefreshToken
    }
    if (!authToken?.accessToken) {
      await delay(1000);
      set({isLoading: false, isSignIn: false, user: undefined});
      get().removeUser();
    } else {
      const resultMe = await userService.userMe();
      const isOK = resultMe.kind === 'ok';
      set({
        isLoading: false,
        isSignIn: isOK,
        user: isOK ? resultMe.data : undefined,
        authToken: isOK ? authToken : undefined,
      });
      if (isOK) {
        navActions.replaceToMainDemo();
      } else {
        get().removeUser();
      }
    }
  },
  setAuthToken: async (token: AuthTokenModel) => {
    if (token.accessToken) {
      await Keychain.setGenericPassword(
        token.accessToken,
        token.refreshToken || 'refresh_token',
      );
    } else {
      await Keychain.resetGenericPassword();
    }
    set({authToken: token});
  },
  setUser: value => {
    set({isSignIn: true, user: value});
    storageUtils.set(StorageKey.USER_DEMO_PROFILE, JSON.stringify(value));
  },
  removeUser: async () => {
    const {isSignIn, user, authToken} = get();
    if (isSignIn || user !== undefined) {
      set({isSignIn: false, user: undefined});
    }
    navActions.replaceToAuthDemo();
    storageUtils.cleanCache();
    await Keychain.resetGenericPassword();
    if (authToken?.accessToken) {
      await userService.logout();
    }
  },
}));
