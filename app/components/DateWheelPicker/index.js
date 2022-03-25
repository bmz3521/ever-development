import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useEffect,
} from 'react';
import {
  Text,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import useStyles from './styles';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import moment from 'moment';

const { height } = Dimensions.get('screen');

const DateWheelPicker = (props, ref) => {
  const [visible, setVisible] = useState(false);
  const styles = useStyles();
  const [date, setDate] = useState(new Date());
  const animatedVal = useState(new Animated.Value(0))[0];
  const [heightOfView, setHeightOfView] = useState(0);

  const maximunDate = useMemo(() => {
    if (i18next.language === 'th') {
      return new Date(
        moment()
          .add(543, 'years')
          .endOf('years')
          .toDate(),
      );
    }
    return new Date(
      moment()
        .endOf('years')
        .toDate(),
    );
  }, [i18next.language]);

  useEffect(() => {
    let initialDate = props.initialDate ?? new Date();
    if (i18next.language === 'th') {
      initialDate = moment(initialDate)
        .add(543, 'years')
        .toDate();
    }
    setDate(initialDate);
  }, [props.initialDate]);

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
      Animated.spring(animatedVal, {
        toValue: 100,
        bounciness: 4,
        speed: 17,
        delay: 300,
        useNativeDriver: true,
      }).start();
    },
    close() {
      setVisible(false);
    },
  }));

  const closeAnimation = type => {
    Animated.timing(animatedVal, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const onConfirmBirthDate = () => {
    let finalDate =
      i18next.language === 'th'
        ? moment(date)
            .subtract(543, 'years')
            .toDate()
        : date;
    if (moment(finalDate).isAfter(new Date())) {
      Alert.alert(i18next.t('MODAL_DATE_INVALID'));
      return;
    }
    props.onSubmit(finalDate);
    closeAnimation();
  };

  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.backDrop}></View>
        <Animated.View
          style={[
            styles.pickerContainer,
            {
              transform: [
                {
                  translateY: animatedVal.interpolate({
                    inputRange: [0, 100],
                    outputRange: [
                      heightOfView === 0 ? height * 0.6 : heightOfView,
                      0,
                    ],
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={styles.innerContainer}
            onLayout={event => setHeightOfView(event.nativeEvent.layout.height)}
          >
            <Text style={styles.titlePicker}>{props.title}</Text>
            <DatePicker
              style={{ marginBottom: 10 }}
              date={date}
              mode="date"
              locale={i18next.language}
              maximumDate={maximunDate}
              onDateChange={setDate}
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.btnDismissContainer}
                onPress={() => closeAnimation()}
              >
                <Text style={styles.labelText}>
                  {i18next.t('CANCEL_BUTTON')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={onConfirmBirthDate}
              >
                <Text style={styles.labelText}>
                  {i18next.t('CONFIRM_BUTTON')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default forwardRef(DateWheelPicker);

DateWheelPicker.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialDate: PropTypes.instanceOf(Date),
};
