import { localNotificationService } from '../../LocalNotificationService';
import { StreamChat } from 'stream-chat';
import * as AsyncStorage from '@utils/asyncStorage';
import { GETSTREAM_CONFIG } from '@_config/constants';
import { STREAM_KEY } from '@env';

const option = {
  soundName: 'default',
  playSound: true,
};

export const onNotificationBackground = async (notify, data) => {
  if (data.id) {
    const _config = await AsyncStorage.getItem(GETSTREAM_CONFIG);
    const client = StreamChat.getInstance(STREAM_KEY);
    client._setToken(
      { id: `${_config.userId}` },
      client.devToken(`${_config.userId}`),
    );
    const message = await client.getMessage(data.id);
    notify = {
      title: message.message.user.name
        ? message.message.user.name
        : 'Practitioner',
      body: message.message.text,
    };
  }

  localNotificationService.showNotification(
    0,
    notify.title,
    notify.body,
    notify,
    option,
    data,
  );
};
