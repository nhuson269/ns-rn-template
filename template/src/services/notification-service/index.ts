// import {Platform} from 'react-native';
// import {userDemoStore} from 'stores';
// import storageUtils, {StorageKey} from 'utils/storage-utils';
// import notifyLocalService from './notify-local-service';
// import notifyPushService, {NotifyDeviceModel} from './notify-push-service';

// class NotificationService {
//   notifyToken: string;
//   deeplinkUrl?: string;

//   constructor() {
//     this.notifyToken = storageUtils.getString(StorageKey.NOTIFY_TOKEN) || '';
//   }

//   register() {
//     notifyLocalService.configure(this.onNotifyOpened);
//     notifyPushService.register(
//       this.onToken,
//       this.onMessage,
//       this.onNotifyOpened,
//     );
//   }

//   unregister() {
//     notifyLocalService.unregister();
//     notifyPushService.unregister();
//   }

//   checkDeeplink() {
//     const isSignIn = userDemoStore.getState().isSignIn;
//     if (this.deeplinkUrl && isSignIn) {
//       // You SignIn
//       // deeplink.go(this.deeplinkUrl);
//       this.deeplinkUrl = '';
//     }
//   }

//   // When there is a notification token
//   onToken(token?: string) {
//     console.debug('Notification Token:', token);
//     if (this.notifyToken !== token) {
//       this.notifyToken = token || '';
//       if (!token) {
//         notifyPushService.unsubscribeFromTopic('all');
//       } else {
//         notifyPushService.subscribeToTopic('all');
//       }
//       storageUtils.set(StorageKey.NOTIFY_TOKEN, this.notifyToken);
//     }
//   }

//   // When there is a notification to the device
//   onMessage(notify: NotifyDeviceModel) {
//     // console.debug('Notification Message:', notify);
//     const dataNotify = notify?.notification;
//     const notifyTitle = dataNotify?.title;
//     const notifyBody = dataNotify?.body;
//     const notifyImage =
//       Platform.OS !== 'ios'
//         ? dataNotify?.android?.imageUrl
//         : dataNotify?.ios?.imageUrl;
//     if (notifyTitle || notifyBody) {
//       notifyLocalService.createNotify({
//         title: notifyTitle,
//         message: notifyBody,
//         imageUrl: notifyImage,
//         data: notify.data,
//       });
//     }
//   }

//   // When open notification
//   onNotifyOpened(notify: NotifyDeviceModel) {
//     // console.debug('Notification Opened:', notify);
//     const data = notify?.data || notify;
//     const newId = data?.new_id;
//     const notifyId = data?.notification_id;
//     const notifyUrl = data?.url;
//     const isSignIn = userDemoStore.getState().isSignIn;

//     if (notifyUrl) {
//       if (notifyUrl && isSignIn) {
//         // You SignIn
//         // deeplink.go(notifyUrl);
//       } else {
//         // You not SignIn
//         this.deeplinkUrl = notifyUrl;
//       }
//     } else if (isSignIn) {
//       if (newId) {
//         // navigate(RouteName.NEWS_DETAIL_HTML, {
//         //   newsId: newId,
//         //   initial: false,
//         // });
//       } else if (notifyId) {
//         // navigate(RouteName.NOTIFY_DETAIL, {
//         //   notifyId: notifyId,
//         //   initial: false,
//         // });
//       }
//     }
//   }
// }

// const notificationService = new NotificationService();

// export default notificationService;
