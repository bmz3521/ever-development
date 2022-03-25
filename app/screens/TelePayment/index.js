import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import _ from 'lodash';
import { SafeAreaView, Header } from '@components';
import NetInfo from '@react-native-community/netinfo';
import { BaseStyle, Images } from '@config';
import DoctorCard from './components/DoctorCard';
import moment from 'moment';
import { Text, Avatar, Button, useTheme } from 'react-native-elements';
import { createBooking as CreateBookingService } from '@services/bookingService';
import styles from './style';
import 'moment/locale/th';
import { useHooks } from './hooks';
moment.locale('th');

const TelePayment = ({ navigation, route }) => {
  const { user, auth } = useHooks({ navigation });
  const [loading, setLoading] = useState(true);
  const {
    bookingCategory,
    bookingData = null,
    practitioner = null,
    note = null,
    imageUrl,
  } = route.params;
  const { theme } = useTheme();

  const fromTo = {
    general: 'ปรึกษาแพทย์แบบสุ่ม',
    telemed: 'นัดหมายปรึกษาแพทย์ออนไลน์',
    Covid: 'ปรึกษาแพทย์ Covid-19',
  };

  const createBooking = async bookingData => {
    let newTreatmentData = {
      appUserId: user.data.userId,
      treatmentableType: 'organization',
      treatmentableId: 2,
    };
    const newBookingData = bookingData;
    const newBooking = await CreateBookingService(
      newTreatmentData,
      newBookingData,
    );
    return newBooking;
  };

  useEffect(() => {
    checkNetwork();
    setLoading(false);
  }, []);

  const checkNetwork = () => {
    NetInfo.fetch().then(state => {
      console.log(state);
      console.log('Is isInternetReachable?', state.isInternetReachable);

      const notConnected = () => {
        Alert.alert(
          'ไม่สามารถเชื่อมต่อได้',
          'โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
          [
            {
              text: 'ตกลง',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      };

      if (state?.isInternetReachable === false) {
        notConnected();
      }
    });
  };

  const submit = async () => {
    setLoading(true);
    let newData;
    let stackName;
    let stackScreen;
    switch (bookingCategory) {
      case `telemed`:
        newData = { ...bookingData, symptom: { note, imageUrl } };
        stackName = `BookingStack`;
        stackScreen = `MyBookingActivity`;
        break;
      case `general`:
        newData = {
          admitTime: moment().toISOString(),
          bookingCategory: `general`,
          patientId: user.data.userId,
          status: `DOCTOR_PENDING`,
        };
        stackName = `none`;
        stackScreen = `VideoCall`;
        break;
      case `covid`:
        //
        break;
      default:
        break;
    }

    const newBooking = await createBooking(newData);

    setLoading(false);
    if (stackName === 'none') {
      navigation.navigate(stackScreen, { bookingId: newBooking.id });
    } else {
      navigation.popToTop();
      navigation.navigate(stackName, {
        screen: stackScreen,
        params: { bookingId: newBooking.id },
      });
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.primary}
        barStyle="dark-content"
      />
      <Header
        text="รายละเอียดการนัดหมาย"
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView
        scrollEventThrottle={8}
        style={{ backgroundColor: theme.colors.white }}
      >
        {/* 1st Section */}
        <View
          style={[
            styles.sectionContainer,
            {
              shadowColor: theme.colors.shadows,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.3,
              elevation: 6,
            },
          ]}
        >
          <View
            style={[
              styles.sectionContentContainer,
              {
                shadowColor: theme.colors.shadows,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                elevation: 6,
              },
            ]}
          >
            <View>
              <Avatar
                source={Images.DoctorIcon}
                containerStyle={{
                  backgroundColor: theme.colors.grey4,
                }}
                size="medium"
                rounded
              />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: theme.fontSizeSmall,
                    fontFamily: theme.fontFamilyBold,
                  },
                ]}
              >
                {fromTo[bookingCategory]}
              </Text>
              <Text
                style={{
                  fontSize: theme.fontSizeSmallest,
                  fontFamily: theme.fontFamilyDefault,
                }}
              >
                Consult with a pharmacist and get drugs
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionContainer,
            {
              padding: 10,
              shadowColor: theme.colors.shadows,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.3,
              elevation: 6,
            },
          ]}
        >
          {/* title */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyBold,
                },
              ]}
            >
              รายละเอียด
            </Text>
          </View>

          {/* total pay */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyDefault,
                },
              ]}
            >
              ค่าใช้จ่ายทั้งหมด
            </Text>
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyDefault,
                  color: theme.colors.primary,
                },
              ]}
            >
              {i18next.t('TELEPAYMENT_FREE')}
            </Text>
          </View>

          {/* Pay List  */}
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginBottom: 15,
              alignItems: 'center',
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flex: 0.15,
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: theme.fontSizeSmall,
                    fontFamily: theme.fontFamilyBold,
                  },
                ]}
              >
                X1
              </Text>
            </View>
            <View
              style={{
                flex: 0.8,
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: theme.fontSizeSmall,
                    fontFamily: theme.fontFamilyBold,
                  },
                ]}
              >
                {`การ${fromTo[bookingCategory]}`}
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                alignItems: 'flex-end',
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: theme.fontSizeSmall,
                    fontFamily: theme.fontFamilyDefault,
                    color: theme.colors.primary,
                  },
                ]}
              >
                {i18next.t('TELEPAYMENT_FREE')}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionContainer,
            {
              padding: 10,
              shadowColor: theme.colors.shadows,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.3,
              elevation: 6,
            },
          ]}
        >
          {/* title */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyBold,
                },
              ]}
            >
              รายละเอียดการชำระเงิน
            </Text>
          </View>

          <View
            style={{
              margin: 5,
              height: 150,
              borderColor: '#eeeeee',
              borderWidth: 1,
              borderRadius: 8,
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-around',
              padding: 10,
            }}
          >
            <View>
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: theme.fontSizeSmall,
                    fontFamily: theme.fontFamilyBold,
                  },
                ]}
              >
                Cash
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: theme.fontSizeSmall,
                    fontFamily: theme.fontFamilyBold,
                  },
                ]}
              >
                Insurance
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: theme.fontSizeSmall,
                    fontFamily: theme.fontFamilyBold,
                  },
                ]}
              >
                Personal
              </Text>
            </View>
          </View>
        </View>

        {/* <View style={{ backgroundColor: theme.colors.grey5 }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 10,
              fontSize: 14,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSizeDefault,
                fontFamily: theme.fontFamilyBold,
                color: theme.colors.grey2,
              }}
            >
              {`ผู้เข้ารับการรักษา`}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.white,
              marginHorizontal: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <View style={{ margin: 5 }}>
                <Avatar
                  source={{
                    uri: user.data?.img ? user.data?.img : Images.avatar2,
                  }}
                  containerStyle={{
                    backgroundColor: theme.colors.grey4,
                  }}
                  size="medium"
                  rounded
                />
              </View>
              <View style={{ padding: 5 }}>
                <View>
                  <Text
                    style={{
                      fontSize: theme.fontSizeDefault,
                      fontFamily: theme.fontFamilyDefault,
                      color: theme.colors.secondary,
                    }}
                  >{`${user.data?.firstname} ${user.data?.lastname}`}</Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: theme.fontSizeSmaller,
                      color: theme.colors.grey3,
                    }}
                  >
                    ข้อมูลของคุณจะถูกบันทึกและใช้ในการรักษา
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 10,
              paddingTop: 20,
              fontSize: 14,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSizeDefault,
                fontFamily: theme.fontFamilyBold,
                color: theme.colors.grey2,
              }}
            >
              {`ข้อมูลการรับบริการ`}
            </Text>
          </View>
          <DoctorCard practitioner={practitioner} bookingCategory={bookingCategory}>
            {bookingCategory === `telemed` ? (
              <View
                style={{
                  justifyContent: 'center',
                  paddingBottom: 10,
                  marginHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: theme.colors.grey5,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      width: 32,
                      height: 32,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.colors.primary,
                      margin: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.fontSizeDefault,
                        fontFamily: theme.fontFamilyBold,
                        color: theme.colors.white,
                      }}
                    >
                      1
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamilyDefault,
                        fontSize: theme.fontSizeSmall,
                        color: theme.colors.grey1,
                      }}
                    >
                      {`การปรึกษากับแพทย์ผ่าน Video Call`}
                    </Text>
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontFamily: theme.fontFamilyDefault,
                            fontSize: theme.fontSizeSmaller,
                            color: theme.colors.primary,
                          }}
                        >
                          {`วันที่นัดหมาย : `}
                        </Text>
                        <Text
                          style={{
                            fontFamily: theme.fontFamilyDefault,
                            fontSize: theme.fontSizeSmaller,
                            color: theme.colors.grey3,
                          }}
                          numberOfLines={2}
                        >
                          {moment(bookingData.admitTime).format(
                            'dddd, Do MMMM YYYY',
                          )}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontFamily: theme.fontFamilyDefault,
                            fontSize: theme.fontSizeSmaller,
                            color: theme.colors.primary,
                          }}
                        >
                          {`เวลานัดหมาย : `}
                        </Text>
                        <Text
                          style={{
                            fontFamily: theme.fontFamilyDefault,
                            fontSize: theme.fontSizeSmaller,
                            color: theme.colors.grey3,
                          }}
                          numberOfLines={2}
                        >
                          {`${moment(bookingData.admitTime).format(
                            'HH:mm',
                          )} น.`}
                        </Text>
                      </View>
                      {note && (
                        <View style={{ paddingTop: 5 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontFamily: theme.fontFamilyDefault,
                                fontSize: theme.fontSizeSmaller,
                                color: theme.colors.primary,
                              }}
                            >
                              {`บันทึก`}
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: theme.colors.white,
                              borderRadius: 5,
                              padding: 5,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: theme.fontFamilyDefault,
                                fontSize: theme.fontSizeSmallest,
                                color: theme.colors.grey3,
                              }}
                            >
                              {note}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ) : bookingCategory === `general` ? (
              <View style={{ justifyContent: 'center', paddingBottom: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: theme.colors.grey5,
                    borderRadius: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      width: 32,
                      height: 32,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.colors.primary,
                      margin: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.fontSizeDefault,
                        fontFamily: theme.fontFamilyBold,
                        color: theme.colors.white,
                      }}
                    >
                      1
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamilyDefault,
                        fontSize: theme.fontSizeSmall,
                        color: theme.colors.grey1,
                      }}
                    >
                      {`การปรึกษากับแพทย์ผ่าน Video Call`}
                    </Text>
                    <Text
                      style={{
                        fontFamily: theme.fontFamilyDefault,
                        fontSize: theme.fontSizeSmaller,
                        color: theme.colors.grey3,
                      }}
                    >
                      {`ให้บริการทันที (รอ 10-15 mins)`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: theme.colors.grey5,
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      width: 32,
                      height: 32,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.colors.primary,
                      margin: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.fontSizeSmall,
                        fontFamily: theme.fontFamilyBold,
                        color: theme.colors.white,
                      }}
                    >
                      2
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Text
                      style={{
                        fontFamily: theme.fontFamilyDefault,
                        fontSize: theme.fontSizeSmall,
                        color: theme.colors.grey1,
                      }}
                    >
                      {`รับรายการยาจากเภสัชกร`}
                    </Text>
                    <Text
                      style={{
                        fontFamily: theme.fontFamilyDefault,
                        fontSize: theme.fontSizeSmaller,
                        color: theme.colors.grey3,
                      }}
                    >
                      {`เภสัชกรจะแนะนำรายการยาและวิธีการใช้`}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <View style={{ paddingHorizontal: 10 }}></View>
          </DoctorCard> */}

        {/* <View style={styles.serviceContainer}>
            {roundRobinPharmacy && (
              <Card>
                <View style={styles.makeRow}>
                  <Icon name="pills" style={styles.timeIcon} />
                  <Text style={styles.timeText}>ช่องทางการรับยา</Text>
                </View>

                {newAddress || address ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Logistic', {
                        prescription,
                        logisticSelected: address,
                        bookingId,
                        // logisticId: item.id,
                      });
                    }}
                  >
                    <View
                      style={{
                        height: 100,
                        width: '100%',
                        backgroundColor: '#EDEDED',
                        padding: 30,
                        borderRadius: 15,
                      }}
                    >
                      <Text>{newAddress || address}</Text>
                      <Text style={{ color: '#00bae5', alignSelf: 'flex-end' }}>
                        เปลี่ยนที่อยู่
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </Card>
            )}

            <View style={{ padding: 15 }}>
              <View>
                {logistic == 2 ? (
                  <View style={{ marginBottom: 10 }}>
                    <Text>ใส่สถานที่ที่ต้องการรับพัสดุ</Text>
                    <TextInput
                      style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                      }}
                      onChangeText={text => setAddress(text)}
                      value={address}
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          </View> */}
        {/* </View> */}
      </ScrollView>
      <View
        style={{
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 10,
              padding: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.fontSizeDefault,
                  fontFamily: theme.fontFamilyBold,
                  color: theme.colors.primary,
                }}
              >
                รวม
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyItalic,
                  color: theme.colors.grey1,
                }}
              >
                การใช้งานไม่มีค่าใช้จ่าย
              </Text>
            </View>
          </View> */}
          <Button
            title={
              bookingCategory === `telemed`
                ? `ยืนยันการนัดหมาย`
                : `โทรคุยกับแพทย์`
            }
            onPress={submit}
            titleStyle={{
              fontSize: theme.fontSizeDefault,
              fontFamily: theme.fontFamilyBold,
              color: theme.colors.white,
            }}
          />
          <Button
            title={`รายการสั่งซื้อ (MOCK ONLY)`}
            onPress={() => navigation.navigate('PaymentOrder')}
            titleStyle={{
              fontSize: theme.fontSizeDefault,
              fontFamily: theme.fontFamilyBold,
              color: theme.colors.white,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TelePayment;
