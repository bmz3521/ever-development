import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import styles from './styles';

const { height } = Dimensions.get('screen');

const CustomBottomSheet = (props, ref) => {
  const [isShow, setIsShow] = useState(false);
  const animatedVal = useState(new Animated.Value(0))[0];
  const [heightOfView, setHeightOfView] = useState(0);

  useEffect(() => {
    animatedVal.setValue(0);
    return;
  }, []);

  useEffect(() => {
    if (heightOfView > 0 && isShow) {
      Animated.spring(animatedVal, {
        toValue: 100,
        bounciness: 4,
        speed: 17,
        delay: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [heightOfView, isShow]);

  const closeAnimation = type => {
    Animated.timing(animatedVal, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsShow(false);
    });
  };

  const bounceVal = useMemo(
    () =>
      animatedVal.interpolate({
        inputRange: [0, 100],
        outputRange: [heightOfView === 0 ? height * 0.5 : heightOfView, 15],
      }),
    [animatedVal],
  );

  useImperativeHandle(ref, () => ({
    show() {
      setIsShow(true);
    },
    close() {
      animatedVal.setValue(0);
      setIsShow(false);
    },
  }));
  return (
    <Modal visible={isShow} transparent>
      <TouchableWithoutFeedback onPress={closeAnimation}>
        <View style={styles.uploadBackdrop}>
          <Animated.View
            style={{
              transform: [{ translateY: bounceVal }],
            }}
          >
            <TouchableWithoutFeedback>
              <View
                onLayout={event =>
                  setHeightOfView(event.nativeEvent.layout.height)
                }
                style={styles.uploadContainer}
              >
                {props.children}
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default forwardRef(CustomBottomSheet);
