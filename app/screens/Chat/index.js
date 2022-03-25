import React from 'react';
import { Header, SafeAreaView, Loading2 } from '@components';
import {
  OverlayProvider,
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native';

import useHooks from './hooks';
import { BaseStyle } from 'app/theme-config';
import { Text, View, StyleSheet } from 'react-native';

const ChatScreen = ({ navigation, route }) => {
  const { clientChat, channel, clinicName } = useHooks({
    navigation,
    route,
  });

  return (
    <OverlayProvider>
      {clientChat ? (
        <Chat client={clientChat}>
          {channel ? (
            <Channel
              reactionsEnabled={false}
              channel={channel}
              DateHeader={() => <></>}
            >
              <SafeAreaView
                style={[BaseStyle.safeAreaView]}
                forceInset={{ top: 'always' }}
              >
                <Header
                  text={clinicName}
                  onPressLeft={() => navigation.goBack()}
                />
                <MessageList />
                <MessageInput />
              </SafeAreaView>
            </Channel>
          ) : (
            <Loading2 />
          )}
        </Chat>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <Header text={clinicName} onPressLeft={() => navigation.goBack()} />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Sorry chat is currently unavailable</Text>
          </View>
        </SafeAreaView>
      )}
    </OverlayProvider>
  );
};

export default ChatScreen;
