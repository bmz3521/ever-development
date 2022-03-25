import React, { useCallback, useRef } from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
  Composer,
  Avatar,
} from 'react-native-gifted-chat';
import { ImageViewerModal, Loading, BottomSheetPicker } from '@components';
import { BaseColor, Images } from '@config';
import { Icon } from 'react-native-elements';
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Text,
  Linking,
} from 'react-native';
import styles from './styles';
import { useHooks } from './hooks';
import { renderIcon } from './renderMsg';

const { width, height } = Dimensions.get('screen');

function GiftedChatMessage(props) {
  const {
    route,
    navigation,
    bookingId,
    setChatScreen,
    isRoundRobin,
    isVisible,
    firebaseStatus,
    // isRoundRobinPharmacy,
    // isRoundRobinNurse,
  } = props;
  const { messages, actions, userId, loadingVisible } = useHooks({
    bookingId,
    navigation,
    isRoundRobin,
    firebaseStatus,
  });
  const modalPickerRef = useRef();

  let isNavigate = false;
  let onlyRead = false;
  if (route && route.params) {
    onlyRead = route.params.onlyRead;
    isNavigate = route.params.isNavisgate;
  }

  const renderBubble = useCallback(props => {
    if (props.currentMessage.file) {
      const textMsg = `${props.currentMessage.text}`;
      return (
        <View style={{ marginVertical: 2 }}>
          <TouchableOpacity
            onPress={() => Linking.openURL(props.currentMessage.file)}
            activeOpacity={0.7}
            style={styles.rnderFileContainer}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={renderIcon(textMsg.split('.').pop())}
            />
            <Text
              lineBreakMode="tail"
              numberOfLines={1}
              style={styles.fileTitle}
            >
              {textMsg}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: [
            props.currentMessage.image ? { width: width * 0.45 } : {},
            { backgroundColor: '#6646ee' },
          ],
          left: [
            props.currentMessage.image ? { width: width * 0.45 } : {},
            { backgroundColor: '#e3e3e3' },
          ],
        }}
        textStyle={{
          right: { color: '#fff' },
          left: { color: '#333' },
        }}
      />
    );
  }, []);

  const renderImage = useCallback(
    ({ currentMessage }) => {
      return (
        <ImageViewerModal
          images={currentMessage.image}
          isList
          imageList={messages.listImage}
        >
          <View style={styles.rnderImgContainer}>
            <Image
              style={styles.rnderImg}
              source={{ uri: currentMessage.image }}
            />
          </View>
        </ImageViewerModal>
      );
    },
    [messages.listImage],
  );

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  };

  const renderComposer = useCallback(
    props => (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.rnderActinContainer}
          onPress={modalPickerRef?.current?.show}
        >
          <Icon
            type="antdesign"
            name="pluscircleo"
            size={24}
            color={BaseColor.darkPrimaryColor}
          />
        </TouchableOpacity>
        <Composer {...props} textInputStyle={styles.rnderComposer} />
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <Image
              source={Images.sendIcon}
              style={{
                width: 32,
                height: 32,
              }}
            />
          </View>
        </Send>
      </View>
    ),
    [],
  );

  const renderAvatar = useCallback(props => {
    return (
      <Avatar
        {...props}
        containerStyle={{
          left: { marginRight: 0 },
          right: { marginLeft: 0 },
        }}
        imageStyle={{
          left: { borderWidth: 0.5, borderColor: '#d3d3d3' },
          right: { borderWidth: 0.5, borderColor: '#d3d3d3' },
        }}
      />
    );
  }, []);

  const scrollToBottomComponent = useCallback(() => {
    return (
      <View style={styles.bottomComponentContainer}>
        <Icon
          type="font-awesome"
          name="angle-double-down"
          size={32}
          color="#6646ee"
        />
      </View>
    );
  }, []);

  const renderSystemMessage = useCallback(props => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }, []);

  return (
    <Modal animationType="slide" visible={isVisible} transparent>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => setChatScreen(false)}
          activeOpacity={0.9}
          style={styles.closeChatMessage}
        >
          <Icon
            type="font-awesome-5"
            name="chevron-down"
            size={16}
            color={BaseColor.primaryColor}
          />
        </TouchableOpacity>
        <View style={{ backgroundColor: 'white', height: height * 0.7 }}>
          <GiftedChat
            messages={messages.message}
            onSend={!onlyRead ? actions.handleSend : null}
            user={{ _id: userId }}
            placeholder="Aa"
            alwaysShowSend={!onlyRead}
            showUserAvatar={false}
            scrollToBottom
            renderMessageImage={renderImage}
            renderAvatar={renderAvatar}
            renderBubble={renderBubble}
            renderLoading={renderLoading}
            renderComposer={renderComposer}
            scrollToBottomComponent={scrollToBottomComponent}
            renderSystemMessage={renderSystemMessage}
          />
        </View>
        <Loading isVisible={loadingVisible} />
        <BottomSheetPicker
          onPress={actions.openFilePicker}
          ref={modalPickerRef}
          isVisible={false}
        />
      </View>
    </Modal>
  );
}

export default GiftedChatMessage;
