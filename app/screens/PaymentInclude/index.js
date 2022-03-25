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
import { useSelector, useDispatch } from 'react-redux';
import { BaseStyle, Images } from '@config';
import { SafeAreaView, Header, UserAuthentication, Image } from '@components';
import { set } from 'react-native-reanimated';
import i18next from 'i18next';

const { width, height } = Dimensions.get('window');
const itemList = [
  { title: 'Bank of Ayudhya (Krungsri)', id: 1, logo: Images.Ayudhya },
  { title: 'Bangkok Bank', id: 2, logo: Images.Bangkokbank },
  { title: 'Krungthai', id: 3, logo: Images.Krungthai },
  { title: 'Siam Commercial Bank', id: 4, logo: Images.Scb },
];

const PaymentInclude = props => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const payment = useSelector(state => state.payment.data);
  const [paymentData, setPaymentData] = useState(payment);
  const { theme } = useTheme();
  const [pressPayType, setPressPayType] = useState(false);
  const [draggableRange, setDraggableRange] = useState({
    top: payment.length > 1 ? height / 2.2 : height / 3.5,
    bottom: -30,
  });
  const [lengthCredit, setLengthCredit] = useState(payment.length);
  const [_draggedValue, set_draggedValue] = useState(new Animated.Value(-30));

  useEffect(() => {
    setDraggableRange({
      top: payment.length > 1 ? height / 2.2 : height / 3.5,
      bottom: -30,
    });
    setLengthCredit(payment.length);
    setPaymentData(payment);
    // console.log('length ===',payment.map(dat => dat.checkCurrent))
  }, [payment, payment.length]);

  const selectCreditCard = async no => {
    const Check = await paymentData.map(val => {
      if (val.checkCurrent) {
        return {
          ...val,
          checkCurrent: false,
        };
      }
      if (val.creditNo === no) {
        return {
          ...val,
          checkCurrent: true,
        };
      } else return val;
    });
    setPaymentData(Check);
  };
  const patchingStateCreditCard = async data => {
    await dispatch(
      PaymentActions.saveCreditCard({
        data: data,
        callback: response => {
          if (response.success) {
            // alert('SUCCESS')
          } else {
            alert('FAIL');
          }
        },
      }),
    );
  };

  const ChevronRight = ({ height, font }) => {
    return (
      <View
        style={{
          position: 'absolute',
          right: 5,
          top: height,
        }}
      >
        <Icon name="chevron-right" color={theme.colors.grey4} size={font} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
        />
        <Header
          text={i18next.t('SELECT_PAYMENT_METHOD_INTERNET')}
          placement="left"
          onPressLeft={() => navigation.goBack()}
        />
        <ScrollView
          scrollEventThrottle={8}
          style={{
            backgroundColor: theme.colors.white,
          }}
        >
          <Page>
            <Content>
              <ScrollView>
                {itemList.map(item => (
                  <View key={item.id}>
                    <ListData>
                      <TextPress
                      // onPress={() => {
                      // }}
                      >
                        <View style={{ justifyContent: 'center' }}>
                          <View style={styles.iconBankCollumn}>
                            <Image
                              style={styles.iconBanking}
                              source={item.logo}
                            />
                          </View>
                        </View>
                        <Text
                          style={{
                            fontFamily: theme.fontFamilyDefault,
                            fontSize: 16,
                            marginHorizontal: 10,
                          }}
                        >
                          {item.title}
                        </Text>
                        <View
                          style={{
                            position: 'absolute',
                            right: 1,
                            top: 10,
                          }}
                        >
                          <ChevronRight font={40} height={-3} />
                        </View>
                      </TextPress>
                    </ListData>
                    <LineStraight />
                  </View>
                ))}
              </ScrollView>
            </Content>
          </Page>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const BarStraightLine = () => (
  <View
    style={{
      borderColor: '#00000030',
      borderWidth: 2,
      marginHorizontal: 100,
      borderRadius: 20,
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

export default PaymentInclude;
