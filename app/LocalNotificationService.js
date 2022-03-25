import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import moment from 'moment';
import i18next from 'i18next';

class LocalNotificationService {
  configure = onOpenNotification => {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    PushNotification.configure({
      onRegister: function(token) {},
      onNotification: function(notification) {
        // console.log("notification ::::",notification)

        if (!notification?.data) {
          return;
        }
        onOpenNotification(
          Platform.OS === 'ios'
            ? {
                message: notification.message,
                title: notification.title,
                alertAction: notification.userInteraction ? true : false,
                screen: notification.data.page
                  ? notification.data.page
                  : notification.data?.item?.page,
                bookingId: notification.data.bookingId
                  ? notification.data.bookingId
                  : notification.data?.item?.bookingId,
                local: notification.data?.item?.local,
              }
            : {
                message: notification.message,
                title: notification.title,
                alertAction: notification.alertAction ? true : false,
                screen: notification.data.page
                  ? notification.data.page
                  : notification.data?.item?.page,
                bookingId: notification.data.bookingId
                  ? notification.data.bookingId
                  : notification.data?.item?.bookingId,
                local: notification.data?.item?.local,
              },
        );

        if (Platform.OS === 'ios') {
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      senderID: '748290668890',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    PushNotification.getChannels(function(channels) {});
  };

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: `Default channel`, // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => {},
    );
    PushNotification.createChannel(
      {
        channelId: 'sound-channel-id', // (required)
        channelName: `Sound channel`, // (required)
        channelDescription: 'A sound channel', // (optional) default: undefined.
        soundName: 'sample.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => {},
    );
  }

  createOrUpdateChannel() {
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: 'custom-channel-id', // (required)
        channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
        channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => {},
    );
  }

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (
    id,
    title,
    message,
    data = {},
    options = {},
    dataExtra = {},
  ) => {
    // console.log('dataExtra ::::', dataExtra);
    PushNotification.localNotification({
      /* Android Only Properties */
      ...this.buildAndroidNotification(id, title, message, dataExtra, options),
      /* iOS and Android properties */
      ...this.buildIOSNotification(id, title, message, data, options),
      /* iOS and Android properties */
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
    });
    if (dataExtra.time) {
      const hrs24 = new Date(new Date(dataExtra.time) - 24 * 60 * 60 * 1000);
      const hrs1 = new Date(new Date(dataExtra.time) - 1 * 60 * 60 * 1000);
      if (moment(hrs24).isAfter(moment())) {
        PushNotification.localNotificationSchedule({
          /* Android Only Properties */
          channelId: 'default-channel-id',
          id: moment(hrs24).format('YYMMDDHHmm'),
          smallIcon: 'ic_notification',
          /* iOS and Android properties */
          alertAction: options.alertAction || 'view',
          title: title || '',
          message:
            i18next.language === 'en'
              ? 'Your appointment will happen in 24 hours. Please prepare yourself to consult your doctor.'
              : 'การนัดหมายของคุณจะถึงในอีก 24 ชั่วโมง กรุณาเตรียมตัวพบแพทย์',
          playSound: options.playSound || false,
          soundName: options.soundName || 'default',
          userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
          date: hrs24, //24 ชม , // in   time secs
          allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        });
      }
      if (moment(hrs1).isAfter(moment())) {
        PushNotification.localNotificationSchedule({
          /* Android Only Properties */
          channelId: 'default-channel-id',
          id: moment(hrs1).format('YYMMDDHHmm'),
          smallIcon: 'ic_notification',
          /* iOS and Android properties */
          alertAction: options.alertAction || 'view',
          title: title || '',
          message:
            i18next.language === 'en'
              ? 'Your appointment will happen in 1 hour. Please prepare yourself to consult your doctor.'
              : 'การนัดหมายของคุณจะถึงในอีก 1 ชั่วโมง กรุณาเตรียมตัวพบแพทย์',
          playSound: options.playSound || false,
          soundName: options.soundName || 'default',
          userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
          date: hrs1, //1 ชม , // in   time secs
          allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        });
      }
    }
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      channelId: 'default-channel-id',
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_notification',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high', // (optional) set notification importance, default: high,
      data: data,
    };
  };

  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  cancelAllLocalNotifications = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = notificationId => {
    PushNotification.cancelLocalNotifications({ id: `${notificationId}` });
  };
}

export const localNotificationService = new LocalNotificationService();
