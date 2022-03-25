import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import i18next from 'i18next';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BaseColor } from '@config';
import styles from './styles';

const { height, width } = Dimensions.get('screen');

const BottomSheet = (props, ref) => {
  const [isShow, setIsShow] = useState(false);
  const animatedVal = useState(new Animated.Value(0))[0];
  const [heightOfView, setHeightOfView] = useState(0);

  useEffect(() => {
    animatedVal.setValue(0);
    return;
  }, []);

  useEffect(() => {
    if (heightOfView > 0 && isShow) {
      Animated.parallel([
        Animated.timing(animatedVal, {
          toValue: 90,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(animatedVal, {
          toValue: 100,
          bounciness: 4,
          speed: 17,
          delay: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [heightOfView, isShow]);

  const closeAnimation = type => {
    Animated.timing(animatedVal, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsShow(false);
      if (['file', 'camera', 'gallery'].includes(type)) props.onPress(type);
    });
  };

  useImperativeHandle(ref, () => ({
    show() {
      setIsShow(true);
    },
    close() {
      setIsShow(false);
    },
  }));

  const RenderIcon = ({ iconName, label }) => {
    return (
      <View style={styles.uploadIconContainer}>
        <Ionicons
          name={iconName}
          size={30}
          color={BaseColor.darkPrimaryColor}
        />
        <Text
          style={{
            color: BaseColor.darkPrimaryColor,
            fontFamily: 'Prompt-Regular',
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  return (
    <Modal visible={isShow} transparent>
      <TouchableWithoutFeedback onPress={closeAnimation}>
        <View style={styles.uploadBackdrop}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: animatedVal.interpolate({
                    inputRange: [0, 100],
                    outputRange: [
                      heightOfView === 0 ? height * 0.5 : heightOfView,
                      15,
                    ],
                  }),
                },
              ],
            }}
          >
            <TouchableWithoutFeedback>
              <View
                onLayout={event =>
                  setHeightOfView(event.nativeEvent.layout.height)
                }
                style={styles.uploadContainer}
              >
                <Text style={styles.titleUpload}>
                  {i18next.t('BTMSHEETPICKER_UPLOAD')}
                </Text>
                <Text style={styles.subTitleUpload}>
                  {i18next.t('BTMSHEETPICKER_TOOLS')}
                </Text>
                <View style={styles.divider} />
                <ScrollView
                  bounces={false}
                  horizontal
                  contentContainerStyle={{ paddingVertical: 5 }}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    {props.file != false && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => closeAnimation('file')}
                        style={styles.btnUpload}
                      >
                        <RenderIcon iconName="file-tray" label="Files" />
                      </TouchableOpacity>
                    )}
                    {props.btnUpload != false && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => closeAnimation('camera')}
                        style={styles.btnUpload}
                      >
                        <RenderIcon
                          iconName="camera"
                          label={i18next.t('BTMSHEETPICKER_CAMERA')}
                        />
                      </TouchableOpacity>
                    )}
                    {props.gallery != false && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => closeAnimation('gallery')}
                        style={styles.btnUpload}
                      >
                        <RenderIcon
                          iconName="ios-image"
                          label={i18next.t('BTMSHEETPICKER_GALLERY')}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default forwardRef(BottomSheet);
