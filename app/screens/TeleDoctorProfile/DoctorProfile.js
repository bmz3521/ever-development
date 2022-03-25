import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Header, SafeAreaView, Text, Icon, Image } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { BaseStyle, BaseColor } from '@config';
import MobileIcon from '@assets/images/mobile-icon.png';
import CalendarIcon from '@assets/images/calendar-icon.png';
import RejectIcon from '@assets/images/reject-icon.png';
import { TelemedicineActions } from '@actions';
import {
  PERMISSIONS,
  checkMultiple,
  RESULTS,
  requestMultiple,
  request,
} from 'react-native-permissions';

import styles from './stylesProfile';

import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import {
  Container,
  Card,
  Card2,
  TopCard,
  ProfileImage,
  Row,
  BottomRow,
  MainContainer,
} from './style';
import { Dimensions } from 'react-native';
import { ItemRow } from '../PractitionerType/components/Dropdown/style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DoctorProfile = ({ navigation }) => {
  const telemedicine = useSelector(state => state.telemedicine);
  const dispatch = useDispatch();
  const [theStatus, setStatus] = useState('online');
  // Doctor ID Parameter

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [textShown2, setTextShown2] = useState(false); //To show ur remaining Text

  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const toggleNumberOfLines2 = () => {
    //To toggle the show text or hide it
    setTextShown2(!textShown2);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    console.log('nativeevent');
    console.log(e.nativeEvent);
  }, []);

  // var ref = firebase.database().ref(`/doctorStatus/${id}`);
  // ref.once("value")
  // 	.then(function (snapshot) {
  // 		let data = snapshot.val();
  // 		let status = data.status;
  // 		console.log('refff');
  // 		console.log(status);
  // 		setStatus(status)
  // 	});

  const checkPermissions = async callback => {
    const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    const androidPermissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ];
    try {
      const currentPlatform =
        Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      const status = await checkMultiple(currentPlatform);
      const [CAMERA, AUDIO] = currentPlatform;
      const isUnavailable =
        status[CAMERA] === RESULTS.UNAVAILABLE ||
        status[AUDIO] === RESULTS.UNAVAILABLE;
      const isBlocked =
        status[CAMERA] === RESULTS.BLOCKED || status[AUDIO] === RESULTS.BLOCKED;
      const isDeniedAll =
        status[CAMERA] === RESULTS.DENIED && status[AUDIO] === RESULTS.DENIED;
      const isDeniedOnce =
        status[CAMERA] === RESULTS.DENIED || status[AUDIO] === RESULTS.DENIED;
      const isAllowed =
        status[CAMERA] === RESULTS.GRANTED || status[AUDIO] === RESULTS.GRANTED;

      // Check hardware is support ?
      if (isUnavailable) {
        return Alert.alert(
          'Error',
          'Hardware to support video calls is not available',
        );
      }

      // Check user blocked ?
      if (isBlocked) {
        return Alert.alert(
          'Error',
          'Permission to access . hardware was blcoked, Please grant manually',
        );
      }

      // User is denied all hardware at system require
      if (isDeniedAll) {
        const statusNew = await requestMultiple(currentPlatform);
        const isAllowAll =
          statusNew[CAMERA] === RESULTS.GRANTED &&
          statusNew[AUDIO] === RESULTS.GRANTED;
        if (!isAllowAll) {
          return Alert.alert('Error', 'One of the permissions was not granted');
        }
        return callback && callback();
      }

      // User is denied once of hardware at system require
      if (isDeniedOnce) {
        const isCameraDenied =
          status[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO;
        const isGranted = await request(isCameraDenied);
        if (!isGranted) {
          return Alert.alert('Error', 'Permission not granted');
        }
        return callback && callback();
      }

      // User is allowd hardware at system require
      if (isAllowed) {
        return callback && callback();
      }
      return Alert.alert('Error', 'Please contact admin');
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  const handleGoScreen = (name, type) => {
    if (type) {
      const data = {
        ...telemedicine.data,
        consultCaseType: type,
      };
      dispatch(TelemedicineActions.setTelemedicine(data));
    }
    console.log(' handleGoScreen telemed data');

    console.log(telemedicine);
    navigation.navigate(name);
  };

  const onPressCall = (name, type) => {
    if (type === 'video' || type === 'voice') {
      return checkPermissions(() => handleGoScreen(name, type));
    }
    return handleGoScreen(name, type);
  };

  const renderGroupIcon = (
    icon,
    lable,
    name,
    type,
    color,
    textColor,
    borderColor,
  ) => {
    return (
      <TouchableOpacity
        /*underlayColor="transparent"*/
        activeOpacity={0.5}
        style={
          (styles.iconTopParent4,
          {
            flex: 1,
            backgroundColor: color,
            borderRadius: 12,
            padding: 15,
            borderColor: borderColor,
            borderWidth: 1,
          })
        }
        onPress={() => onPressCall(name, type)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <Icon
                  name={icon}
                  // color={BaseColor.primaryColor}
                  // solid
                  style={{ width: 60, height: 60, marginBottom: 10 }}
                /> */}

          <Icon
            name={icon}
            style={{
              fontSize: 18,
              color: textColor,
            }}
          />
          <Text bold style={{ color: textColor, fontSize: 14 }} grayColor>
            {'\t\t' + lable + '\t\t'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const styles = StyleSheet.create({
  //   textOnline: {
  //     color: 'green',
  //     fontWeight: 'bold',
  //   },
  //   textOffline: {
  //     color: 'red',
  //     fontWeight: 'bold',
  //   },
  // });

  const education =
    telemedicine.data &&
    telemedicine.data.doctor &&
    telemedicine.data.doctor.detail &&
    telemedicine.data.doctor.detail.educational
      ? telemedicine.data.doctor.detail.educational.split(',')
      : '';
  console.log(education);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Container>
        <Card>
          <TopCard>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
              <View>
                <ProfileImage
                  source={{
                    uri: _.get(telemedicine, 'data.doctor.profileImage'),
                  }}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <View
                  style={{
                    flexDirection: 'column',
                    flexShrink: 1,
                  }}
                >
                  <Text
                    primaryColor
                    bold
                    style={{
                      marginTop: 10,
                      marginLeft: 10,
                      fontSize: 16,
                      color: '#00bae5',
                    }}
                  >
                    {_.get(telemedicine, 'data.doctor.fullname')}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      marginLeft: 10,
                      fontSize: 14,
                      color: '#A2A2A2',
                    }}
                  >
                    <Icon
                      name="hospital"
                      style={{
                        fontSize: 14,
                        width: 25,
                        color: '#A2A2A2',
                      }}
                    />{' '}
                    คณะแพทย์ศาสตร์
                    {_.get(telemedicine, 'data.doctor.detail.hospital')}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
              <Text
                style={{
                  marginTop: 2,
                  marginLeft: 0,
                  fontSize: 14,
                  color: '#A2A2A2',
                }}
              >
                <Icon
                  name="hospital"
                  style={{
                    fontSize: 14,
                    width: 25,
                    color: '#A2A2A2',
                  }}
                />{' '}
                คณะแพทย์ศาสตร์
                {_.get(telemedicine, 'data.doctor.detail.hospital')}
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  marginLeft: 0,
                  fontSize: 14,
                  color: '#A2A2A2',
                }}
              >
                <Icon
                  name="book"
                  style={{
                    fontSize: 14,
                    width: 25,
                    color: '#A2A2A2',
                  }}
                />{' '}
                {_.get(telemedicine, 'data.doctor.detail.specialist')}
              </Text>
            </View>

            <View
              style={{
                marginVertical: 8,
                marginTop: 20,
                marginBottom: 10,
                width: '100%',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  justifyContent: 'flex-start',
                }}
              >
                <View
                  style={{
                    width: '40%',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20,
                  }}
                >
                  {renderGroupIcon(
                    'calendar',
                    'ถามคำถาม',
                    'Appointment',
                    '#087951',
                    '#f2f2f2',
                    '#575757',
                    '#cfcfcf',
                  )}
                </View>
                {theStatus == 'online' ? (
                  <View
                    style={{
                      width: '50%',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {renderGroupIcon(
                      'calendar',
                      'ทำการนัดหมาย',
                      'Appointment',
                      '#087951',
                      '#087951',
                      'white',
                      '#087951',
                    )}
                  </View>
                ) : (
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {renderGroupIcon(
                      CalendarIcon,
                      'Appointment',
                      'Appointment',
                    )}
                  </View>
                )}
              </View>
            </View>
            <Text
              style={{
                alignSelf: 'flex-start',
                color: '#696969',
                fontSize: 13,
              }}
            >
              859 people like this
            </Text>
          </TopCard>
        </Card>
      </Container>
    </SafeAreaView>
  );
};

export default DoctorProfile;
