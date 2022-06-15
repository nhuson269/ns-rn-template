import i18next from "i18next";
import { translate } from "languages";
import alertHelper from "modals/alert/helper";
import { colorStore, userStore } from "stores";
import create from "zustand";

type AccoutDemoStore = {
  setThemeGreen: () => void;
  setThemeViolet: () => void;
  setThemeBlue: () => void;
  setEnglist: () => void;
  setVietnamese: () => void;
  logout: () => void;
  reset: () => void;
};

export const accoutDemoStore = create<AccoutDemoStore>(() => ({
  setThemeGreen: () => colorStore.getState().setGreen(),
  setThemeViolet: () => colorStore.getState().setViolet(),
  setThemeBlue: () => colorStore.getState().setBlue(),
  setEnglist: () => i18next.changeLanguage("en"),
  setVietnamese: () => i18next.changeLanguage("vi"),
  logout: () => {
    alertHelper.show({
      title: translate("common.logout"),
      message: translate("common.logoutMsg") ?? "",
      btLeftTitle: translate("common.cancel"),
      btRightTitle: translate("common.confirm"),
      btRightAction: () => userStore.getState().removeProfile(true),
    });
  },
  reset: () => {},
}));
