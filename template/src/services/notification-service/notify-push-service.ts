import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import deviceInfoModule from "react-native-device-info";

const AuthorizationStatus = messaging.AuthorizationStatus;

export class NotifyPushService {
  listener: { onMessage: any; onTokenRefresh: any } | undefined;
  private isRegistering: boolean = false;
  private registerCount: number = 0;
  private unregisterCount: number = 0;

  unregister() {
    this.unregisterCount += 1;
    if (!this.isRegistering) {
      if (typeof this.listener?.onMessage === "function") {
        this.listener?.onMessage();
      }
      if (typeof this.listener?.onTokenRefresh === "function") {
        this.listener?.onTokenRefresh();
      }
      this.registerCount = 0;
      this.unregisterCount = 0;
    }
  }

  async register(onRegister: any, onNotification: any, onOpenNotification: any) {
    this.registerCount += 1;
    if (!this.isRegistering && this.registerCount === 1) {
      this.isRegistering = true;
      const isPermisstion = await this.checkPermisstion();
      if (isPermisstion) {
        if (!messaging().isAutoInitEnabled) {
          await messaging().setAutoInitEnabled(true);
        }
        await this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
      } else {
        this.isRegistering = false;
      }
    }
  }

  async subscribeToTopic(topic = "all") {
    await messaging().subscribeToTopic(topic);
  }

  async unsubscribeFromTopic(topic = "all") {
    await messaging().unsubscribeFromTopic(topic);
  }

  private async requestPermisstion() {
    try {
      const authStatus = await messaging().requestPermission();
      if (authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async checkPermisstion() {
    try {
      const authStatus = await messaging().hasPermission();
      if (authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL) {
        // console.debug("[FCMService] Check Permisstion: Success");
        return true;
      } else {
        // console.debug("[FCMService] Check Permisstion: ", authStatus);
        return await this.requestPermisstion();
      }
    } catch {
      return false;
    }
  }

  private async createNotificationListeners(onRegister: any, onNotification: any, onOpenNotification: any) {
    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.debug("[FCMService] onNotificationOpenedApp Notification caused app to open", remoteMessage);
      if (remoteMessage) {
        const isEmulator = deviceInfoModule.isEmulatorSync();
        const iosIsEmulator = Platform.OS === "ios" && isEmulator;
        const dataMsg = remoteMessage.data as any;
        onOpenNotification({
          data: remoteMessage.data,
          notification: iosIsEmulator ? dataMsg?.notification : remoteMessage.notification,
        });
      }
    });

    const listenerOnMessage = messaging().onMessage(remoteMessage => {
      // console.debug("[FCMService] a new FCM message: ", remoteMessage);
      if (remoteMessage) {
        const isEmulator = deviceInfoModule.isEmulatorSync();
        const iosIsEmulator = Platform.OS === "ios" && isEmulator;
        const dataMsg = remoteMessage.data as any;
        onNotification({
          data: remoteMessage.data,
          notification: iosIsEmulator ? dataMsg?.notification : remoteMessage.notification,
        });
      }
    });

    const listenerOnTokenRefresh = messaging().onTokenRefresh(fcmToken => {
      // console.debug("[FCMService] New Token Refresh: ", fcmToken);
      onRegister(fcmToken);
    });

    try {
      const remoteMessage = await messaging().getInitialNotification();
      // console.debug("[FCMService] Initial Notification: ", remoteMessage);
      if (remoteMessage) {
        const isEmulator = deviceInfoModule.isEmulatorSync();
        const iosIsEmulator = Platform.OS === "ios" && isEmulator;
        const dataMsg = remoteMessage.data as any;
        onOpenNotification({
          data: remoteMessage.data,
          notification: iosIsEmulator ? dataMsg?.notification : remoteMessage.notification,
        });
      }
    } catch {}

    try {
      const fcmToken = await messaging().getToken();
      // console.debug("[FCMService] Get Token: ", fcmToken);
      onRegister(fcmToken);
    } catch {}

    this.listener = {
      onMessage: listenerOnMessage,
      onTokenRefresh: listenerOnTokenRefresh,
    };

    this.isRegistering = false;
    if (this.registerCount <= this.unregisterCount) {
      this.unregister();
    }
  }
}
