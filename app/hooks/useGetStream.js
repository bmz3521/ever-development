import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StreamChat } from 'stream-chat';
import * as AsyncStorage from '@utils/asyncStorage';
import { GETSTREAM_CONFIG } from '@_config/constants';
import { getFcmToken } from '@utils/asyncStorage';

import { STREAM_KEY, STREAM_TOKEN_URL } from '@env';

export const useGetStream = () => {
  const [clientChat, setClientChat] = useState();

  async function getToken(userId) {
    try {
      const {
        data,
      } = await axios.post(
        `${STREAM_TOKEN_URL}/getStreamToken?userId=${userId}`,
        { userId },
      );
      return data.result;
    } catch (e) {
      return null;
    }
  }

  async function logout() {
    await removeFcmDevice();
    clientChat?.disconnectUser();
    return await AsyncStorage.removeItem(GETSTREAM_CONFIG);
  }

  async function autoLogin() {
    const _config = await AsyncStorage.getItem(GETSTREAM_CONFIG);
    if (_config && !clientChat) {
      login(_config);
    }
  }

  async function removeFcmDevice() {
    const _config = await AsyncStorage.getItem(GETSTREAM_CONFIG);
    const fcmToken = await getFcmToken();
    await clientChat.removeDevice(fcmToken, _config.id);
    setClientChat(null);
  }

  function login({ userId, firstname, lastname, img }) {
    return new Promise(async (resolve, reject) => {
      const client = StreamChat.getInstance(STREAM_KEY);
      const token = await getToken(userId);
      if (token) {
        try {
          await client.connectUser(
            {
              id: `${userId}`,
              name: `${firstname} ${lastname}`,
              image: img,
            },
            client.devToken(`${userId}`),
          );

          const fcmToken = await getFcmToken();
          if (fcmToken) {
            await client.addDevice(fcmToken, 'firebase');
          }
          await AsyncStorage.setItem(GETSTREAM_CONFIG, {
            userId,
            firstname,
            lastname,
            img,
          });

          setClientChat(client);
          resolve();
        } catch (e) {
          console.log('error login to getStream', e);
          reject(e);
        }
      }
    });
  }

  useEffect(() => {
    autoLogin();
  }, []);

  return {
    clientChat,
    StreamChat: {
      login,
      logout,
      autoLogin,
    },
  };
};

const ChatContext = React.createContext({});

export const ChatProvider = props => {
  return (
    <ChatContext.Provider value={{ ...props.value }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);
