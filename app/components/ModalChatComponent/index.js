import React, { memo, useState, useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  Chat,
  OverlayProvider,
  MessageList,
  MessageInput,
  Channel,
} from 'stream-chat-react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

const ModalChatComponent = ({
  client,
  channel,
  visible,
  setVisible,
  theme,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const HeaderComponent = memo(({ title }) => (
    <View style={styles(theme).headerContainer}>
      <Text style={{ textAlign: 'center' }}>{title}</Text>
    </View>
  ));

  const LoadingComponent = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={'large'} color={theme.colors.primary} />
    </View>
  );

  const y = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    if (visible) {
      y.value = isKeyboardVisible
        ? withTiming(SCREEN_HEIGHT / 1.1 + 40)
        : withTiming(SCREEN_HEIGHT / 1.1);
    } else {
      y.value = withTiming(0);
    }

    const bottom = interpolate(
      y.value,
      [0, SCREEN_HEIGHT / 1.1],
      [-40, -1],
      Extrapolate.CLAMP,
    );

    return {
      height: y.value,
      bottom,
    };
  });

  return (
    <Animated.View
      style={[
        rStyle,
        {
          flex: 1,
          width: SCREEN_WIDTH,
          position: 'absolute',
          zIndex: 2,
        },
      ]}
    >
      <OverlayProvider>
        <View style={styles(theme).flexEndContainer}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            activeOpacity={0.9}
            style={[styles(theme).closeBtnContainer]}
          >
            <Icon
              type="font-awesome-5"
              name="chevron-down"
              size={16}
              color={theme.colors.primary}
            />
          </TouchableOpacity>

          <Animated.View
            style={{
              backgroundColor: theme.colors.white,
              flex: 1,
            }}
          >
            {client ? (
              <Chat style={{ height: SCREEN_HEIGHT * 0.5 }} client={client}>
                {channel && (
                  <Channel
                    reactionsEnabled={false}
                    DateHeader={() => <></>}
                    channel={channel}
                  >
                    <MessageList />
                    <MessageInput />
                  </Channel>
                )}
              </Chat>
            ) : (
              <LoadingComponent />
            )}
          </Animated.View>
        </View>
      </OverlayProvider>
    </Animated.View>
  );
};

export default ModalChatComponent;
