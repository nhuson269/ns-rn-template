import * as RNLocalize from "react-native-localize";
import i18next from "i18next";
import moment from "moment";
import { initReactI18next } from "react-i18next";
import storage, { StorageKey } from "utils/storage-utils";
import en from "./lang/en.json";
import vi from "./lang/vi.json";

// TYPE
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & string];
type DefaultLocale = typeof vi;
type TxKeyPath = NestedKeyOf<DefaultLocale>;

// CONST
const sourceLang = {
  vi: { translation: vi },
  en: { translation: en },
};
const listLang = Object.keys(sourceLang);
const defaultLang = listLang.length > 0 ? listLang[0] ?? "vi" : "vi";

// INIT
i18next
  .use({
    type: "languageDetector",
    async: true,
    init: () => {},
    detect: async (callback: any) => {
      const localLng = storage.getString(StorageKey.LANGUAGE);
      if (localLng && listLang.includes(localLng)) {
        callback(localLng);
        return localLng;
      }
      const locales = RNLocalize.getLocales();
      const deviceLng = locales.length > 0 ? locales[0]?.languageCode : undefined;
      const finalLng = deviceLng && listLang.includes(deviceLng) ? deviceLng : defaultLang;
      callback(finalLng);
      return finalLng;
    },
    cacheUserLanguage: (lng: any) => storage.set(StorageKey.LANGUAGE, lng),
  })
  .use(initReactI18next)
  .init({
    resources: sourceLang,
    fallbackLng: defaultLang,
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false,
    },
  });

// EVENT
i18next.on("languageChanged", value => moment().locale(value));

// FUNCTION
function translate(key: TxKeyPath) {
  return key ? i18next.t(key) : undefined;
}

export { i18next, TxKeyPath, translate };
