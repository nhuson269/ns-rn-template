import * as RNLocalize from 'react-native-localize';
import i18next, {StringMap} from 'i18next';
import moment from 'moment';
import {initReactI18next} from 'react-i18next';
import en from './lang/en.json';
import vi from './lang/vi.json';
import storageUtils, {StorageKey} from 'utils/storage-utils';

// TYPE
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];
type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];
type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
type DefaultLocale = typeof vi; // Change the primary language of your app
type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

// CONST
const sourceLang = {
  vi: {translation: vi},
  en: {translation: en},
};
const listLang = Object.keys(sourceLang);
const defaultLang = listLang.length > 0 ? listLang[0] || 'vi' : 'vi';

// INIT
i18next
  .use({
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async (callback: any) => {
      const localLng = storageUtils.getString(StorageKey.LANGUAGE);
      if (localLng && listLang.includes(localLng)) {
        callback(localLng);
        return localLng;
      }
      const locales = RNLocalize.getLocales();
      const deviceLng =
        locales.length > 0 ? locales[0]?.languageCode : undefined;
      const finalLng =
        deviceLng && listLang.includes(deviceLng) ? deviceLng : defaultLang;
      callback(finalLng);
      return finalLng;
    },
    cacheUserLanguage: (lng: any) => storageUtils.set(StorageKey.LANGUAGE, lng),
  })
  .use(initReactI18next)
  .init({
    resources: sourceLang,
    fallbackLng: defaultLang,
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

// EVENT
i18next.on('languageChanged', value => moment().locale(value));

// FUNCTION
function translate(key: TxKeyPath, options?: StringMap) {
  return key ? i18next.t(key, options ?? {}) : undefined;
}

export {i18next, translate};
export type {TxKeyPath};
