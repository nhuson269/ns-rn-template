import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import deviceInfoModule from "react-native-device-info";

export type NotifyDeviceModel = { data: any; notification?: any };

class NotifyPushService {
  private isRegistering: boolean = false;
  private registerCount: number = 0;
  private unregisterCount: number = 0;
  private listener: { onToken: () => void; onMessage: () => void } | undefined;
  private notifyToken: string = "";

  async checkPermisstion() {
    async function requestPermisstion() {
      try {
        const authStatus = await messaging().requestPermission();
        switch (authStatus) {
          case messaging.AuthorizationStatus.AUTHORIZED:
          case messaging.AuthorizationStatus.PROVISIONAL:
            return true;
          default:
            return false;
        }
      } catch {
        return false;
      }
    }

    try {
      const authStatus = await messaging().hasPermission();
      switch (authStatus) {
        case messaging.AuthorizationStatus.AUTHORIZED:
        case messaging.AuthorizationStatus.PROVISIONAL:
          // console.debug("[FCMService] Check Permisstion: Success");
          return true;
        default:
          // console.debug("[FCMService] Check Permisstion:", authStatus);
          return await requestPermisstion();
      }
    } catch {
      return false;
    }
  }

  async register(
    onToken: (token?: string) => void,
    onMessage: (notify: NotifyDeviceModel) => void,
    onNotifyOpened: (notify: NotifyDeviceModel) => void,
  ) {
    this.registerCount += 1;
    if (!this.isRegistering && this.registerCount === 1) {
      this.isRegistering = true;
      const isPermisstion = await this.checkPermisstion();
      if (isPermisstion) {
        if (!messaging().isAutoInitEnabled) {
          await messaging().setAutoInitEnabled(true);
        }
        await this.createNotificationListeners(onToken, onMessage, onNotifyOpened);
      } else {
        this.isRegistering = false;
      }
    }
  }

  unregister() {
    this.unregisterCount += 1;
    if (!this.isRegistering) {
      if (typeof this.listener?.onMessage === "function") {
        this.listener?.onMessage();
      }
      if (typeof this.listener?.onToken === "function") {
        this.listener?.onToken();
      }
      this.registerCount = 0;
      this.unregisterCount = 0;
    }
  }

  async subscribeToTopic(topic = "all") {
    await messaging().subscribeToTopic(topic);
  }

  async unsubscribeFromTopic(topic = "all") {
    await messaging().unsubscribeFromTopic(topic);
  }

  private async createNotificationListeners(
    onToken: (token?: string) => void,
    onMessage: (notify: NotifyDeviceModel) => void,
    onNotifyOpened: (notify: NotifyDeviceModel) => void,
  ) {
    try {
      const fcmToken = await messaging().getToken();
      // console.debug("[FCMService] Get Token:", fcmToken);
      if (this.notifyToken !== fcmToken) {
        this.notifyToken = fcmToken;
        onToken(fcmToken);
      }
    } catch {}

    const listenerOnTokenRefresh = messaging().onTokenRefresh(fcmToken => {
      // console.debug("[FCMService] New Token Refresh:", fcmToken);
      if (this.notifyToken !== fcmToken) {
        this.notifyToken = fcmToken;
        onToken(fcmToken);
      }
    });

    const listenerOnMessage = messaging().onMessage(remoteMessage => {
      // console.debug("[FCMService] a new FCM message:", remoteMessage);
      if (remoteMessage) {
        const isEmulator = deviceInfoModule.isEmulatorSync();
        const iosIsEmulator = Platform.OS === "ios" && isEmulator;
        const dataMsg = remoteMessage.data as any;
        onMessage({
          data: remoteMessage.data,
          notification: iosIsEmulator ? dataMsg?.notification : remoteMessage.notification,
        });
      }
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.debug("[FCMService] onNotificationOpenedApp Notification caused app to open:", remoteMessage);
      if (remoteMessage) {
        const isEmulator = deviceInfoModule.isEmulatorSync();
        const iosIsEmulator = Platform.OS === "ios" && isEmulator;
        const dataMsg = remoteMessage.data as any;
        onNotifyOpened({
          data: remoteMessage.data,
          notification: iosIsEmulator ? dataMsg?.notification : remoteMessage.notification,
        });
      }
    });

    try {
      const remoteMessage = await messaging().getInitialNotification();
      // console.debug("[FCMService] Initial Notification:", remoteMessage);
      if (remoteMessage) {
        const isEmulator = deviceInfoModule.isEmulatorSync();
        const iosIsEmulator = Platform.OS === "ios" && isEmulator;
        const dataMsg = remoteMessage.data as any;
        onNotifyOpened({
          data: remoteMessage.data,
          notification: iosIsEmulator ? dataMsg?.notification : remoteMessage.notification,
        });
      }
    } catch {}

    this.listener = {
      onToken: listenerOnTokenRefresh,
      onMessage: listenerOnMessage,
    };

    // Check Register
    this.isRegistering = false;
    if (this.registerCount <= this.unregisterCount) {
      this.unregister();
    }
  }
}

const notifyPushService = new NotifyPushService();

export default notifyPushService;
