import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { BaseStyle, Images } from '@config';
import QRCode from 'react-native-qrcode-svg';
import {
  Header,
  SafeAreaView,
  Image,
  BottomSheetPicker,
  Loading,
  ModalUI,
  ImageViewerModal,
} from '@components';
import styles from './styles';
import { useHooks } from './hook';
import i18next from 'i18next';
import { height } from 'app/configs/Const';
function PromptPay({ navigation }) {
  const { loading, theme, RightHeader } = useHooks({ navigation });
  const [saving, savingState] = useState('');
  const accountNumber = '|099400016602811';
  const HN = '370086811';
  const VN = '640337789';
  const amount = '10000';
  const codePayment = `${accountNumber} 
${HN}
${VN}
${amount}`;
  const labelInfo = [
    {
      header: 'Covid at home',
      message: 'Full Health Record - All Departments',
      status: 'Ongoing connection',
      time: '24/12/2021',
    },
    {
      header: 'Covid at home',
      message: 'Full Health Record - All Departments',
      status: 'Synce once',
      time: '24/12/2021',
    },
  ];
  const getSvg = svg => {
    svg
      ? svg.toDataURL(data => {
          savingState(data);
        })
      : '';
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Loading isVisible={loading} />

      <Header
        text={'PromptPay'}
        onPressLeft={() => {
          navigation.pop();
        }}
      />
      <View
        style={{
          backgroundColor: theme.colors.primary,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: theme.colors.white,
            fontSize: theme.fontSizeLargest,
            fontFamily: theme.fontFamilyBold,
          }}
        >
          แสกนเพื่อจ่ายเงิน
        </Text>
        <Text
          style={{
            color: theme.colors.white,
            fontSize: theme.fontSizeSmallest,
            fontFamily: theme.fontFamilyBold,
          }}
        >
          QR นี้ใช้สำหรับจ่ายเงินไปยังหมายเลขพร้อมเพย์ผู้รับเงิน
        </Text>
        <Text
          style={{
            color: theme.colors.white,
            fontSize: theme.fontSizeSmallest,
            fontFamily: theme.fontFamilyBold,
          }}
        >
          โดยสแกนผ่านแอพที่รองรับเท่านั้น!
        </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles(theme).iconPromptPayCollumn}>
          <Image
            style={styles(theme).iconPromptPay}
            source={Images.PromptPay2}
          />
        </View>
        <View
          style={{
            borderWidth: 5,
            padding: 10,
            borderRadius: 15,
            borderColor: theme.colors.grey,
          }}
        >
          <QRCode
            value={codePayment}
            logoBackgroundColor="transparent"
            size={250}
            getRef={c => getSvg(c)}
            backgroundColor="white"
            color="black"
            logoSize={30}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 40,
          marginVertical: 50,
        }}
      >
        <View>
          <Text
            style={{
              color: theme.colors.black,
              fontSize: theme.fontSizeDefault,
              fontFamily: theme.fontFamilyBold,
            }}
          >
            จำนวนเงิน
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: theme.colors.black,
              fontSize: theme.fontSizeDefault,
              fontFamily: theme.fontFamilyDefault,
            }}
          >
            1000 ฿
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.primary,
          flex: 1,
          padding: 20,
          alignItems: 'center',
          marginVertical: 30,
        }}
      ></View>
    </SafeAreaView>
  );
}
export default PromptPay;
