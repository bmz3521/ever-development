import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  Header,
  UserAuthentication,
  Image,
  ImageViewerModal,
  Loading,
  PaymentSummaryCard,
} from '@components';
import styles, {
  TextPress,
  BoxSet,
  ViewBox,
  ViewSections,
  ListData,
} from './style';
import { useHooks } from './hook';
import i18next from 'i18next';
import _ from 'lodash';
import { Button } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const PaymentOrder = props => {
  const { navigation, route } = props;
  const {
    bookingCategory,
    bookingData = null,
    note = null,
    imageUrl,
    covidForm = null,
    price = 0,
    title = null,
    locationAddress = null,
  } = route.params;
  const {
    auth,
    theme,
    fromTo,
    Images,
    loading,
    payment,
    itemList,
    paymentType,
    lengthCredit,
    customerId,
    Text,
    Avatar,
    Icon,
    consultationPrice,
    drugPriceTotal,
    totalPrice,
    shippingPrice,
    Ionics,
    submit,
    submitOMA,
    useTheme,
    setLoading,
    ChevronRight,
    StraightLine,
    renderIconService,
    fetchCustomerInfo,
    onNext,
  } = useHooks({
    bookingCategory,
    navigation,
    bookingData,
    note,
    imageUrl,
    covidForm,
    locationAddress,
    price,
  });
  useEffect(() => {
    // console.log(bookingData);
    fetchCustomerInfo();
  }, [customerId]);
  return !auth.isAuthenticated ? (
    <UserAuthentication
      navigation={navigation}
      title={i18next.t('TELEPAYMENT_ORDER_LIST')}
      message={i18next.t('UNAUTH_BOOKING')}
      buttonText={i18next.t('UNAUTH_SIGNIN')}
    />
  ) : (
    <View>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
        />
        <Loading isVisible={loading} />
        <Header
          text={i18next.t('TELEPAYMENT_ORDER_LIST')}
          onPressLeft={() => navigation.goBack()}
        />
        <ScrollView
          scrollEventThrottle={8}
          style={{
            backgroundColor: theme.colors.white,
          }}
        >
          {/* 1st Section */}
          <View style={styles(theme).sectionContentContainer}>
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
              <Text style={styles(theme).titleText}>
                {/* Telepharmacy & Delivery */}
                {fromTo[bookingCategory]}
              </Text>
              <Text
                style={{
                  fontSize: theme.fontSizeSmallest,
                  fontFamily: theme.fontFamilyDefault,
                  color: '#a9a9a9',
                }}
              >
                {/* {i18next.t('TELEPAYMENT_CONSULT_TEXT')} */}
              </Text>
            </View>
          </View>

          {bookingData?.bookingCategory === `general` &&
            bookingData?.bookingType === `Telepharmacy` && (
              <View style={styles(theme).sectionContainer}>
                <View>
                  <Text style={styles(theme).titleText}>
                    {i18next.t('MYBOOKINGACT_SHIPPING_ADDRESS')}
                  </Text>
                </View>
                {locationAddress && (
                  <React.Fragment>
                    <View style={{ marginVertical: 10 }}>
                      <Text
                        style={[
                          styles(theme).titleText,
                          {
                            fontSize: theme.fontSizeSmall,
                            fontFamily: theme.fontFamilyDefault,
                          },
                        ]}
                      >
                        {locationAddress?.address}
                      </Text>
                    </View>
                    <View style={[styles(theme).sectionOrder, { padding: 10 }]}>
                      <Text style={styles(theme).titleText}>
                        {i18next.t('MONIGLUC_NOTE')}
                      </Text>
                      <Text
                        style={[
                          styles(theme).titleText,
                          {
                            fontSize: theme.fontSizeSmaller,
                            fontFamily: theme.fontFamilyDefault,
                          },
                        ]}
                      >
                        {locationAddress?.note}
                      </Text>
                    </View>
                  </React.Fragment>
                )}
                <View style={{ marginTop: 10 }}>
                  <Button
                    title={
                      <Text
                        style={{
                          fontFamily: theme.fontFamilyBold,
                          fontSize: theme.fontSizeDefault,
                          color: theme.colors.white,
                        }}
                      >
                        {locationAddress
                          ? i18next.t('SETTINGINFO_EDIT')
                          : i18next.t('MYBOOKINGACT_SELECT_ADDRESS')}
                      </Text>
                    }
                    onPress={() =>
                      navigation.navigate('SavePlace', {
                        googleLocation: locationAddress,
                        bookingData: bookingData,
                        bookingCategory: `general`,
                      })
                    }
                  />
                </View>
              </View>
            )}

          {/* USER SYMPTOM DETAIL */}
          {bookingData?.symptom && bookingData?.symptom?.note !== '' && (
            <View
              style={{
                backgroundColor: theme.colors.white,
                borderRadius: 10,
                shadowColor: theme.colors.shadows,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                elevation: 6,
                margin: 10,
              }}
            >
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
              {bookingData?.symptom?.note !== '' && (
                <View
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                    borderColor: theme.colors.grey5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.fontSizeSmaller,
                      fontFamily: theme.fontFamilyDefault,
                      color: theme.colors.grey1,
                    }}
                  >
                    {bookingData?.symptom?.note}
                  </Text>
                </View>
              )}
              {bookingData?.symptom?.imageUrl !== '' && (
                <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                  <ImageViewerModal images={bookingData?.symptom?.imageUrl}>
                    <View
                      style={{
                        marginVertical: 5,
                        overflow: 'hidden',
                        borderRadius: 10,
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Image
                        source={{ uri: bookingData?.symptom?.imageUrl }}
                        style={{
                          width: '100%',
                          height: undefined,
                          aspectRatio: 135 / 76,
                          resizeMode: 'center',
                        }}
                      />
                    </View>
                  </ImageViewerModal>
                </View>
              )}
            </View>
          )}

          {bookingCategory !== 'general' ||
            // (bookingCategory === 'telemed' && (
            (bookingCategory === 'hello' && (
              <View style={styles(theme).sectionContainer}>
                {/* title */}
                <View>
                  <Text style={styles(theme).titleText}>
                    {i18next.t('MYBOOKINGACT_SHIPPING_ADDRESS')}
                  </Text>
                </View>

                {/* total pay */}
                <ViewBox>
                  <View style={styles(theme).rowSection}>
                    <View>
                      <Ionics
                        style={{
                          paddingTop: 2,
                        }}
                        size={30}
                        name="location-sharp"
                        color={theme.colors.secondary}
                      />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles(theme).titleText}>
                        {i18next.t('PAYMENTORDER_PIN')}
                      </Text>
                      <Text
                        style={{
                          fontSize: theme.fontSizeSmallest,
                          fontFamily: theme.fontFamilyDefault,
                          color: '#a9a9a9',
                        }}
                      >
                        Bangkok, Thailand
                      </Text>
                    </View>
                  </View>
                  <BoxSet>
                    <Text
                      style={{
                        fontSize: theme.fontSizeSmallest,
                        fontFamily: theme.fontFamilyDefault,
                        color: '#a9a9a9',
                      }}
                    >
                      เลี้ยวซ้ายหน้าเซเว่น, อยู่ติดกับไก่ย่าง
                    </Text>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        marginVertical: 7,
                        right: 10,
                      }}
                    >
                      <Text
                        style={[
                          styles(theme).titleText,
                          {
                            fontSize: theme.fontSizeSmallest,
                            fontFamily: theme.fontFamilyDefault,
                            color: theme.colors.secondary,
                          },
                        ]}
                      >
                        {i18next.t('SETTINGINFO_EDIT')}
                      </Text>
                    </TouchableOpacity>
                  </BoxSet>
                </ViewBox>
              </View>
            ))}

          <PaymentSummaryCard
            bookingCategory={fromTo[bookingCategory]}
            consultationPrice={consultationPrice}
            shippingPrice={shippingPrice}
            // totalPrice={totalPrice}
            bookingData={bookingData}
          />

          <View style={styles(theme).sectionContainer}>
            {/* title */}
            <View>
              <Text style={styles(theme).titleText}>
                {i18next.t('TELEPAYMENT_PAYMENT_DETAIL')}
              </Text>
            </View>

            {/* total pay */}
            <View>
              <TouchableOpacity
                style={[
                  styles(theme).rowSection,
                  {
                    marginVertical: 10,
                    padding: 5,
                  },
                ]}
                onPress={() =>
                  navigation.navigate('PaymentSelect', {
                    type: paymentType,
                  })
                }
              >
                {paymentType === 1 ? (
                  <>
                    <View
                      style={{
                        borderColor: '#00000060',
                        borderWidth: 1,
                        borderRadius: 5,
                        justifyContent: 'center',
                        paddingHorizontal: 12,
                        padding: 3,
                      }}
                    >
                      <Icon
                        size={20}
                        name="attach-money"
                        color={theme.colors.secondary}
                      />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                      <Text
                        style={[
                          styles(theme).titleText,
                          {
                            fontSize: theme.fontSizeDefault,
                            fontFamily: theme.fontFamilyDefault,
                            marginVertical: 2,
                          },
                        ]}
                      >
                        {i18next.t('PAYMENTORDER_CASH')}
                      </Text>
                    </View>
                  </>
                ) : paymentType === 2 ? (
                  <>
                    <View style={{ justifyContent: 'center' }}>
                      <View style={styles(theme).iConMoney}>
                        <Image
                          style={styles(theme).iconCredit}
                          source={Images.CreditCardLogo}
                        />
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: theme.fontFamilyDefault,
                          fontSize: 16,
                          marginHorizontal: 10,
                        }}
                      >
                        {i18next.t('PAYMENTORDER_CARD')}
                      </Text>
                      <Text
                        style={{
                          fontFamily: theme.fontFamilyDefault,
                          color: theme.colors.grey3,
                          marginHorizontal: 10,
                        }}
                      >
                        ****{' '}
                        {
                          payment.cards?.data?.filter(
                            v => v.id == payment.default_card,
                          )[0]?.last_digits
                        }
                        {console.log(
                          'payment.cards?.data?',
                          payment.cards?.data,
                        )}
                      </Text>
                    </View>
                  </>
                ) : paymentType === 3 ? (
                  <View style={styles(theme).rowSection}>
                    <View style={{ justifyContent: 'center' }}>
                      <View style={styles(theme).iconBankCollumn}>
                        <Image
                          style={styles(theme).iconBanking}
                          source={Images.InternetBanking}
                        />
                      </View>
                    </View>
                    <Text style={styles(theme).textPayment}>
                      {i18next.t('SELECT_PAYMENT_METHOD_INTERNET')}
                    </Text>
                  </View>
                ) : (
                  <View style={styles(theme).rowSection}>
                    <View style={{ justifyContent: 'center' }}>
                      <View style={styles.iconPromptPayCollumn}>
                        <Image
                          style={styles(theme).iconPromptPay}
                          source={Images.PromptPay}
                        />
                      </View>
                    </View>
                    <Text style={styles(theme).textPayment}>PromptPay</Text>
                  </View>
                )}

                <ChevronRight font={40} height={paymentType === 2 ? 10 : 1} />
              </TouchableOpacity>
            </View>
          </View>
          {Platform.OS === 'android' ? (
            <View style={{ height: windowHeight / 2.4 }} />
          ) : (
            <View style={{ height: windowHeight / 2.5 }} />
          )}
        </ScrollView>
      </SafeAreaView>
      <ViewSections style={styles(theme).ShadowShade}>
        <View style={{ padding: 10, bottom: 10 }}>
          <View style={[styles(theme).ViewRow, styles(theme).ExtendRow]}>
            <Text
              style={[
                styles(theme).titleText,
                {
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyDefault,
                },
              ]}
            >
              {i18next.t('TELEPAYMENT_TOTAL')}
            </Text>
            <Text
              style={[
                styles(theme).titleText,
                {
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyBold,
                  color: theme.colors.secondary,
                },
              ]}
            >
              {totalPrice == 0
                ? i18next.t('TELEPAYMENT_FREE')
                : `฿${totalPrice?.toFixed(2).toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB',
                  })}`}
            </Text>
          </View>
          <Button
            title={
              <Text
                style={{
                  fontFamily: theme.fontFamilyBold,
                  fontSize: theme.fontSizeDefault,
                  color: theme.colors.white,
                  alignSelf: 'center',
                }}
              >
                {i18next.t('PAYMENTORDER_CONFIRM')} /{' '}
                {bookingCategory === `telemed`
                  ? i18next.t('TELEPAYMENT_CONFIRM')
                  : bookingData?.bookingType === `Telepharmacy`
                  ? i18next.t('MYBOOKINGACT_CONSULT_PHAR')
                  : i18next.t('TELEPAYMENT_CALL_DOCTOR')}
              </Text>
            }
            onPress={() => {
              if (paymentType === 3) {
                navigation.navigate('MainStack', {
                  screen: 'PaymentInclude',
                });
              } else if (paymentType === 4) {
                navigation.navigate('MainStack', {
                  screen: 'PromptPay',
                });
              } else if (bookingCategory === `general`) {
                onNext();
              } else if (
                bookingCategory === `procedure` ||
                bookingCategory === `clinicPackage`
              ) {
                submitOMA(price, title);
              } else submit(price, title);
            }}
            disabled={
              bookingData?.bookingCategory === `general` &&
              bookingData?.bookingType === `Telepharmacy` &&
              !locationAddress
            }
          />
        </View>
      </ViewSections>
    </View>
  );
};

export default PaymentOrder;
