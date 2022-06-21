import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";

const NOTIFY_LOCAL_CHANNEL = "notification_local_channel";
const NOTIFY_PUSH_CHANNEL = "notification_push_channel";

export class NotifyLocalService {
  unregister() {
    PushNotification.unregister();
  }

  configure(onOpenNotification: any) {
    this.createDefaultChannels();
    PushNotification.configure({
      onNotification(notification) {
        // console.debug(notification);
        const dataNotify = notification?.data as any;
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
        if (dataNotify && notification?.userInteraction === true) {
          onOpenNotification(Platform.OS === "ios" ? dataNotify.data : dataNotify);
        }
      },
      onRegistrationError() {
        // console.debug(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  createNotify(params: { title?: string; message: string; imageUrl?: string; data?: any }) {
    PushNotification.localNotification({
      title: params.title,
      message: params.message,
      playSound: true,
      userInfo: !params.data ? {} : { data: params.data },
      channelId: NOTIFY_LOCAL_CHANNEL,
      // color: AppColors.red,
      largeIconUrl: params?.imageUrl,
      bigPictureUrl: params?.imageUrl,
      // largeIcon: "ic_launcher_round",
      // smallIcon: "logo_white",
      vibrate: true,
      vibration: 300,
      priority: "high",
      importance: "high",
      // soundName: !isIOS ? "imap_notify" : "imap_notify.wav",
    });
  }

  createNotifySchedule(params: { title?: string; message: string; date: Date; data?: any }) {
    PushNotification.localNotificationSchedule({
      title: params.title,
      message: params.message,
      date: params.date,
      playSound: true,
      userInfo: !params.data ? {} : { data: params.data },
      channelId: NOTIFY_LOCAL_CHANNEL,
      // color: AppColors.red,
      // largeIcon: "ic_launcher_round",
      // smallIcon: "logo_white",
      vibrate: true,
      vibration: 300,
      priority: "high",
      importance: "high",
      // soundName: !isIOS ? "imap_notify" : "imap_notify.wav",
    });
  }

  createDefaultChannels() {
    PushNotification.getChannels(channelIds => {
      for (let i = 0; i < channelIds.length; i++) {
        const itemId = channelIds[i] || "";
        if (itemId) {
          PushNotification.deleteChannel(itemId);
        }
      }
      // Local Notification Channel
      PushNotification.createChannel(
        {
          channelId: NOTIFY_LOCAL_CHANNEL, // (required)
          channelName: "Local Notification", // (required)
          channelDescription: "Local Notification description",
          playSound: true,
          vibrate: true,
          importance: Importance.HIGH,
          soundName: Platform.OS !== "ios" ? "file_name" : "file_name.wav",
        },
        () => {
          // console.debug("CreateChannel Local Notification Channel: ", created);
        },
      );
      // Push Notification Channel
      PushNotification.createChannel(
        {
          channelId: NOTIFY_PUSH_CHANNEL, // (required)
          channelName: "Push Notification", // (required)
          channelDescription: "Push Notification description",
          playSound: true,
          vibrate: true,
          importance: Importance.HIGH,
          soundName: Platform.OS !== "ios" ? "file_name" : "file_name.wav",
        },
        () => {
          // console.debug("CreateChannel Push Notification Channel: ", created);
        },
      );
    });
  }
}
