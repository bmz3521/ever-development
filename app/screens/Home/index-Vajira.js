import React, { Component } from 'react';
import axios from 'axios';

import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import {
  // Image,
  Text,
  Icon,
  ClinicItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
  CarouselComponent,
  ImageCardComponent,
  Image,
} from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import * as Utils from '@utils';
import styles from './styles';
import { useSelector } from 'react-redux';
import { store } from 'app/store';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { bindActionCreators } from 'redux';
import RNBootSplash from 'react-native-bootsplash';

import i18next from 'i18next';
// import { initReactI18next, useTranslation } from 'react-i18next';
// Load sample data
import { PromotionData, ClinicPackageData, ClinicData } from '@data';
import booking from '../../api/booking';
import { UserData } from '@data';
import UserAvatar from 'react-native-user-avatar';
import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import VajiraCard from '../../components/ImageCardComponent/vajira-card';
import moment from 'moment';

import database from '@react-native-firebase/database';
import AmbulanceIcon from '@assets/images/ambulanceIcon.png';

// import { useHooks } from './hooks';
import CallStatus from './CallStatus';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;

class Home extends Component {
  firebaseRef;

  constructor(props) {
    super(props);

    // this.firebaseRef = database().ref(`/patientStatus/${userTele.dataTele.userId || ''}`);

    // // grab the data from the server and call this.onFirebaseValueChanged every time it changes
    // this.firebaseRef.orderByChild("Question").on("value", this.onFirebaseValueChanged);

    // Temp data define
    this.state = {
      callStatus: '',
      callingDoctorName: '',
      pharmacyCallStatus: '',
      calliingPharmacyName: '',
      modalOpen: false,
      photo: null,
      uploading: false,
      done: false,
      verified: false,
      image: UserData[0].image,
      imageProfile: Images.avata2,
      imageVajira: Images.avata1,
      Loading: true,
      search: '',
      plusClinics: [],
      clinicCloseToCity: [],
      clinicCloseToPublicTransport: [],
      normalClinics: [],
      popularDestinations: [],
      topAsia: [],
      countries: [],
      defaultCountries: [],
      error: null,
      queryString: [],
      recommendedClinics: [],
      selectedOptionLocation: null,
      selectedOptionProcedure: null,
      procedureList: [],
      isLoadingProcedure: true,
      isLoading: true,
      topDentalClinics: [],
      // iconsMany: [
      //   {
      //     icon: 'qrcode',
      //     name: 'แสกน',
      //     route: 'Profile3',
      //   },
      //   {
      //     icon: 'newspaper',
      //     name: 'ข่าวสุขภาพ',
      //     route: 'Post',
      //   },
      //   {
      //     icon: 'bullhorn',
      //     name: 'ประกาศ',
      //     route: 'Post',
      //   },
      //   {
      //     icon: 'shield-alt',
      //     name: 'ข้อมูลสิทธิ',
      //     route: 'EmergencyBeacon',
      //   },
      //   {
      //     icon: 'ambulance',
      //     name: 'ฉุกเฉิน 1669',
      //     route: 'EmergencyBeacon',
      //   },
      //   {
      //     icon: 'user-md',
      //     name: 'แพทย์ประจำตัว',
      //     route: 'Profile',
      //   },
      //   {
      //     icon: 'prescription',
      //     name: 'ร้านยา',
      //     route: 'PharmacyList',
      //   },
      //   {
      //     icon: 'ellipsis-h',
      //     name: 'อื่นๆ',
      //     route: 'More',
      //   },
      // ],
      iconsMany: [
        {
          icon: 'newspaper',
          name: 'ข่าวสุขภาพ',
          route: 'Post',
        },
        {
          icon: 'shield-alt',
          name: 'ข้อมูลสิทธิ',
          route: 'EmergencyBeacon',
        },
        {
          icon: 'ambulance',
          name: 'ฉุกเฉิน 1669',
          route: 'EmergencyBeacon',
        },
        {
          icon: 'prescription',
          name: 'ร้านยา',
          route: 'PharmacyList',
        },
        // {
        //   icon: 'ellipsis-h',
        //   name: 'อื่นๆ',
        //   route: 'More',
        // },
      ],
      iconsTop: [
        {
          icon: Images.homeicon7,
          name: 'ปรึกษาแพทย์',
          route: 'TeleSymptom',
          notAuthenticated: 'SignIn',
        },
        {
          icon: Images.calendarIcon,
          name: 'สถานะรายการ',
          route: 'MyBookingsUI',
          notAuthenticated: 'SignIn',
        },
      ],
      iconsTopEnglish: [
        {
          icon: Images.homeicon7,
          name: 'Consult a doctor',
          route: 'TeleSymptom',
          notAuthenticated: 'SignIn',
        },
        {
          icon: Images.calendarIcon,
          name: 'Your schedules',
          route: 'MyBookingsUI',
          notAuthenticated: 'SignIn',
        },
      ],
      iconsEnglish: [
        {
          icon: Images.homeicon1,
          name: 'Activity',
          route: 'HealthActivity',
          notAuthenticated: 'SignIn',
        },
        {
          icon: Images.homeicon2,
          name: 'News',
          route: 'News',
          notAuthenticated: 'News',
        },
        {
          icon: Images.homeicon3,
          name: 'Records',
          route: 'PatientHIEBookingHistory',
          notAuthenticated: 'SignIn',
        },
        {
          icon: Images.homeicon4,
          name: 'Find hospitals',
          route: 'Profile',
          notAuthenticated: 'SignIn',
        },
        // { icon: Images.homeicon5, name: 'Allergy', route: 'Allergy' },
        {
          icon: Images.homeicon6,
          name: 'Pharmacy',
          route: 'TelePharmacist',
          notAuthenticated: 'SignIn',
        },
        {
          icon: Images.homeicon7,
          name: 'Consult a doctor',
          route: 'TeleSymptom',
          notAuthenticated: 'SignIn',
        },
        // {
        //   icon: Images.homeicon7,
        //   name: 'chatbot',
        //   route: 'Chatbot',
        //   notAuthenticated: 'SignIn',
        // },
      ],
      icons: [
        {
          icon: Images.homeicon1,
          name: 'สมุดบันทึก',
          route: 'HealthActivity',
          notAuthenticated: 'SignIn',
        },
        {
          icon: Images.homeicon2,
          name: 'ข่าวสาร',
          route: 'News',
          notAuthenticated: 'News',
        },
        {
          icon: Images.homeicon3,
          name: 'ประวัติสุขภาพ',
          route: 'PatientHIEBookingHistory',
          notAuthenticated: 'SignIn',
        },
        {
          icon: Images.homeicon4,
          name: 'ข้อมูลโรงพยาบาล',
          route: 'Profile',
          notAuthenticated: 'SignIn',
        },
        // { icon: Images.homeicon5, name: 'Allergy', route: 'Allergy' },
        {
          icon: Images.homeicon6,
          name: 'รายการยา',
          route: 'TelePharmacist',
          notAuthenticated: 'SignIn',
        },
        {
          icon: Images.homeicon7,
          name: 'ปรึกษาแพทย์',
          route: 'TeleSymptom',
          notAuthenticated: 'SignIn',
        },
        // {
        //   icon: Images.homeicon7,
        //   name: 'chatbot',
        //   route: 'Chatbot',
        //   notAuthenticated: 'SignIn',
        // },
      ],
      iconsLogin: [
        {
          icon: Images.homeicon1,
          name: 'Symptom check',
          route: 'HomeDental',
        },
        { icon: Images.homeicon2, name: 'State news', route: 'News' },
        {
          icon: Images.homeicon3,
          name: 'Your health profile',
          route: 'Profile',
        },
        { icon: Images.homeicon4, name: 'Hospital near you', route: 'Profile' },
        // { icon: Images.homeicon5, name: 'Allergy', route: 'Allergy' },
        { icon: Images.homeicon6, name: 'Order drugs', route: 'PharmacyList' },
        {
          icon: Images.homeicon7,
          name: 'Talk to doctors',
          route: 'TeleSymptom',
        },
      ],
      icons2: [
        {
          icon: Images.homeicon1,
          name: 'ดูประวัติการแพทย์',
          route: 'HomeDental',
        },
        {
          icon: Images.homeicon2,
          name: 'ข้อมูลสิทธิ',
          route: 'EmergencyBeacon',
        },
        { icon: Images.homeicon3, name: 'ข้อมูลส่วนบุคคล', route: 'Profile' },
        { icon: Images.homeicon4, name: 'ข้อมูลโรงพยาบาล', route: 'Profile' },
        { icon: Images.homeicon5, name: 'ข้อมูลโรคภูมิแพ้', route: 'Allergy' },
        { icon: Images.homeicon6, name: 'ข้อมูลยา', route: 'PharmacyList' },
      ],
      relate: [
        {
          id: '0',
          image: Images.trending1,
          title: 'โรคกระดูก',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending2,
          title: 'ธันตกรรม',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending3,
          title: 'โรคผิวหนัง',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending4,
          title: 'ความสวย',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending5,
          title: 'ผิวหน้า',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending6,
          title: 'ระบบสืบพันธุ์',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending7,
          title: 'สุขภาวะ',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending8,
          title: 'รักษาทางเลือก',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
      ],
      promotion: PromotionData,
      packages: ClinicPackageData,
      clinics: ClinicData,
      heightHeader: Utils.heightHeader(),
      ids: [],
    };
    this._deltaY = new Animated.Value(0);
  }

  componentWillMount() {
    // this.setState({
    //   callStatus: '',
    //   callingDoctorName: ''
    // })
  }

  componentDidMount() {
    // this.getFireBase();
    const { auths, user } = this.props;
    console.log('auths.data');
    console.log(auths.data);
    console.log('userrrrr');
    console.log(user.data);
    const auth = store.getState().auth || [];
    console.log(auth);
    this.fetchClinics();
    RNBootSplash.hide({ duration: 250 });
  }

  async getFireBase() {
    const { auths, user } = this.props;
    const auth = store.getState().auth || [];
    console.log('getFireBase');
    this.setState({ callStatus: '' });
    if (auth && !auth.isAuthenticated) {
      console.log('please log in');
    } else {
      console.log('firebase listening');
      await database()
        .ref(`/patientStatus/${user?.data?.userId || ''}`)
        .on('value', snapshot => {
          console.log('User data: ', snapshot.val());
          let valueObject = snapshot.val() ? snapshot.val() : {};
          this.setState({
            callStatus: valueObject.status,
            callingDoctorName: valueObject.doctorName,
          });
        });
      await database()
        .ref(`/pharmacyWaitingRoomStatus/${user?.data?.userId || ''}`)
        .on('value', snapshot => {
          console.log('User data: ', snapshot.val());
          let valueObject = snapshot.val() ? snapshot.val() : {};
          this.setState({
            pharmacyCallStatus: valueObject.status,
            calliingPharmacyName: valueObject.doctorName,
          });
        });
    }
  }

  async fetchClinics() {
    const filterevergonor = `https://30fde358b3.ever.healthcare/api/Clinics?filter[limit]=8`;
    fetch(filterevergonor)
      .then(response => response.json())
      .then(data =>
        this.setState(
          {
            normalClinics: data,
            isLoading: false,
          },
          () => {
            // console.log(this.state.normalClinics);
          },
        ),
      )
      .catch(error => console.log(error));
  }

  routeAuth = icon => {
    const { navigation, user, auths } = this.props;
    const auth = store.getState().auth || [];
    console.log(!auth.isAuthenticated);
    console.log('routeAuth');
    console.log(icon);

    const { verified } = this.state;
    // var listOfUsers = auths.data;

    var ok = false;

    // if (user.data !== null) {
    //   var person = listOfUsers && listOfUsers.find(element => element.userId == user.data.id);
    //   console.log('FOUND');
    //   console.log(person);
    //   console.log(person.verifyId);

    //   this.setState({ verified: person.verifyId });
    //   ok = person.verifyId;
    // }

    const warning = () => {
      this.setState({ modalOpen: true });
    };

    if (!auth.isAuthenticated) {
      navigation.navigate(icon.notAuthenticated);
    } else {
      // ok == false ? warning() : navigation.navigate(icon.route);
      navigation.navigate(icon.route);
    }
  };

  renderIconManyService() {
    const { navigation } = this.props;
    const { iconsMany } = this.state;
    return (
      <FlatList
        data={iconsMany}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemServiceMany}
              activeOpacity={0.9}
              onPress={() => {
                // navigation.navigate(item.route);
              }}
            >
              <View style={styles.iconContentMany}>
                <Icon name={item.icon} size={24} color={'#7d7d7d'} solid />
              </View>
              <Text footnote grayColor>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  render() {
    const auth = store.getState().auth || [];
    const { auths, user } = this.props;
    const { navigation } = this.props;
    const {
      promotion,
      packages,
      clinics,
      heightHeader,
      normalClinics,
      relate,
      search,
      modalOpen,
      photo,
      transferred,
      uploading,
      done,
      verified,
    } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(140);
    const marginTopBanner = heightImageBanner - heightHeader;

    console.log('this.props fs fs d');

    console.log(this.props);
    // var listOfUsers = auths.data;

    // console.log('list');
    // console.log(listOfUsers);

    // var ok;

    console.log('VERIFIED');
    console.log(verified);

    // console.log(normalClinics);
    // const { t, i18n } = useTranslation();

    // แปลภาษา
    // i18next.changeLanguage(i18next.language === 'th' ? 'en' : 'th')

    const bookingText = i18next.t(' PROVIDING MEDICAL CARE TO THOSE IN NEED');
    console.log(bookingText);
    console.log(bookingText);

    const renderIconLogin = () => {
      const { navigation } = this.props;
      return this.state.iconsEnglish.map((icon, i) => {
        return (
          <TouchableOpacity
            key={i}
            // style={{ alignItems: "center" }}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate(icon.route);
            }}
            style={styles.iconParent}
          >
            <View>
              <Image
                source={icon.icon}
                size={10}
                // color={BaseColor.primaryColor}
                // solid
                style={{ width: 50, height: 50, marginBottom: 10 }}
              />
            </View>
            <Text style={{ color: 'black' }} caption1 grayColor>
              {icon.name}
            </Text>
          </TouchableOpacity>
        );
      });
    };
    const renderIconTop = () => {
      const { navigation } = this.props;
      const auth = store.getState().auth || [];

      console.log('auth.isAuthenticated');
      console.log(auth.isAuthenticated);
      // navigation.navigate('SignIn');
      return this.state.iconsTopEnglish.map((icon, i) => {
        return (
          <TouchableOpacity
            key={i}
            // style={{ alignItems: "center" }}
            activeOpacity={0.9}
            onPress={() => this.routeAuth(icon)}
            style={styles.iconTopParent}
          >
            <View>
              <Image
                source={icon.icon}
                // color={BaseColor.primaryColor}
                // solid
                style={{ width: 60, height: 60, marginBottom: 10 }}
              />
            </View>
            <Text style={{ color: 'black' }} caption1 grayColor>
              {icon.name}
            </Text>
          </TouchableOpacity>
        );
      });
    };

    const renderIconService = () => {
      const { navigation } = this.props;
      const auth = store.getState().auth || [];

      console.log('auth.isAuthenticated');

      console.log(auth.isAuthenticated);
      // navigation.navigate('SignIn');
      return this.state.iconsEnglish.map((icon, i) => {
        return (
          <TouchableOpacity
            key={i}
            // style={{ alignItems: "center" }}
            activeOpacity={0.9}
            onPress={() => this.routeAuth(icon)}
            style={styles.iconParent}
          >
            <View>
              <Image
                source={icon.icon}
                // color={BaseColor.primaryColor}
                // solid
                style={{ width: 50, height: 50, marginBottom: 10 }}
              />
            </View>
            <Text style={{ color: 'black' }} caption1 grayColor>
              {icon.name}
            </Text>
          </TouchableOpacity>
        );
      });
    };

    let currentTime = moment();
    const getGreetingTime = currentTime => {
      if (!currentTime || !currentTime.isValid()) {
        return 'Hello';
      }

      const splitMorningMeal = 12;
      const splitAfternoonMeal = 12;
      const splitAfternoon = 12;
      const splitEvening = 17; // 24hr time to split the evening
      const currentHour = parseFloat(currentTime.format('HH'));

      if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
        // Between 12 PM and 5PM
        return 'สวัสดี';
      } else if (currentHour >= splitEvening) {
        // Between 5PM and Midnight
        return 'สวัสดีตอนเย็น';
      }
      // Between dawn and noon
      return 'อรุณสวัสดิ์';
    };
    console.log('optionPeriod');
    console.log(getGreetingTime(currentTime));

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Animated.Image
          // source={Images.topSplash}
          style={[
            styles.imageBackground,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(100),
                  Utils.scaleWithPixel(100),
                ],
                outputRange: [heightImageBanner, heightHeader, 0],
              }),
            },
          ]}
        />
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY },
                },
              },
            ])}
            onContentSizeChange={() =>
              this.setState({
                heightHeader: Utils.heightHeader(),
              })
            }
            scrollEventThrottle={8}
          >
            {!auth.isAuthenticated ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  height: 100,
                  marginTop: 10,
                }}
              >
                <View style={{ width: 120, height: 60, marginLeft: 20 }}>
                  <Image source={this.state.imageVajira} style={styles.thumb} />
                </View>
                <View style={{ width: '100%', height: 70, marginTop: 20 }}>
                  <Text style={{ fontSize: 18 }}>Ever </Text>

                  <View style={{ flex: 1, flexDirection: 'row', height: 20 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignIn')}
                    >
                      <View
                        style={{ flex: 1, flexDirection: 'row', height: 20 }}
                      >
                        <Text style={{ fontSize: 18, lineHeight: 20 }}>
                          กรุณาเข้าสู่ระบบ
                        </Text>
                        <View
                          style={{
                            lineHeight: 30,
                            alignItems: 'center',
                            marginTop: 9,
                            marginLeft: 5,
                          }}
                        >
                          <Icon name="chevron-right" size={10} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', height: 100 }}
              >
                <View style={{ width: 120, height: 60, marginLeft: 20 }}>
                  {/* <Image source={user.data && user.data.userInformation.img ? user.data.userInformation.img : this.state.imageProfile} style={styles.thumb} /> */}
                  <Image
                    source={this.state.imageProfile}
                    style={styles.thumb}
                  />
                </View>
                <View style={{ width: 200, height: 70, marginTop: 20 }}>
                  <Text style={{ fontSize: 24 }}>
                    {getGreetingTime(currentTime)}
                  </Text>
                  <Text style={{ fontSize: 24 }}>
                    {user.data && user.data.userInformation.firstname}
                  </Text>
                </View>
                <Icon
                  style={{ fontSize: 20, color: 'grey', alignSelf: 'center' }}
                  name="chevron-right"
                />
                <View></View>
              </TouchableOpacity>
            )}

            {/* <View style={[styles.searchForm, { marginTop: 60 }]}>
              </View> */}
            {!auth.isAuthenticated ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
              ></TouchableOpacity>
            ) : (
              <View />
            )}
            <View
              style={{
                alignContent: 'center',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
              }}
            ></View>
            <CallStatus
              navigation={navigation}
              user={this.props.user}
              userTele={}
              auth={store.getState().auth}
            />
            <View
              style={{
                alignContent: 'center',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {renderIconTop()}
            </View>
            <View style={styles.contentServiceIcon}>{renderIconService()}</View>

            {/* <View
                            style={{
                                borderBottomColor: '#f7f7f7',
                                borderBottomWidth: 7,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 14,
                            }}
                            /> */}
            <View style={{ backgroundColor: 'white' }}></View>

            {!auth.isAuthenticated ? (
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <FastImage
                    source={Images.banner}
                    style={{ width: SCREEN_WIDTH, height: 150 }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity onPress={() => console.log('SignIn')}>
                  <FastImage
                    source={{
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/vajiraahome.png?alt=media&token=6ed4c67e-b979-4361-b7e5-a021ae6400e4',
                    }}
                    style={{ width: SCREEN_WIDTH, height: 150 }}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                marginVertical: 30,
                alignContent: 'center',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                // style={{ alignItems: "center" }}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('EmergencyBeacon');
                }}
                style={styles.iconTopParentAmbulance}
              >
                <View>
                  <Image
                    source={AmbulanceIcon}
                    // color={BaseColor.primaryColor}
                    // solid
                    style={{ width: 60, height: 60, marginBottom: 10 }}
                  />
                </View>
                <Text
                  style={{ color: 'black', fontSize: 18 }}
                  caption1
                  grayColor
                >
                  เรียกรถฉุกเฉิน
                </Text>
              </TouchableOpacity>
              <View style={styles.contentServiceIconMany}>
                {this.renderIconManyService()}
              </View>
            </View>

            <View style={{ padding: 20 }}>
              <VajiraCard
                imgSrc={Images.freeChat}
                titleTextSmall={'Lets be Hero x Ever'}
                smallTextColor="#284F30"
                titleText={'Ever @ Home'}
                bodyText={'แอปพลิเคชันเพื่อประชาชน'}
                searchUrl="Bangkok"
                buttonText="ดูข้อมูลเพิ่มเติม"
                color="#484848"
                bodyColor="#5a5a5a"
                textColor="#284F30"
                position="52%"
              />
            </View>

            {/* <View>
                            <Text
                                title3
                                bold
                                style={{ marginLeft: 20, marginVertical: 10 }}
                            >
                                Highlights on Ever Healthcare
                            </Text>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={promotion}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Card
                                        style={[
                                            styles.promotionItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("ClinicDetail")
                                        }
                                    >
                                        <Text subhead whiteColor>
                                            {item.title1}
                                        </Text>
                                        <Text title2 whiteColor semibold>
                                            {item.title2}
                                        </Text>
                                        <View
                                            style={styles.contentCartPromotion}
                                        >
                                            <Button
                                                style={styles.btnPromotion}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "PreviewBooking"
                                                    );
                                                }}
                                            >
                                                <Text body2 semibold whiteColor>
                                                    Book Now
                                                </Text>
                                            </Button>
                                        </View>
                                    </Card>
                                )}
                            />
                        </View> */}
            {/* Hiking */}
            <View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={packages}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <Card
                    style={[
                      styles.clinicPackageItem,
                      index == 0
                        ? { marginHorizontal: 20 }
                        : { marginRight: 20 },
                    ]}
                    image={item.image}
                    onPress={() => navigation.navigate('PackageDetail')}
                  >
                    <Text headline whiteColor semibold>
                      {item.name}
                    </Text>
                  </Card>
                )}
              />
            </View>
            {/* Promotion */}
            {/* <CarouselComponent/> */}

            {/* <View
                            style={{
                                padding: 20
                            }}
                        >
                            <Button
                                style={styles.btnPromotion}
                                onPress={() => {
                                    navigation.navigate("MyBookings");
                                }}
                            >
                                <Text body2 semibold whiteColor>
                                    My Bookings
                                </Text>
                            </Button>
                            {this.state.ids.map(id => <Text>{id}</Text>)}
                        </View> */}
            <View
              style={{
                padding: 20,
                justifyContent: 'space-around',
              }}
            >
              {/* <View style={styles.line} /> */}
              {/* <FlatList
                columnWrapperStyle={{ marginBottom: 20 }}
                numColumns={2}
                data={normalClinics}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <ClinicItem
                    grid
                    image={item.featureImageM}
                    name={item.name}
                    // location={item.address}
                    city={item.city}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={
                      item.ClinicReviews ? clinic.ClinicReviews.length : ''
                    }
                    // services={item.services}
                    style={index % 2 ? { marginLeft: 15 } : {}}
                    onPress={() =>
                      navigation.navigate('ClinicProfile', { id: item.id })
                    }
                  />
                )}
              /> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auths: state.auth,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

{
  /* <View>
 <View style={styles.contentHiking}>
	  <Text title3 semibold>
			Ever Top Procedures
	  </Text>
	  <Text body2 grayColor>
	  Browse popular procedures with better quality and cheaper price
	  </Text>
 </View>
 <FlatList
	  horizontal={true}
	  showsHorizontalScrollIndicator={false}
	  data={packages}
	  keyExtractor={(item, index) => item.id}
	  renderItem={({ item, index }) => (
			<Card
				 style={[
					  styles.clinicPackageItem,
					  index == 0
							? { marginHorizontal: 20 }
							: { marginRight: 20 }
				 ]}
				 image={item.image}
				 onPress={() =>
					  navigation.navigate("PackageDetail")
				 }
			>
				 <Text headline whiteColor semibold>
					  {item.name}
				 </Text>
			</Card>
	  )}
 />
	 <View
 style={{
	  padding: 20
 }}
 >
 <Text title3 semibold>
	  Featured
 </Text>
 <Text body2 grayColor>
	  What’s the Worst That Could Happen
 </Text>
 <Image
	  source={Images.banner1}
	  style={styles.promotionBanner}
 />
 <View style={styles.line} />
 <FlatList
	  columnWrapperStyle={{ marginBottom: 20 }}
	  numColumns={2}
	  data={clinics}
	  keyExtractor={(item, index) => item.id}
	  renderItem={({ item, index }) => (
			<ClinicItem
				 grid
				 image={item.image}
				 name={item.name}
				 location={item.location}
				 price={item.price}
				 available={item.available}
				 rate={item.rate}
				 rateStatus={item.rateStatus}
				 numReviews={item.numReviews}
				 services={item.services}
				 style={
					  index % 2 ? { marginLeft: 15 } : {}
				 }
				 onPress={() =>
					  navigation.navigate("ClinicDetail")
				 }
			/>
	  )}
 />
 </View>
 <FlatList
	  horizontal={true}
	  showsHorizontalScrollIndicator={false}
	  data={packages}
	  keyExtractor={(item, index) => item.id}
	  renderItem={({ item, index }) => (
			<Card
				 style={[
					  styles.clinicPackageItem,
					  index == 0
							? { marginHorizontal: 20 }
							: { marginRight: 20 }
				 ]}
				 image={item.image}
				 onPress={() =>
					  navigation.navigate("PackageDetail")
				 }
			>
				 <Text headline whiteColor semibold>
					  {item.name}
				 </Text>
			</Card>
	  )}
 />
 </View> */
}
