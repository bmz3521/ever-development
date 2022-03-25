import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
} from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-elements';
import useHooks from './hooks';
import ModalCreateNewList from './components/ModalCreateNewList';
import ListItem from './components/ListItem';
import styles from './styles';
import { Text } from '@components';

const { height: wHeight } = Dimensions.get('screen');
const BOTTOM_SHEET_HEIGHT = wHeight;

const ModalSaveList = (props, ref) => {
  const { enableBackdropDismiss } = props;
  const { theme } = useTheme();
  const [isShow, setIsShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [clinicId, setClinicId] = useState('');
  const { savelist, nameModalShow, actions } = useHooks({ clinicId });
  const panGestureRef = useRef();

  const onDismiss = useCallback(() => {
    setIsShow(false);
  }, []);

  useImperativeHandle(ref, () => ({
    show({ clinicId }) {
      setClinicId(clinicId);
      setIsShow(true);
    },
    close() {
      setIsShow(false);
    },
  }));

  const top = useSharedValue(wHeight);
  const subShow = useSharedValue(0);
  const scrollHeight = useSharedValue(wHeight / 2 + 100);

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd(_, context) {
      if (top.value > context.startTop && top.value < wHeight / 2) {
        scrollHeight.value = wHeight / 2 + 100;
        top.value = withTiming(wHeight / 2);
      } else if (
        top.value > BOTTOM_SHEET_HEIGHT / 2 + 200 &&
        context.startTop === wHeight / 2
      ) {
        scrollHeight.value = wHeight / 2 + 100;
        top.value = withTiming(wHeight, undefined, isFinish => {
          if (isFinish) {
            runOnJS(onDismiss)();
          }
        });
      } else if (
        top.value < wHeight / 2 + 10 &&
        context.startTop === wHeight / 2
      ) {
        scrollHeight.value = 100;
        top.value = withTiming(Platform.OS == 'ios' ? 5 : 5);
      } else {
        top.value = withTiming(wHeight / 2);
      }
    },
  });

  useEffect(() => {
    if (isShow) {
      actions.getSavelist();
      setOpen(true);
      scrollHeight.value = wHeight / 2 + 100;
      top.value = withTiming(wHeight / 2);
    } else {
      scrollHeight.value = wHeight / 2 + 100;
      top.value = withTiming(wHeight, undefined, isFinish => {
        if (isFinish && open && isShow) {
          setOpen(false);
        }
      });
    }
  }, [isShow, open]);

  const rSheetStyle = useAnimatedStyle(() => {
    const opacity = withTiming(subShow.value == 0 ? 1 : 0);

    return {
      top: top.value,
      opacity,
    };
  });

  const rScrollStyle = useAnimatedStyle(() => {
    const height = scrollHeight.value;
    return {
      height: height,
    };
  });

  if (!open) {
    return null;
  }

  return (
    <>
      {isShow && (
        <Pressable
          onPress={enableBackdropDismiss ? onDismiss : undefined}
          style={[styles(theme).backDrop]}
        />
      )}
      <Animated.View style={[styles(theme).sheetContainer, rSheetStyle]}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles(theme).header]} ref={panGestureRef}>
            <View style={styles(theme).barIcon} />
            <TouchableOpacity
              style={styles(theme).closeIcon}
              onPress={() => {
                top.value = withTiming(wHeight, undefined, isFinish => {
                  if (isFinish) {
                    runOnJS(onDismiss)();
                  }
                });
              }}
            >
              <Ionicons name="close-outline" size={25} />
            </TouchableOpacity>
            <Text style={styles(theme).headerTitle}>Save to list</Text>
          </Animated.View>
        </PanGestureHandler>

        {/* crete new savelist icon */}
        <View style={styles(theme).contentFirstRow}>
          <TouchableOpacity
            style={styles(theme).rowCenter}
            onPress={() => {
              subShow.value = withTiming(1);
              actions.setNameModalShow(true);
            }}
          >
            <View style={styles(theme).createIcon}>
              <Ionicons name="add-outline" size={30} />
            </View>
            <Text style={styles(theme).creatActionText}>Create new list</Text>
          </TouchableOpacity>
        </View>
        <Animated.ScrollView
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {savelist.map((item, index) => {
            return (
              <ListItem
                item={item}
                key={index}
                actions={actions}
                clinicId={clinicId}
              />
            );
          })}
          <Animated.View style={rScrollStyle} />
        </Animated.ScrollView>
      </Animated.View>

      {/* SubModal */}
      <ModalCreateNewList
        visible={nameModalShow}
        setVisible={actions.setNameModalShow}
        top={top}
        subShow={subShow}
        actions={actions}
      />
    </>
  );
};

export default forwardRef(ModalSaveList);
