import "utils/ignore-warnings";
import React from "react";
import { i18next } from "languages";
import { RootNavigator } from "navigators";
import { I18nextProvider } from "react-i18next";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

const App = gestureHandlerRootHOC(() => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/*i18next in folder languages*/}
      <I18nextProvider i18n={i18next}>
        <RootNavigator />
      </I18nextProvider>
    </SafeAreaProvider>
  );
});

export default App;
