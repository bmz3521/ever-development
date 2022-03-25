import React, { useCallback, useEffect, useState } from 'react';
import { ModalChatComponent } from '@components';
import { useChatContext } from 'app/hooks/useGetStream';
import { useSelector } from 'react-redux';
const VideoCallMessages = ({
  bookingId,
  isVisible,
  setVisible,
  setUnreadCount,
  unreadCount,
  firebaseStatus,
  theme,
}) => {
  const user = useSelector(state => state.user);
  const [channel, setChannel] = useState();
  const [currentChannel, setCurrentChannel] = useState();
  const { clientChat } = useChatContext();

  const addMember = async (member, channel) => {
    try {
      if (channel) {
        await channel.addMembers([member]);
      }
    } catch (e) {}
  };

  const init = async () => {
    const userId = `${user.data?.userId}`;
    const channel = clientChat.channel('messaging', bookingId);
    addMember(userId, channel);
    setChannel(channel);
    setCurrentChannel(channel);
  };

  const markAllRead = useCallback(async () => {
    await currentChannel.markRead();
    setUnreadCount(0);
  }, [currentChannel]);

  useEffect(() => {
    if (bookingId && clientChat && user.data?.userId) {
      init();
    }
  }, [bookingId, firebaseStatus]);

  useEffect(() => {
    let listener;
    if (currentChannel) {
      listener = clientChat.on(event => {
        if (event.type === 'message.new') {
          if (currentChannel.id === event.channel_id) {
            // console.log(
            //   'channel.state.unreadCount',
            //   currentChannel?.state?.unreadCount,
            // );
            if (unreadCount === 0) {
              setUnreadCount(prev => {
                if (prev !== 0) {
                  return prev;
                }
                return currentChannel?.state?.unreadCount;
              });
            }
          }
        }
      });
    }
    return () => listener?.unsubscribe();
  }, [currentChannel]);

  useEffect(() => {
    if (isVisible) {
      if (currentChannel) {
        setChannel(currentChannel);
        markAllRead();
      }
    } else {
      setChannel(null);
    }
  }, [isVisible]);

  return (
    <ModalChatComponent
      unreadCount={unreadCount}
      client={clientChat}
      channel={channel}
      visible={isVisible}
      setVisible={setVisible}
      theme={theme}
    />
  );
};

export default VideoCallMessages;
