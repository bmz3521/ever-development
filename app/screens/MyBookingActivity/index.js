import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Button, useTheme, Avatar } from 'react-native-elements';
import _ from 'lodash';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import {
  SafeAreaView,
  ImageViewerModal,
  Header,
  PaymentSummaryCard,
} from '@components';
import { Images } from '@config';
import Loading from '@components/Loading';
import StepProgress from '@components/StepProgress';
import { useHooks } from './hooks';
import DoctorLottie from 'app/assets/lottie-animation/Doctor.json';
import PharmacyLottie from 'app/assets/lottie-animation/Pharmacy.json';
import styles from './styles';
import 'moment/locale/th';
import i18next from 'i18next';
import { patchStatus } from '@services/bookingService';
moment.locale('th');

function MyBookingActivity(props) {
  const telemedicine = useSelector(state => state.telemedicine);
  const { navigation, route } = props;
  const { bookingId, price = null } = route.params;
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const {
    refreshing,
    isLoading,
    booking,
    practitioner,
    logisticStatusText,
    clinic,
    drugPriceTotal,
    fromTo,
    onRefresh,
    getBookingTypeWording,
    getBookingStatusWording,
    navigateToVideoCallScreen,
  } = useHooks({
    bookingId,
    telemedicine,
    navigation,
    price,
    dispatch,
  });
  console.log('MyBookingAct:>> ', booking);
  const CallDoctorButton = () => (
    <Button
      type="solid"
      title={i18next.t('MYBOOKINGACT_CALL_DOC')}
      buttonStyle={{
        backgroundColor: theme.colors.primary,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
      }}
      titleStyle={{
        fontSize: theme.fontSizeDefault,
        fontFamily: theme.fontFamilyBold,
        color: theme.colors.white,
      }}
      onPress={() =>
        navigateToVideoCallScreen({
          bookingId: booking?.id,
        })
      }
      // disabled={
      //   booking?.bookingCategory === 'telemed'
      //     ? [`DOCTOR_PENDING`].includes(booking?.status) ||
      //       moment().isBefore(
      //         moment(booking?.admitTime).subtract(15, 'minutes'),
      //       )
      //     : false
      // }
    />
  );

  const CallPharmacyButton = () => (
    <Button
      type="solid"
      title={i18next.t('MYBOOKINGACT_CALL_PHARMA')}
      buttonStyle={{
        backgroundColor: theme.colors.primary,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
      }}
      titleStyle={{
        fontSize: theme.fontSizeDefault,
        fontFamily: theme.fontFamilyBold,
        color: theme.colors.white,
      }}
      onPress={() =>
        navigateToVideoCallScreen({
          bookingId: booking?.id,
        })
      }
      disabled={
        telemedicine?.booking && telemedicine?.booking?.id !== bookingId
      }
    />
  );
  const SelectAddressButton = () => (
    <Button
      type="solid"
      title={i18next.t('MYBOOKINGACT_SELECT_ADDRESS')}
      buttonStyle={{
        backgroundColor: theme.colors.primary,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
      }}
      titleStyle={{
        fontSize: theme.fontSizeDefault,
        fontFamily: theme.fontFamilyBold,
        color: theme.colors.white,
      }}
      onPress={() =>
        navigation.navigate('MainStack', {
          screen: 'SavePlace',
          params: {
            bookingData: booking,
            bookingCategory: booking?.bookingCategory,
            googleLocation: booking?.locationAddress,
          },
        })
      }
    />
  );
  const ChatButton = () => (
    <Button
      type="solid"
      title={i18next.t('MYBOOKINGACT_CHAT')}
      buttonStyle={{
        backgroundColor: theme.colors.primary,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
      }}
      titleStyle={{
        fontSize: theme.fontSizeDefault,
        fontFamily: theme.fontFamilyBold,
        color: theme.colors.white,
      }}
      onPress={() =>
        navigation.navigate('Chat', {
          booking: booking,
          clinicName: clinic?.name,
        })
      }
    />
  );

  const CallCommunityPharmacistButton = () => (
    <Button
      type="solid"
      title={i18next.t('MYBOOKINGACT_CALL_COMMUNITY_PHARMA')}
      buttonStyle={{
        backgroundColor: theme.colors.secondary,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
      }}
      titleStyle={{
        fontSize: theme.fontSizeDefault,
        fontFamily: theme.fontFamilyBold,
        color: theme.colors.white,
      }}
      onPress={async () => {
        await patchStatus(bookingId);
        return navigateToVideoCallScreen({
          bookingId: booking?.id,
        });
      }}
    />
  );

  const ActionButton = () => {
    switch (booking?.bookingCategory) {
      case 'telemed':
        if (booking?.status.includes('DOCTOR')) {
          return <CallDoctorButton />;
        } else if (booking?.status.includes('PHARMACY')) {
          if (
            booking?.locationAddress === undefined ||
            !booking?.locationAddress
          ) {
            return <></>;
          } else {
            return <CallPharmacyButton />;
          }
        }
        break;

      case 'general':
        if (booking?.status.includes('DOCTOR')) {
          return <CallDoctorButton />;
        } else if (
          booking?.status.includes('COMMUNITY_PHARMACIST') ||
          booking?.status.includes('PHARMACY')
        ) {
          if (
            booking?.locationAddress === undefined ||
            !booking?.locationAddress
          ) {
            return <SelectAddressButton />;
          } else {
            return (
              <View>
                <CallCommunityPharmacistButton />
              </View>
            );
          }
        }
        break;

      case 'covid':
        return <CallDoctorButton />;

      case 'procedure':
      case 'clinicPackage':
        return <ChatButton />;

      default:
        return <></>;
    }
    return <></>;
  };

  return (
    <SafeAreaView
      style={styles(theme).safeAreaView}
      forceInset={{ top: 'always' }}
    >
      <Header
        text={i18next.t('MYBOOKINGACT_DETAIL')}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles(theme).wrapper}>
        <Loading isVisible={isLoading} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* BOOKING DETAIL SECTION */}
          <View style={styles(theme).bookingTypeWrapper}>
            <View style={{ flexShrink: 0, justifyContent: 'center', flex: 2 }}>
              <Text
                style={{
                  fontSize: theme.fontSizeLargest,
                  fontFamily: theme.fontFamilyBold,
                  color: theme.colors.grey1,
                }}
              >
                {booking?.bookingCategory === 'telemed'
                  ? `${
                      booking?.status.includes(`DOCTOR`)
                        ? i18next.t('MYBOOKINGACT_SCHEDULE_DOC')
                        : i18next.t('MYBOOKINGACT_SCHEDULE_PHAR')
                    }`
                  : booking?.bookingCategory === 'covid'
                  ? i18next.t('MYBOOKINGACT_CONSULT_DOC19')
                  : booking?.bookingCategory === 'procedure'
                  ? i18next.t('MYBOOKINGACT_CLINIC_PROCEDURE')
                  : booking?.bookingCategory === 'clinicPackage'
                  ? i18next.t('MYBOOKINGACT_CLINIC_PACKAGE')
                  : `${
                      booking?.status?.includes(`DOCTOR`)
                        ? i18next.t('MYBOOKINGACT_CONSULT_DOC')
                        : booking?.status?.includes(`COMMUNITY_PHARMACIST`)
                        ? i18next.t('MYBOOKINGACT_CONSULT_COMMUNITY_PHARMACIST')
                        : i18next.t('MYBOOKINGACT_CONSULT_PHAR')
                    }`}
              </Text>

              <Text
                style={{
                  fontSize: theme.fontSizeLarge,
                  fontFamily: theme.fontFamilyDefault,
                  color: theme.colors.grey3,
                }}
              >
                {getBookingStatusWording(booking?.status)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LottieView
                style={styles(theme).bookingTypeLottie}
                source={
                  booking?.status?.includes(`DOCTOR`)
                    ? DoctorLottie
                    : PharmacyLottie
                }
                autoPlay
                loop
              />
            </View>
          </View>

          {/* TIMELINE */}
          <StepProgress status={booking?.status} />

          {/* BOOKING DESCRIPTION */}
          <View style={styles(theme).bookingDetailWrapper}>
            <View style={styles(theme).bookingDetailItemContainer}>
              <Text
                style={{
                  fontFamily: theme.fontFamilyDefault,
                  fontSize: theme.fontSizeLargest,
                }}
              >
                {`${i18next.t('MYBOOKINGACT_TYPE')} : `}
              </Text>
              <Text
                style={{
                  fontFamily: theme.fontFamilyDefault,
                  fontSize: theme.fontSizeLarge,
                  color: theme.colors.grey3,
                }}
                numberOfLines={2}
              >
                {getBookingTypeWording()}
              </Text>
            </View>

            {/* ADDRESS */}
            {booking?.locationAddress &&
              booking?.locationAddress !== undefined && (
                <React.Fragment>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: theme.fontFamilyDefault,
                        fontSize: theme.fontSizeSmaller,
                      }}
                    >
                      {`${i18next.t('MYBOOKINGACT_SHIPPING_ADDRESS')} : `}
                    </Text>

                    <Text
                      style={{
                        fontFamily: theme.fontFamilyDefault,
                        fontSize: theme.fontSizeSmaller,
                        color: theme.colors.grey3,
                        flexShrink: 1,
                      }}
                      numberOfLines={4}
                    >
                      {`${booking?.locationAddress?.address} (${booking?.locationAddress?.note})`}{' '}
                      {[
                        `PHARMACY_PENDING`,
                        `COMMUNITY_PHARMACIST_PENDING`,
                      ].includes(booking?.status) && (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('MainStack', {
                              screen: 'SavePlace',
                              params: {
                                bookingData: booking,
                                bookingCategory: bookingCategory,
                                googleLocation: booking?.locationAddress,
                              },
                            })
                          }
                        >
                          <Text
                            style={{
                              fontFamily: theme.fontFamilyDefault,
                              fontSize: theme.fontSizeSmall,
                              color: theme.colors.primary,
                              flexShrink: 1,
                              textDecorationLine: 'underline',
                            }}
                          >
                            {`Edit`}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </Text>
                  </View>
                </React.Fragment>
              )}
            {![`PHARMACY_PENDING`, `COMMUNITY_PHARMACIST_PENDING`].includes(
              booking?.status,
            ) && (
              <React.Fragment>
                <View style={styles(theme).bookingDetailItemContainer}>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: theme.fontSizeSmaller,
                    }}
                  >
                    {booking?.bookingCategory === `telemed`
                      ? `${i18next.t('MYBOOKINGACT_APPOINTMENT_DATE')} : `
                      : `${i18next.t('MYBOOKINGACT_APPOINTMENT_DATE2')} : `}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: theme.fontSizeSmaller,
                      color: theme.colors.grey3,
                    }}
                    numberOfLines={2}
                  >
                    {moment(booking?.admitTime)
                      .locale(i18next.language)
                      .format('dddd, Do MMMM YYYY')}
                  </Text>
                </View>
                <View style={styles(theme).bookingDetailItemContainer}>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: theme.fontSizeSmaller,
                    }}
                  >
                    {booking?.bookingCategory === `telemed`
                      ? `${i18next.t('MYBOOKINGACT_APPOINTMENT_TIME')} : `
                      : `${i18next.t('MYBOOKINGACT_APPOINTMENT_TIME2')} : `}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: theme.fontSizeSmaller,
                      color: theme.colors.grey3,
                    }}
                    numberOfLines={2}
                  >
                    {`${moment(booking?.admitTime)
                      .locale(i18next.language)
                      .format('HH:mm')} ${
                      i18next.language == 'en' ? '' : 'น.'
                    }`}
                  </Text>
                </View>
              </React.Fragment>
            )}

            {/* LOGISTIC */}
            {booking?.logisticStatus && (
              <View style={styles(theme).bookingDetailItemContainer}>
                <Text
                  style={{
                    fontFamily: theme.fontFamilyDefault,
                    fontSize: theme.fontSizeSmaller,
                  }}
                >
                  {`สถานะจัดส่ง : `}
                </Text>

                <Text
                  style={{
                    fontFamily: theme.fontFamilyDefault,
                    fontSize: theme.fontSizeSmaller,
                    color: theme.colors.grey3,
                  }}
                  numberOfLines={2}
                >
                  {logisticStatusText[booking?.logisticStatus]}
                </Text>
              </View>
            )}
          </View>

          {/* PRACTITIONER DETAIL SECTION */}
          <View style={styles(theme).practitionerDetailWrapper}>
            {!_.isEmpty(practitioner) ? (
              <View style={styles(theme).practitionerDetailContainer}>
                <Avatar
                  source={
                    practitioner.photos.length > 0
                      ? {
                          uri: `${practitioner.photos[0]?.imageUrl}`,
                        }
                      : Images.DoctorPlaceholder
                  }
                  containerStyle={styles(theme).practitionerAvatar}
                  size="medium"
                  rounded
                />
                <View style={styles(theme).practitionerDescriptionContainer}>
                  <Text
                    style={{
                      fontSize: theme.fontSizeDefault,
                      fontFamily: theme.fontFamilyDefault,
                    }}
                  >
                    {`${practitioner?.title ? practitioner?.title : ''}${
                      practitioner?.firstName
                    } ${practitioner?.lastName}`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: theme.fontSizeSmaller,
                      color: theme.colors.grey3,
                    }}
                    numberOfLines={2}
                  >
                    {practitioner?.bio}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles(theme).practitionerDetailContainer}>
                <Avatar
                  source={Images.DoctorPlaceholder}
                  containerStyle={styles(theme).practitionerAvatar}
                  size="medium"
                  rounded
                />
                <View style={styles(theme).practitionerDescriptionContainer}>
                  <Text
                    style={{
                      fontSize: theme.fontSizeDefault,
                      fontFamily: theme.fontFamilyDefault,
                    }}
                  >
                    {getBookingTypeWording()}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: theme.fontSizeSmaller,
                      color: theme.colors.grey3,
                    }}
                    numberOfLines={2}
                  >
                    {booking?.bookingCategory == 'procedure' ||
                    booking?.bookingCategory == 'clinicPackage'
                      ? i18next.t('MYBOOKINGACT_PRESSTOCHAT')
                      : i18next.t('MYBOOKINGACT_PRESSTOCALL')}
                  </Text>
                </View>
              </View>
            )}
            {!booking?.status.includes('COMPLETED') && (
              <View style={{ padding: 10 }}>
                <ActionButton />
              </View>
            )}
          </View>

          {/* USER SYMPTOM DETAIL */}
          {booking?.symptom && booking?.symptom?.note !== '' && (
            <View style={styles(theme).userSymptomWrapper}>
              <Text
                style={{
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyBold,
                  color: theme.colors.grey1,
                  padding: 10,
                }}
              >
                {i18next.t('MYBOOKINGACT_SYMPTOM')}
              </Text>
              {booking?.symptom?.note !== '' && (
                <View style={styles(theme).userSymptomDescriptionContainer}>
                  <Text
                    style={{
                      fontSize: theme.fontSizeSmaller,
                      fontFamily: theme.fontFamilyDefault,
                      color: theme.colors.grey1,
                    }}
                  >
                    {booking?.symptom?.note}
                  </Text>
                </View>
              )}
              {booking?.symptom?.imageUrl !== '' && (
                <View style={styles(theme).userSymptomImageWrapper}>
                  <ImageViewerModal images={booking?.symptom?.imageUrl}>
                    <View style={styles(theme).userSymptomImageContainer}>
                      <Image
                        source={{ uri: booking?.symptom?.imageUrl }}
                        style={styles(theme).userSymptomImage}
                      />
                    </View>
                  </ImageViewerModal>
                </View>
              )}
            </View>
          )}

          {/* DIAGNISIS NOTE */}
          {!!booking?.notes && booking?.notes !== '' && (
            <View style={styles(theme).userSymptomWrapper}>
              <Text
                style={{
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyBold,
                  color: theme.colors.grey1,
                  padding: 10,
                }}
              >
                {i18next.t('MYBOOKINGACT_DIAGNOSIS_NOTE')}
              </Text>
              {booking?.symptom?.note !== '' && (
                <View style={styles(theme).userSymptomDescriptionContainer}>
                  <Text
                    style={{
                      fontSize: theme.fontSizeSmaller,
                      fontFamily: theme.fontFamilyDefault,
                      color: theme.colors.grey1,
                    }}
                  >
                    {booking?.notes}
                  </Text>
                </View>
              )}
            </View>
          )}

          {booking && booking?.bookingCategory && (
            <PaymentSummaryCard
              bookingCategory={fromTo[booking.bookingCategory]}
              consultationPrice={
                booking?.bookingCategory === 'general' &&
                booking?.bookingType === 'Telepharmacy'
                  ? 50
                  : booking?.bookingCategory === 'general'
                  ? 300
                  : 0
              }
              shippingPrice={50}
              bookingData={booking}
            />
          )}
          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default MyBookingActivity;
