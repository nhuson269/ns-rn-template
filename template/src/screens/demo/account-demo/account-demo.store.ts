import i18next from "i18next";
import { translate } from "languages";
import alertHelper from "modals/alert/helper";
import { colorDemoStore, userDemoStore } from "stores";
import create from "zustand";

type AccountStore = {
  setThemeGreen: () => void;
  setThemeViolet: () => void;
  setThemeBlue: () => void;
  setEnglist: () => void;
  setVietnamese: () => void;
  logout: () => void;
  reset: () => void;
};

export const accountDemoStore = create<AccountStore>(() => ({
  setThemeGreen: () => colorDemoStore.getState().setGreen(),
  setThemeViolet: () => colorDemoStore.getState().setViolet(),
  setThemeBlue: () => colorDemoStore.getState().setBlue(),
  setEnglist: () => i18next.changeLanguage("en"),
  setVietnamese: () => i18next.changeLanguage("vi"),
  logout: () => {
    alertHelper.show({
      title: translate("common.logout"),
      message: translate("common.logoutMsg") || "",
      btLeftTitle: translate("common.cancel"),
      btRightTitle: translate("common.confirm"),
      btRightAction: userDemoStore.getState().removeUser,
    });
  },
  reset: () => {},
}));
