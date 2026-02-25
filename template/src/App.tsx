
import '@/utils/ignore-warnings';
import React from 'react';
import {i18next} from '@/languages';
import {RootNavigator} from '@/navigators';
import {I18nextProvider} from 'react-i18next';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {AlertModal} from '@/modals';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { StatusBar } from '@/components';
import { useColorScheme } from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <>
      <StatusBar  />
      <I18nextProvider i18n={i18next}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView>
            <RootNavigator />
            <AlertModal />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </I18nextProvider>
    </>
  );
};

export default App;
