import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useChatContext } from 'app/hooks/useGetStream';

const useHooks = ({ navigation, route }) => {
  const { clinicName, booking } = route?.params;
  const user = useSelector(state => state.user.data);
  const { clientChat } = useChatContext();
  const channelId = `${booking?.id}`;
  const userId = `${user?.userId}`;
  const name = `${user?.firstname} ${user?.lastname}`;
  const [channel, setChannel] = useState();

  useEffect(() => {
    if (clientChat) {
      const channel = clientChat.channel('messaging', channelId, {
        name: `${name} - ${clinicName}`,
        members: [userId],
      });
      setChannel(channel);
    }
  }, []);

  return {
    clientChat,
    channel,
    clinicName,
  };
};

export default useHooks;
