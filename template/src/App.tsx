import "utils/ignore-warnings";
import { StatusBar } from "components";
import { i18next } from "languages";
import { RootNavigator } from "navigators";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

const App = gestureHandlerRootHOC(() => {
  return (
    <>
      {/*StatusBarStore in folder stores*/}
      <StatusBar />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {/*i18next in folder i18n*/}
        <I18nextProvider i18n={i18next}>
          <RootNavigator />
        </I18nextProvider>
      </SafeAreaProvider>
    </>
  );
});

export default App;
