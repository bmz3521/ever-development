import React, { useState } from 'react';
import {
  Modal,
  Button,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TextInput, Text } from '@components';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-elements';
import styles from '../styles';

const { height: wHeight } = Dimensions.get('window');

const ModalCreateNewList = ({ visible, top, subShow, actions }) => {
  const { theme } = useTheme();
  const [text, setText] = React.useState('');

  const subRStyle = useAnimatedStyle(() => {
    const opacity = withTiming(subShow.value);
    return {
      opacity,
    };
  });

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback
        onPress={() => {
          top.value = wHeight / 2;
          subShow.value = withTiming(0);
          actions.setNameModalShow(false);
        }}
      >
        <Animated.View style={[StyleSheet.absoluteFill]} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles(theme).popContainer, subRStyle]}>
        <View style={styles(theme).popCloseIcon}>
          <TouchableOpacity
            onPress={() => {
              top.value = wHeight / 2;
              subShow.value = withTiming(0);
              actions.setNameModalShow(false);
              setText('');
            }}
          >
            <Ionicons name="close-outline" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles(theme).popHeaderContainer}>
          <Text type="h6">Name this list</Text>
        </View>
        <View style={styles(theme).divider} />

        {/* Input */}
        <View style={styles(theme).inputWrapper}>
          <TextInput
            label={'Name'}
            maxLength={50}
            value={text}
            onChangeText={setText}
            placeholderTextColor={theme.colors.grey3}
            style={[styles(theme).textInput]}
          />
          <Text type="body3" style={{ color: theme.colors.grey3 }}>
            50 characters maximum
          </Text>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          disabled={text.trim().length === 0}
          onPress={async () => {
            try {
              await actions.onCreate(text).then(res => console.log(res));
              await actions.getSavelist();
            } catch (err) {
              console.log('err', err);
            } finally {
              setText('');
              top.value = wHeight / 2;
              subShow.value = withTiming(0);
              actions.setNameModalShow(false);
            }
          }}
        >
          <View
            style={[
              styles(theme).button,
              {
                backgroundColor:
                  text.trim().length === 0 ? 'grey' : theme.colors.primary,
              },
            ]}
          >
            <Text type="buttonLarge" style={styles(theme).createButton}>
              Create
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default ModalCreateNewList;
