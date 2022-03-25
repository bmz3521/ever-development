import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Dimensions,
  FlatList,
  Animated,
  Platform,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import styles, {
  Container,
  Content,
  HeaderView,
  Page,
  TextPress,
  ListData,
  LineStraight,
} from './style';
import { PaymentActions } from '@actions';
import { Text, Avatar, Button, useTheme, Icon } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { BaseStyle, Images } from '@config';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {
  SafeAreaView,
  Header,
  UserAuthentication,
  Image,
  DeleteButton,
  Icon as Iconic,
} from '@components';
import { set } from 'react-native-reanimated';
import i18next from 'i18next';
var axios = require('axios');
var qs = require('qs');

const { width, height } = Dimensions.get('window');

const PaymentSelect = props => {
  const { navigation, route } = props;
  const { type } = route.params;
  const [bounceValue, setBounceValue] = useState(new Animated.Value(400));
  const [isHidden, setIsHidden] = useState(true);
  const dispatch = useDispatch();
  const payment = useSelector(state => state.payment.data);
  const cusId = useSelector(state => state.payment.customerId);
  const selectType = useSelector(state => state.payment.selectType);
  const [paymentData, setPaymentData] = useState(payment);
  const { theme } = useTheme();
  const [pressPayType, setPressPayType] = useState(type);
  const [draggableRange, setDraggableRange] = useState({
    top: height + 180 - 104,
    bottom: 380,
  });
  const [_draggedValue, set_draggedValue] = useState(new Animated.Value(180));
  const [lengthCredit, setLengthCredit] = useState(
    payment?.cards?.data?.length,
  );
  const [listCard, setListCard] = useState(payment?.cards?.data);
  const [defaultCard, setDefaultCard] = useState(payment.default_card);
  const [customerId, setCustomerId] = useState(cusId);
  const { top, bottom } = draggableRange;
  useEffect(() => {
    setLengthCredit(payment?.cards?.data?.length);
    setPaymentData(payment);
    setDefaultCard(payment.default_card);
    setListCard(payment?.cards?.data);
  }, [payment, payment.length, payment.default_card, listCard]);

  const textTranslateY = _draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [0, -75],
    extrapolate: 'clamp',
  });
  const opacityAnimRevert = _draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const opacityAnim = _draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const itemList = [
    { title: i18next.t('SELECT_PAYMENT_METHOD_CASH'), id: 1 },
    { title: i18next.t('SELECT_PAYMENT_METHOD_DEBIT'), id: 2 },
    { title: i18next.t('SELECT_PAYMENT_METHOD_INTERNET'), id: 3 },
    { title: i18next.t('SELECT_PAYMENT_METHOD_PROMPTPAY'), id: 4 },
  ];

  const _toggleSubview = id => {
    var toValue = draggableRange.top;
    if (isHidden && id === 2) {
      toValue = -height / (!lengthCredit ? 2.6 : 2.4);
    }
    Animated.spring(bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();
    setIsHidden(!isHidden);
  };

  const onDeleteCreditCard = async id => {
    var config = {
      method: 'delete',
      url: `https://api.omise.co/customers/${customerId}/cards/${id}`,
      headers: {
        Authorization: 'Basic c2tleV90ZXN0XzVxM3Mzb3plbzB4amRiOHpkZ3g6',
      },
    };

    const resp = await axios(config)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
        return false;
      });
    if (resp) {
      fetchCustomerInfo();
    }
  };

  const fetchCustomerInfo = async () => {
    var config = {
      method: 'get',
      url: `https://api.omise.co/customers/${customerId}`,
      headers: {
        Authorization: 'Basic c2tleV90ZXN0XzVxM3Mzb3plbzB4amRiOHpkZ3g6',
      },
    };

    axios(config)
      .then(async function(response) {
        await dispatch(
          PaymentActions.saveCustomerInfo({
            data: response.data,
            selectType: pressPayType,
            customerId: customerId,
            callback: response => {
              if (response.success) {
                // alert('SUCCESS')
              } else {
                alert('FAIL');
              }
            },
          }),
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const onSaveTypeSelect = async () => {
    if (!lengthCredit && pressPayType === 2) {
      _toggleSubview(2);
    } else {
      console.log('pressP =====', pressPayType);
      await dispatch(
        PaymentActions.saveCustomerInfo({
          data: payment,
          selectType: pressPayType,
          customerId: customerId,
          callback: response => {
            if (response.success) {
              // alert('SUCCESS')
              _toggleSubview();
            } else {
              alert('FAIL');
            }
          },
        }),
      );
      navigation.goBack();
    }
  };

  const patchingStateCreditCard = async (data, type) => {
    var data = qs.stringify({
      default_card: defaultCard,
    });
    var config = {
      method: 'patch',
      url: `https://api.omise.co/customers/${customerId}`,
      headers: {
        Authorization: 'Basic c2tleV90ZXN0XzVxM3Mzb3plbzB4amRiOHpkZ3g6',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    const resp = await axios(config)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
        return false;
      });
    if (resp) {
      await dispatch(
        PaymentActions.saveCustomerInfo({
          data: resp,
          selectType: pressPayType,
          customerId: customerId,
          callback: response => {
            if (response.success) {
              // alert('SUCCESS')
              _toggleSubview();
            } else {
              // alert('FAIL');
            }
          },
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
        />
        <HeaderView>
          <View>
            <Text
              style={{
                fontFamily: theme.fontFamilyBold,
                fontSize: theme.fontSizeDefault,
                textAlign: 'center',
              }}
            >
              {i18next.t('PAYMENTSELECT_SELECTPAYMENT')}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
            }}
            onPress={() => {
              if (
                pressPayType === 2 ||
                (lengthCredit === 0 && selectType === 2)
              )
                _toggleSubview(2);
              else navigation.goBack();
            }}
          >
            <View>
              <Icon
                type="material-community"
                name="close"
                color={theme.colors.grey3}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </HeaderView>
        <Page>
          <Content>
            {itemList.map(item => (
              <View key={item.id}>
                <ListData>
                  <TextPress
                    onPress={async () => {
                      setPressPayType(item.id);
                      _toggleSubview(item.id);
                      // item.id === 3 && navigation.navigate('PaymentInclude');
                    }}
                  >
                    {item.id === 1 ? (
                      <View style={{ justifyContent: 'center' }}>
                        <View style={styles.iConMoney}>
                          <Icon
                            size={20}
                            name="attach-money"
                            color={theme.colors.secondary}
                          />
                        </View>
                      </View>
                    ) : item.id === 2 ? (
                      <View style={{ justifyContent: 'center' }}>
                        <View style={styles.iConMoney}>
                          <Image
                            style={styles.iconCredit}
                            source={Images.CreditCardLogo}
                          />
                        </View>
                      </View>
                    ) : item.id === 3 ? (
                      <View style={{ justifyContent: 'center' }}>
                        <View style={styles.iconBankCollumn}>
                          <Image
                            style={styles.iconBanking}
                            source={Images.InternetBanking}
                          />
                        </View>
                      </View>
                    ) : (
                      <View style={{ justifyContent: 'center' }}>
                        <View style={styles.iconPromptPayCollumn}>
                          <Image
                            style={styles.iconPromptPay}
                            source={Images.PromptPay}
                          />
                        </View>
                      </View>
                    )}
                    {item.id === 2 && lengthCredit ? (
                      <View>
                        <Text
                          style={{
                            fontFamily: theme.fontFamilyDefault,
                            fontSize: 16,
                            marginHorizontal: 10,
                          }}
                        >
                          {item.title}
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
                            payment.cards?.data.filter(
                              v => v.id == payment.default_card,
                            )[0]?.last_digits
                          }
                        </Text>
                      </View>
                    ) : item.id === 2 && !lengthCredit ? (
                      <Text
                        style={{
                          fontFamily: theme.fontFamilyDefault,
                          fontSize: 16,
                          marginHorizontal: 10,
                        }}
                      >
                        {item.title}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: theme.fontFamilyDefault,
                          fontSize: 16,
                          marginHorizontal: 10,
                          lineHeight: 30,
                        }}
                      >
                        {item.title}
                      </Text>
                    )}

                    <View
                      style={{
                        position: 'absolute',
                        right: 20,
                        top: lengthCredit === 0 ? 10 : item.id === 2 ? 20 : 13,
                      }}
                    >
                      {item.id === pressPayType && (
                        <Icon
                          size={25}
                          name="check"
                          color={theme.colors.secondary}
                        />
                      )}
                    </View>
                  </TextPress>
                </ListData>
                <LineStraight />
              </View>
            ))}
          </Content>
        </Page>
      </SafeAreaView>

      <Animated.View
        style={{
          transform: [{ translateY: bounceValue }],
          height: draggableRange.top,
        }}
      >
        <Pressable onPress={_toggleSubview} style={[{ height: height }]}>
          <View />
        </Pressable>
        <SlidingUpPanel
          ref={c => (_panel = c)}
          draggableRange={draggableRange}
          animatedValue={_draggedValue}
          snappingPoints={[400]}
          showBackdrop={false}
          minimumDistanceThreshold={!lengthCredit ? 650 : 0}
        >
          <View style={styles.panelHeader}>
            <BarStraightLine />
            <View style={styles.ViewRow}>
              <View />
              {lengthCredit >= 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    // navigation.popToTop();
                    navigation.navigate('PaymentCreditCard');
                  }}
                >
                  <Text
                    style={[
                      styles.titleText,
                      {
                        fontSize: theme.fontSizeSmallest,
                        fontFamily: theme.fontFamilyDefault,
                        color: theme.colors.secondary,
                      },
                    ]}
                  >
                    {lengthCredit === 0 ? '' : 'เพิ่มบัตร'}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View
            style={[
              styles.panel,
              {
                height: draggableRange.top,
              },
            ]}
          >
            <ScrollView>
              <View>
                {!lengthCredit ? (
                  <Text
                    style={[
                      styles.titleText,
                      {
                        fontSize: theme.fontSizeSmall,
                        fontFamily: theme.fontFamilyDefault,
                        textAlign: 'center',
                      },
                    ]}
                  >
                    {i18next.t('PAYMENTSELECT_NOCARDDATA')}
                  </Text>
                ) : (
                  <>
                    <Animated.View style={{ opacity: opacityAnim }}>
                      {listCard?.map(
                        item =>
                          item.id === defaultCard && (
                            <Swipeable
                              key={item.id}
                              renderRightActions={() => (
                                <View style={styles.deleteButton}>
                                  <TouchableOpacity
                                    onPress={() => onDeleteCreditCard(item.id)}
                                  >
                                    <Image
                                      style={styles.iconDelete}
                                      source={Images.Trash}
                                    />
                                  </TouchableOpacity>
                                </View>
                              )}
                              friction={0.5}
                              overshootFriction={10}
                            >
                              <View
                                style={{
                                  marginHorizontal: -10,
                                }}
                                key={item.id}
                              >
                                <ListData>
                                  <TextPress
                                    onPress={() => {
                                      setDefaultCard(item.id);
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        backgroundColor:
                                          item.id === defaultCard
                                            ? '#2BA27510'
                                            : 'transparent',
                                        borderRadius: 10,
                                        width: '100%',
                                        paddingHorizontal: 25,
                                        paddingVertical: 10,
                                        marginVertical: -15,
                                      }}
                                    >
                                      <View
                                        style={{ justifyContent: 'center' }}
                                      >
                                        <View>
                                          <Image
                                            style={styles.iconCredit}
                                            source={
                                              item.id === defaultCard
                                                ? Images.CheckTrue
                                                : Images.CheckFalse
                                            }
                                            tintColor={
                                              item.id === defaultCard
                                                ? theme.colors.secondary
                                                : 'grey'
                                            }
                                          />
                                        </View>
                                      </View>
                                      <View style={{ paddingLeft: 10 }}>
                                        <Text
                                          style={{
                                            fontFamily: theme.fontFamilyDefault,
                                            fontSize: 16,
                                            marginHorizontal: 10,
                                          }}
                                        >
                                          {i18next.t(
                                            'SELECT_PAYMENT_METHOD_DEBIT',
                                          )}
                                        </Text>
                                        <Text
                                          style={{
                                            fontFamily: theme.fontFamilyDefault,
                                            color: theme.colors.grey3,
                                            marginHorizontal: 10,
                                          }}
                                        >
                                          **** **** **** {item.last_digits}
                                        </Text>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        position: 'absolute',
                                        right: 20,
                                        top: 10,
                                      }}
                                    >
                                      {item.id === pressPayType && (
                                        <Icon
                                          size={25}
                                          name="check"
                                          color={theme.colors.secondary}
                                        />
                                      )}
                                    </View>
                                  </TextPress>
                                </ListData>
                              </View>
                            </Swipeable>
                          ),
                      )}
                    </Animated.View>
                    <Animated.View
                      style={{
                        transform: [{ translateY: textTranslateY }],
                        opacity: opacityAnimRevert,
                      }}
                    >
                      {listCard?.map(item => (
                        <Swipeable
                          key={item.id}
                          renderRightActions={() => (
                            <View style={styles.deleteButton}>
                              <TouchableOpacity
                                onPress={() => onDeleteCreditCard(item.id)}
                              >
                                <Image
                                  style={styles.iconDelete}
                                  source={Images.Trash}
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                          friction={0.5}
                          overshootFriction={10}
                        >
                          <View
                            style={{
                              marginHorizontal: -10,
                            }}
                            key={item.id}
                          >
                            <ListData>
                              <TextPress
                                onPress={() => {
                                  setDefaultCard(item.id);
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor:
                                      item.id === defaultCard
                                        ? '#2BA27510'
                                        : 'transparent',
                                    borderRadius: 10,
                                    width: '100%',
                                    paddingHorizontal: 25,
                                    paddingVertical: 10,
                                    marginVertical: -15,
                                  }}
                                >
                                  <View style={{ justifyContent: 'center' }}>
                                    <View>
                                      <Image
                                        style={styles.iconCredit}
                                        source={
                                          item.id === defaultCard
                                            ? Images.CheckTrue
                                            : Images.CheckFalse
                                        }
                                        tintColor={
                                          item.id === defaultCard
                                            ? theme.colors.secondary
                                            : 'grey'
                                        }
                                      />
                                    </View>
                                  </View>
                                  <View style={{ paddingLeft: 10 }}>
                                    <Text
                                      style={{
                                        fontFamily: theme.fontFamilyDefault,
                                        fontSize: 16,
                                        marginHorizontal: 10,
                                      }}
                                    >
                                      {i18next.t('SELECT_PAYMENT_METHOD_DEBIT')}
                                    </Text>
                                    <Text
                                      style={{
                                        fontFamily: theme.fontFamilyDefault,
                                        color: theme.colors.grey3,
                                        marginHorizontal: 10,
                                      }}
                                    >
                                      **** **** **** {item.last_digits}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    position: 'absolute',
                                    right: 20,
                                    top: 10,
                                  }}
                                >
                                  {item.id === pressPayType && (
                                    <Icon
                                      size={25}
                                      name="check"
                                      color={theme.colors.secondary}
                                    />
                                  )}
                                </View>
                              </TextPress>
                            </ListData>
                          </View>
                        </Swipeable>
                      ))}
                    </Animated.View>
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </SlidingUpPanel>
        <View
          style={{
            backgroundColor: 'white',
            height: 160,
            position: 'absolute',
            width: '100%',
            bottom: 100,
          }}
        >
          {lengthCredit ? (
            <TouchableOpacity
              style={styles.buttonAddCredit}
              onPress={() => {
                patchingStateCreditCard(paymentData);
                _toggleSubview(2);
              }}
            >
              <Text
                style={{
                  fontFamily: theme.fontFamilyBold,
                  fontSize: theme.fontSizeDefault,
                  color: theme.colors.white,
                  alignSelf: 'center',
                }}
              >
                {i18next.t('PAYMENTSELECT_CONFIRM')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonAddCredit}
              onPress={() => {
                // navigation.popToTop();
                navigation.navigate('PaymentCreditCard');
              }}
            >
              <Text
                style={{
                  fontFamily: theme.fontFamilyBold,
                  fontSize: theme.fontSizeDefault,
                  color: theme.colors.white,
                  alignSelf: 'center',
                }}
              >
                {i18next.t('PAYMENTSELECT_ADD')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      {pressPayType && (
        <View
          style={{
            position: 'absolute',
            padding: 10,
            width: '100%',
            bottom: 0,
            zIndex: -1, // works on ios
            elevation: -1, // works on android
          }}
        >
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => {
              onSaveTypeSelect();
            }}
          >
            <Text
              style={{
                fontFamily: theme.fontFamilyDefault,
                fontSize: theme.fontSizeDefault,
                color: theme.colors.white,
                alignSelf: 'center',
              }}
            >
              {i18next.t('PAYMENTSELECT_SAVE')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const BarStraightLine = () => (
  <View
    style={{
      borderColor: '#00000030',
      borderWidth: 2,
      marginHorizontal: 150,
      borderRadius: 20,
      position: 'absolute',
      width: 100,
      top: 10,
    }}
  />
);
const StraightLine = () => (
  <View
    style={{
      borderColor: '#eeeeee',
      borderWidth: 1,
    }}
  />
);
export default PaymentSelect;
