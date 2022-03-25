import React, { useEffect, useState } from 'react';
import {
  TextInput,
  ScrollView,
  Platform,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Animated,
} from 'react-native';
import {
  SafeAreaView,
  Header,
  UserAuthentication,
  ModalUI,
  Image,
  TextInputMask,
} from '@components';
import { BaseStyle, Images } from '@config';
import ErrorMessage from './ErrorMessage';
import { useSelector } from 'react-redux';
import styles, {
  Container,
  TextBox,
  BoxSet,
  BoxLabel,
  HeaderView,
  BoxSetCreditCard,
  RowHalfBox,
  HalfBox,
} from './styles';
import { useHooks } from './hook';
import i18next from 'i18next';

const PaymentCreditCard = ({ navigation }) => {
  const {
    showBirthDate,
    validationSchemaUserInfo,
    failModal,
    successModal,
    theme,
    GenderItem,
    Gender,
    formRef,
    Icon,
    Formik,
    saveCreditCard,
    setSuccessModal,
    setFailModal,
    handleSubmitForm,
  } = useHooks();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.primary}
        barStyle="dark-content"
      />
      <Header
        text={i18next.t('SELECT_PAYMENT_METHOD_ADD_DEBIT')}
        placement="left"
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Formik
            initialValues={{
              creditNo: '',
              expiry: '',
              cVv: '',
              holderName: '',
              checkCurrent: true,
            }}
            onSubmit={saveCreditCard}
            validationSchema={validationSchemaUserInfo}
            innerRef={formRef}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              handleBlur,
              touched,
              setFieldValue,
              setFieldTouched,
            }) => (
              <>
                <View style={styles(theme).iConMoney}>
                  <Image
                    style={styles(theme).iconCredit}
                    source={Images.CreditCardLogo2}
                  />
                </View>
                <BoxSetCreditCard>
                  <TextInputMask
                    style={styles(theme).textInputMask}
                    keyboardType="numeric"
                    placeholderTextColor="#A9A9A9"
                    placeholder="Card number"
                    onBlur={handleBlur('creditNo')}
                    onChangeText={handleChange('creditNo')}
                    value={values.creditNo}
                    width="100%"
                    type={'custom'}
                    options={{
                      mask: '9999-9999-9999-9999',
                    }}
                  />
                </BoxSetCreditCard>

                {
                  <ErrorMessage
                    error={errors.creditNo}
                    visible={touched.creditNo}
                  />
                }

                <RowHalfBox style={styles(theme).setHalfBox}>
                  <HalfBox>
                    <TextInputMask
                      maxLength={5}
                      style={styles(theme).textInputMask}
                      keyboardType="numeric"
                      placeholderTextColor="#cfcfcf"
                      placeholder="MM/YY"
                      onBlur={handleBlur('expiry')}
                      onChangeText={handleChange('expiry')}
                      value={values.expiry}
                      width="100%"
                      type={'custom'}
                      options={{
                        mask: '99/99',
                      }}
                    />
                  </HalfBox>
                  <HalfBox>
                    <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                      CVV
                    </BoxLabel>
                    <TextInputMask
                      customStyle={false}
                      maxLength={3}
                      style={styles(theme).cvvInput}
                      keyboardType="numeric"
                      placeholderTextColor="#cfcfcf"
                      placeholder=""
                      onBlur={handleBlur('cVv')}
                      onChangeText={handleChange('cVv')}
                      value={values.cVv}
                      width="100%"
                      type={'custom'}
                      options={{
                        mask: '999',
                      }}
                    />
                  </HalfBox>
                </RowHalfBox>
                {
                  <ErrorMessage
                    error={errors.expiry}
                    visible={touched.expiry}
                  />
                }
                {<ErrorMessage error={errors.cVv} visible={touched.cVv} />}
                <BoxSet>
                  <TextBox
                    style={styles(theme).textInputMask}
                    theme={{ theme: theme.fontFamilyDefault }}
                    keyboardType="default"
                    placeholderTextColor="#cfcfcf"
                    placeholder="Cardholder name"
                    onBlur={handleBlur('holderName')}
                    onChangeText={handleChange('holderName')}
                    value={Gender[values.holderName]}
                    width="100%"
                  />
                </BoxSet>
                {
                  <ErrorMessage
                    error={errors.holderName}
                    visible={touched.holderName}
                  />
                }
              </>
            )}
          </Formik>
        </Container>

        <ModalUI
          title={`บันทึกเสร็จสิ้น`}
          message={``}
          buttonText="ตกลง"
          navigation={navigation}
          hideLogoModal={false}
          onOpenModal={successModal}
          setIsVisibleModal={modal => setSuccessModal(modal)}
          onCustomUI={false}
          successModal={true}
          animated="slide"
        />
        <ModalUI
          title={`เกิดข้อผิดพลาด`}
          message={`ไม่สามารถบันทึกได้ในขณะนี้`}
          buttonText="ตกลง"
          navigation={navigation}
          hideLogoModal={false}
          onOpenModal={failModal}
          setIsVisibleModal={modal => setFailModal(modal)}
          onCustomUI={false}
          successModal={false}
          onPress={() => navigation.goBack()}
          animated="slide"
        />
      </ScrollView>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={styles(theme).bottomButton}
          onPress={handleSubmitForm}
        >
          <Text
            style={{
              fontFamily: theme.fontFamilyDefault,
              fontSize: theme.fontSizeDefault,
              color: theme.colors.white,
              alignSelf: 'center',
            }}
          >
            ยืนยัน
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentCreditCard;
