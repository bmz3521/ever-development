/* eslint-disable indent */
import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  AppState,
  RefreshControl,
  Image,
  Animated,
  StyleSheet,
  LogBox,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Intercom, { IntercomEvents } from '@intercom/intercom-react-native';
import {
  NetworkError,
  Text,
  IntercomButton,
  ModalFirstTimeLanguage,
} from '@components';
import Loading from '@components/Loading';
import * as AsyncStorage from '@utils/asyncStorage';
import { INITIAL_LANGUAGE } from '@_config/constants';
import * as Utils from '@utils';
import { Images } from '@config';
import moment from 'moment';
import { useTheme, Avatar, Divider } from 'react-native-elements';
import Toast from './Toast';
import { intercomConfig } from './intercomConfig';
import { useSelector } from 'react-redux';
import { getTwoLastestContent } from 'app/services/contentFeedService';
import _ from 'lodash';
import NetInfo from '@react-native-community/netinfo';
import i18next from 'i18next';
import LottieView from 'lottie-react-native';

import { createBookingByTreatmentId } from '@services/bookingService';
import { getCovidTreatments } from '@services/treatmentService';
import CalendarImage from '../../assets/images/calendar.png';
import Activity from './images/Activity.png';
import Information from './images/Information.png';
import Records from './images/Records.png';
import Hospital from './images/Hospital.png';
import Pharmacy from './images/Pharmacy.png';
import ContentPost from './images/ContentPost.png';
import DoctorLottie from 'app/assets/lottie-animation/Doctor.json';

export default function HomeScreen({ navigation }) {
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const telemedicine = useSelector(state => state.telemedicine);
  const isFocused = useIsFocused();
  const [covidTreatments, setCovidTreatments] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [networkStatus, setNetworkStatus] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [heightHeader, setHeightHeader] = React.useState(null);
  const { theme } = useTheme();
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const heightImageBanner = Utils.scaleWithPixel(140);
  const [feedContent, setFeedContent] = React.useState([]);
  const [visible, setVisible] = React.useState(true);
  const [laguageModal, setLaguageModal] = React.useState(false);
  // LogBox.ignoreLogs(['Animated.event']);

  const isShowTopMenu = () => {
    const orgs = user?.data?.organizations ?? [];
    const isAuth = auth?.isAuthenticated ?? false;
    const isOrgSupport = orgs?.some(item => item.id != 4);
    return isAuth && isOrgSupport;
  };

  const { events } = intercomConfig({
    userId: user?.data?.userId,
    firstname: user?.data?.firstname,
    lastname: user?.data?.lastname,
    email: user?.data?.email,
    setVisible,
  });

  const checkCovidTreatment = async () => {
    try {
      if (auth.isAuthenticated) {
        const treatments = await getCovidTreatments(user?.data?.userId);
        const treatment = treatments.find(item => !item.discharge);
        setCovidTreatments(treatment);
        return treatment;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCovidBannerPress = async () => {
    const treatmentDischargeFalse = await checkCovidTreatment();
    if (treatmentDischargeFalse !== undefined) {
      const bookings = treatmentDischargeFalse.bookings;
      const bookingProceeding = bookings.filter(item =>
        [`DOCTOR_PENDING`, `DOCTOR_PENDING_NOTE`].includes(item.status),
      );

      let bookingId;
      if (bookingProceeding.length > 0) {
        bookingId = bookingProceeding[0].id;
        console.log('Has Booking');
      } else {
        const _booking = bookings[0];
        const newData = {
          admitTime: moment().toISOString(),
          bookingCategory: `covid`,
          status: `DOCTOR_PENDING`,
          bookingType: 'Telemedicine',
          bookingTypeId: 0,
          treatmentId: _booking?.treatmentId,
          covidForm: _booking?.covidForm,
        };
        const newBooking = await createBookingByTreatmentId(newData);
        bookingId = newBooking.id;
        console.log('New Booking');
      }

      navigation.navigate('BookingStack', {
        screen: 'MyBookingActivity',
        params: { bookingId: bookingId },
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    // Handle PushNotification
    const appChangeListener = AppState.addEventListener(
      'change',
      nextAppState => nextAppState === 'active' && Intercom.handlePushMessage(),
    );

    // Handle message count changed
    const countListener = Intercom.addEventListener(
      IntercomEvents.IntercomUnreadCountDidChange,
      response => {
        console.log('Intercom count...');
        console.log(response.count);
      },
    );

    auth.isAuthenticated && user?.data?.userId
      ? events.loginAsUser()
      : events.loginAsGuest();

    return () => {
      countListener.remove();
      appChangeListener.remove();
    };
  }, [auth.isAuthenticated, user?.data]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setIsLoading(true);
    await checkCovidTreatment();
    setRefreshing(false);
    new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchContent = React.useCallback(async () => {
    try {
      const lastTwoContents = await getTwoLastestContent();
      setFeedContent(lastTwoContents);
    } catch (e) {
      console.log('failed to fetch content');
    }
  }, []);

  const featuresData = [
    {
      id: 1,
      icon: Activity,
      name: i18next.t('HOME_BOOKING_ACTIVITY'),
      stack: 'InitStack',
      route: 'MyBookingsUI',
      disabled: false,
    },
    {
      id: 2,
      icon: Information,
      name: i18next.t('HOME_PATIENT_RECORD'),
      stack: 'InitStack',
      route: 'PatientHIEBookingHistory',
      disabled: false,
    },
    {
      id: 3,
      icon: Records,
      name: i18next.t('HOME_HEALTH_DIARY'),
      stack: 'MainStack',
      route: 'HealthActivity',
      disabled: false,
    },
    {
      id: 4,
      icon: Hospital,
      name: i18next.t('HOME_COMMU_PHARMA'),
      stack: 'MainStack',
      route: 'Home',
      disabled: true,
    },
    // {
    //   id: 5,
    //   icon: Images.homeicon7,
    //   name: i18next.t('HOME_NEWS'),
    //   stack: 'MainStack',
    //   route: 'ContentFeed',
    //   disabled: false,
    // },
    {
      id: 6,
      icon: Pharmacy,
      name: i18next.t('HOME_USER_ACCOUNT'),
      stack: 'ProfileStack',
      route: 'Profile',
      disabled: false,
    },
  ];

  const screenInit = () => {
    setIsLoading(true);
    NetInfo.addEventListener(state => {
      if (state?.isInternetReachable) {
        events.checkIntercomVisibility();
        checkCovidTreatment();
        fetchContent();
      }
      setNetworkStatus(state.isInternetReachable);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const result = await AsyncStorage.getItem(INITIAL_LANGUAGE, true);
      setLaguageModal(result);
    })();
    screenInit();
    events.launchIntercomAfterReboot();
  }, [isFocused]);

  const styles = StyleSheet.create({
    topBarContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
      shadowColor: theme.colors.grey1,
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      elevation: 5,
    },
    topBarLogoContainer: {
      flex: 0.4,
      height: 50,
      backgroundColor: theme.colors.white,
      borderTopEndRadius: 50,
      borderBottomEndRadius: 50,
      paddingVertical: 10,
    },
    topBarImage: {
      height: '100%',
      width: '100%',
    },
    topBarIconContainer: {
      flexDirection: 'row',
    },
    topBarIcon: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      paddingLeft: 5,
      justifyContent: 'center',
      alignSelf: 'flex-end',
    },
    topBarBadgeContainer: {
      position: 'absolute',
      top: 5,
      left: 1,
    },
    topBarBadgeText: { fontFamily: theme.fontFamilyDefault },
    scrollView: { backgroundColor: theme.colors.white },
    bookingItemContainer: { padding: 10 },
    bookingFullButton: {
      backgroundColor: theme.colors.white,
      flex: 1,
      height: 70,
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      borderLeftWidth: 5,
      borderLeftColor: theme.colors.primary,
    },
    bookingButtonText: {
      fontSize: theme.fontSizeSmall,
      fontFamily: theme.fontFamilyBold,
      paddingTop: 10,
    },
    bookingButtonSubText: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeSmaller,
      color: theme.colors.grey3,
    },
    bookingHalfButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bookingHalfButtonLeft: {
      backgroundColor: theme.colors.white,
      flex: 1,
      height: 60,
      padding: 10,
      marginRight: 5,
      borderRadius: 10,
      borderLeftWidth: 5,
      borderLeftColor: theme.colors.primary,
    },
    bookingHalfButtonRight: {
      height: 120,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      backgroundColor: theme.colors.white,
      flex: 1,
      padding: 10,
      borderRadius: 5,
      borderLeftWidth: 5,
      borderLeftColor: theme.colors.primary,
    },
    contentFeedContainer: { marginVertical: 10 },
  });

  return (
    <React.Fragment>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: new Animated.Value(0) },
            },
          },
        ])}
        onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
        scrollEventThrottle={8}
      >
        <Loading isVisible={isLoading} />
        <Animated.Image
          source={require('@assets/images/topsplash.jpg')}
          style={[
            { height: 140, width: '100%', position: 'absolute' },
            {
              height: new Animated.Value(0).interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(90),
                  Utils.scaleWithPixel(90),
                ],
                outputRange: [heightImageBanner, heightHeader, 0],
              }),
            },
          ]}
        />

        {/* COVID BANNER */}
        <View style={{ paddingTop: 80 }}>
          {covidTreatments !== undefined && (
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={onCovidBannerPress}
                style={{
                  shadowColor: theme.colors.shadows,
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.5,
                  elevation: 6,
                  flex: 1,
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  borderRadius: 10,
                  flexDirection: 'row',
                  padding: 10,
                }}
                activeOpacity={0.8}
              >
                <LottieView
                  style={{ height: 60, top: 3, left: -5, position: 'absolute' }}
                  source={DoctorLottie}
                  autoPlay
                  loop
                />
                <View style={{ flex: 1, marginLeft: 65 }}>
                  <Text
                    type="h5"
                    style={{ color: '#FFFFFF' }}
                  >{`คุณอยู่ในช่วงเฝ้าระวังอาการอย่างใกล้ชิด`}</Text>
                  <Text
                    type="body3"
                    style={{ color: '#FFFFFF' }}
                  >{`คุณสามารถเข้าห้องรอพบแพทย์ได้ตลอด 24 ชั่วโมง`}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {isShowTopMenu() && (
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  auth.isAuthenticated
                    ? navigation.navigate('MainStack', {
                        screen: 'HealthActivity',
                      })
                    : navigation.navigate('AuthStack', { screen: 'SignIn' })
                }
                style={{
                  shadowColor: theme.colors.shadows,
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.5,
                  elevation: 6,
                  flex: 1,
                  height: 160,
                  backgroundColor: theme.colors.secondary,
                  marginRight: 5,
                  borderRadius: 10,
                }}
                activeOpacity={0.8}
              >
                <View style={{ position: 'absolute', top: 10, left: 18 }}>
                  <Text
                    style={{
                      fontSize: theme.fontSizeLarger,
                      fontFamily: theme.fontFamilyBold,
                      color: theme.colors.white,
                    }}
                  >
                    {i18next.t('HOME_HEALTH_DIARY')}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  covidTreatments !== undefined
                    ? Alert.alert(
                        `แจ้งเตือน`,
                        `ท่านมีบริการ HI ที่ยังไม่เสร็จสิ้น หากต้องการดำเนินการต่อกรุณาแตะที่ปุ่มด้านบน`,
                        [
                          {
                            text: i18next.t('CONFIRM_BUTTON'),
                          },
                        ],
                      )
                    : auth.isAuthenticated
                    ? navigation.navigate('MainStack', {
                        screen: 'HealthQuestion',
                      })
                    : navigation.navigate('AuthStack', { screen: 'SignIn' })
                }
                style={{
                  shadowColor: theme.colors.shadows,
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.5,
                  elevation: 6,
                  flex: 1,
                  backgroundColor: theme.colors.primary,
                  marginLeft: 5,
                  borderRadius: 10,
                }}
                activeOpacity={0.8}
              >
                <View style={{ position: 'absolute', top: 10, left: 18 }}>
                  <Text
                    style={{
                      fontSize: theme.fontSizeLarger,
                      fontFamily: theme.fontFamilyBold,
                      color: theme.colors.white,
                    }}
                  >
                    {i18next.t('HOME_HI_SERVICE')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ padding: 10, paddingVertical: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  padding: 10,
                  backgroundColor: theme.colors.white,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 160,
                  flex: 1,
                  marginRight: 5,
                  shadowColor: theme.colors.shadows,
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.3,
                  elevation: 6,
                }}
                onPress={() =>
                  auth.isAuthenticated
                    ? navigation.navigate('MainStack', {
                        screen: 'PractitionerType',
                        // screen: 'MedicalSearchPage',
                      })
                    : navigation.navigate('AuthStack', { screen: 'SignIn' })
                }
              >
                <Image
                  source={CalendarImage}
                  style={{ width: 80, height: 80, marginBottom: 5 }}
                />
                <Text
                  style={{
                    fontSize: theme.fontSizeSmall,
                    fontFamily: theme.fontFamilyBold,
                    paddingTop: 10,
                  }}
                >
                  {i18next.t('HOME_MAKE_BOOKING')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  padding: 10,
                  backgroundColor: theme.colors.white,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 160,
                  flex: 1,
                  marginLeft: 5,
                  shadowColor: theme.colors.shadows,
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.3,
                  elevation: 6,
                }}
                onPress={() => {
                  if (telemedicine.booking && telemedicine.firebase) {
                    navigation.navigate('VideoCall', {});
                  } else {
                    auth.isAuthenticated
                      ? navigation.navigate('MainStack', {
                          screen: 'RoundRobinLandingPage',
                          // screen: 'TelePayment',
                          // screen: 'PaymentOrder',
                          // params: {
                          //   bookingCategory: `general`,
                          // },
                        })
                      : navigation.navigate('AuthStack', { screen: 'SignIn' });
                  }
                }}
              >
                <Image
                  source={Images.homeicon7}
                  style={{ width: 80, height: 80, marginBottom: 5 }}
                />
                <Text style={styles.bookingButtonText}>
                  {i18next.t(`HOME_CONTACT_PHYSICIAN`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: theme.colors.white,
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              // justifyContent: 'space-around',
              alignContent: 'space-around',
              height: 200,
              marginVertical: 20,
              borderRadius: 10,
              marginHorizontal: 10,
            }}
          >
            {featuresData.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={{ flexBasis: '33.333333%', alignItems: 'center' }}
                  onPress={() =>
                    item.disabled
                      ? Alert.alert(
                          i18next.t('UNDERDEVELOPMENT_MODAL_DEV_TITLE'),
                          i18next.t('UNDERDEVELOPMENT_MODAL_DEV_BODY'),
                          [
                            {
                              text: i18next.t('CONFIRM_BUTTON'),
                              onPress: () => navigation.navigate('Home'),
                            },
                          ],
                        )
                      : auth.isAuthenticated && item.route === 'Profile'
                      ? navigation.navigate('Profile')
                      : auth.isAuthenticated
                      ? navigation.navigate(item.stack, { screen: item.route })
                      : navigation.navigate('AuthStack', { screen: 'SignIn' })
                  }
                >
                  <Image
                    source={item.icon}
                    style={{ width: 50, height: 50, marginBottom: 5 }}
                  />
                  <Text style={{ fontFamily: theme.fontFamilyDefault }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* Content Feed  */}
          {/* <TouchableOpacity
            style={{
              backgroundColor: theme.colors.white,
              flex: 1,
              height: 200,
              marginVertical: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
              overflow: 'hidden',
              shadowColor: theme.colors.shadows,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 1,
              elevation: 6,
            }}
            onPress={() =>
              navigation.navigate('MainStack', { screen: 'ContentFeed' })
            }
          >
            <Image
              source={ContentPost}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
            <Text
              style={{
                position: 'absolute',
                left: '4%',
                paddingBottom: 20,
                color: theme.colors.white,
              }}
              type="h3"
            >
              {i18next.t('HOME_FEATURE_NEWS')}
            </Text>
          </TouchableOpacity> */}

          {networkStatus ? (
            <View style={styles.contentFeedContainer}>
              {/* <TagsComponent /> */}
              {/* <Divider width={1} color={theme.colors.grey5} />
            {feedContent.map((feed, index) => {
              return <FeedItem key={index} item={feed} />;
            })} */}
            </View>
          ) : (
            <NetworkError onPress={() => screenInit()} />
          )}
        </View>
      </ScrollView>
      {auth.isAuthenticated &&
        telemedicine.booking &&
        telemedicine.firebase && (
          <Toast navigation={navigation} theme={theme} />
        )}
      {visible && <IntercomButton setVisible={events.interComvisiblehandler} />}
      {laguageModal && (
        <ModalFirstTimeLanguage setLaguageModal={setLaguageModal} />
      )}
    </React.Fragment>
  );
}
