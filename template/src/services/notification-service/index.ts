import { Platform } from "react-native";
import { userStore } from "stores";
import storage, { StorageKey } from "utils/storage-utils";
import { NotifyLocalService } from "./notify-local-service";
import { NotifyPushService } from "./notify-push-service";

class NotificationService {
  localService: NotifyLocalService;
  pushService: NotifyPushService;
  notifyToken: string;
  deeplinkUrl?: string;

  constructor() {
    this.localService = new NotifyLocalService();
    this.pushService = new NotifyPushService();
    this.notifyToken = storage.getString(StorageKey.NOTIFY_TOKEN) ?? "";
  }

  register() {
    this.localService.configure(this.notifyOpen);
    this.pushService.register(this.notifyRegister, this.notifyMessage, this.notifyOpen);
  }

  unregister() {
    this.localService.unregister();
    this.pushService.unregister();
  }

  checkDeeplink() {
    const isSignIn = userStore.getState().isSignIn;
    if (this.deeplinkUrl && isSignIn) {
      // You SignIn
      // deeplink.go(this.deeplinkUrl);
      this.deeplinkUrl = "";
    }
  }

  // When there is a notification token
  private async notifyRegister(token?: string) {
    // console.debug("Notification Token: ", token);
    if (!token) {
      this.pushService.unsubscribeFromTopic("all");
    } else {
      this.pushService.subscribeToTopic("all");
    }
    if (this.notifyToken !== token) {
      this.notifyToken = token ?? "";
      storage.set(StorageKey.NOTIFY_TOKEN, this.notifyToken);
    }
  }

  // When there is a notification to the device
  private notifyMessage(notify: any) {
    // console.debug("Notification Msg: ", notify);
    const dataNotify = notify?.notification;
    const notifyTitle = dataNotify?.title;
    const notifyBody = dataNotify?.body;
    const notifyImage = Platform.OS !== "ios" ? dataNotify?.android?.imageUrl : dataNotify?.ios?.imageUrl;
    if (notifyTitle || notifyBody) {
      this.localService.createNotify({
        title: notifyTitle,
        message: notifyBody,
        imageUrl: notifyImage,
        data: notify?.data,
      });
    }
  }

  // When open notification
  private notifyOpen(notify: any) {
    // console.debug("Notification Open: ", notify);
    const data = notify?.data ?? notify;
    const newId = data?.new_id;
    const notifyId = data?.notification_id;
    const notifyUrl = data?.url;
    const isSignIn = userStore.getState().isSignIn;

    if (notifyUrl) {
      if (notifyUrl && isSignIn) {
        // You SignIn
        // deeplink.go(notifyUrl);
      } else {
        // You not SignIn
        this.deeplinkUrl = notifyUrl;
      }
    } else if (isSignIn) {
      if (newId) {
        // navigate(RouteName.NEWS_DETAIL_HTML, {
        //   newsId: newId,
        //   initial: false,
        // });
      } else if (notifyId) {
        // navigate(RouteName.NOTIFY_DETAIL, {
        //   notifyId: notifyId,
        //   initial: false,
        // });
      }
    }
  }
}

const notificationService = new NotificationService();

export default notificationService;
