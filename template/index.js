/**
 * @format
 */

import "react-native-gesture-handler";
import React from "react";
import messaging from "@react-native-firebase/messaging";
import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";
import App from "./src/App";

messaging().setBackgroundMessageHandler(async _remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  // App has been launched in the background by iOS, ignore
  return isHeadless ? null : <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
