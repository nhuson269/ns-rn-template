import "utils/ignore-warnings";
import React from "react";
import { i18next } from "languages";
import { RootNavigator } from "navigators";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { AlertModal } from "modals";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const App = gestureHandlerRootHOC(() => {
  return (
    <I18nextProvider i18n={i18next}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <RootNavigator />
      </SafeAreaProvider>
      <AlertModal />
    </I18nextProvider>
  );
});

export default App;
