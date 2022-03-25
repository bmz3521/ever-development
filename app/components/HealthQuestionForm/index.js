import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import i18next from 'i18next';
import moment from 'moment';
import {
  SafeAreaView,
  Header,
  TextInput,
  DateWheelPicker,
  Text,
  BottomSheetPicker,
  Loading,
  ModalUI,
} from '@components';
import useBaseStyles from './styles';
import { useTheme, Icon } from 'react-native-elements';
import { useHooks } from './hooks';
import { CODVID_DESCRIPTION } from 'app/configs/Data';

import AdditionInfo from 'app/patient-components/AdditionInfo';
import PregnancyInfo from 'app/patient-components/AdditionInfo/pregnancyInfo.tsx';
import TouchablePerson from 'app/patient-components/TouchablePerson';

import useModalAnimation from 'app/hooks/useModalAnimation';
import { ICON } from 'app/images/Icon';

const HealthQuestionForm = ({ navigation, route, user }) => {
  moment.locale(i18next.language);
  const { visible, open, close, transY } = useModalAnimation();

  const genderText = {
    MALE: i18next.t('USERREG_MALE'),
    FEMALE: i18next.t('USERREG_FEMALE'),
  };

  const healthChoiceText = {
    HEALTH_INSURANCE: 'ประกันสุขภาพในเขต',
    SOCIAL_SECURITY: 'ประกันสังคม',
    GOVERNMENT_OFFICER: 'ข้าราชการ',
    HANDICAPPED: 'ผู้พิการ',
    OTHER: 'อื่นๆ',
  };

  const typeText = {
    PCR: 'PCR',
    ATK: 'ATK',
  };

  const {
    formik,
    description,
    actions,
    btnLoading,
    dataPregnancy,
    dataCondition,
    // dataAtk,
    data2,
    dataPerson,
    checkForm,
  } = useHooks({
    navigation,
    user,
  });

  const { theme } = useTheme();
  const baseStyles = useBaseStyles();
  const datePickerRef = useRef();
  const imagePickerRef = useRef();

  const handleStyleButton = (condition, error) => {
    if (
      !condition.covidTest ||
      !condition.firstName ||
      !condition.lastName ||
      !condition.weight ||
      !condition.height ||
      !condition.age ||
      !condition.date ||
      // !condition.healthChoice ||
      !condition.emergencyName ||
      !condition.emergencyNumber ||
      !condition.gender ||
      !condition.imageUri ||
      btnLoading ||
      error.covidTets ||
      error.firstName ||
      error.lastName ||
      error.weight ||
      error.height ||
      error.age ||
      error.emergencyName ||
      error.emergencyNumber
    ) {
      return baseStyles.placeholderColor;
    } else {
      return theme.colors.primary;
    }
  };

  const renderErrorText = msg => {
    return <Text style={baseStyles.errorText}>{msg}</Text>;
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      forceInset={{ top: 'always' }}
    >
      <DateWheelPicker
        title={i18next.t('USERREG_WHEELDATE')}
        onSubmit={date => formik.setFieldValue('date', date)}
        ref={datePickerRef}
        initialDate={
          formik.values.date ? new Date(formik.values.date) : new Date()
        }
      />
      <BottomSheetPicker
        file={false}
        onPress={actions.uploadImage}
        ref={imagePickerRef}
      />
      <ModalUI
        title={`แจ้งเตือน`}
        message={`คุณยังมีความเสี่ยงติดโรคโควิดต่ำถึงปานกลาง โปรดติดตามอาการแล้วมากรอกแบบสอบถามอีกครั้ง ในวันถัดไป`}
        buttonText=""
        navigation={navigation}
        hideLogoModal={true}
        onOpenModal={checkForm}
        setIsVisibleModal={modal => actions.setCheckForm(modal)}
        onCustomUI={false}
        successModal={false}
        onPress={() => navigation.navigate('Home')}
        animated="slide"
        cancelButton={false}
      />
      <Loading isVisible={btnLoading} />
      {/* <Header text="แบบฟอร์มโควิด" onPressLeft={() => navigation.goBack()} /> */}
      <Header text="แบบฟอร์ม" onPressLeft={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={baseStyles.contain}>
            <>
              {/* top container section */}
              <View style={baseStyles.formTitleContainer}>
                <View
                  style={{
                    padding: 10,
                  }}
                >
                  <Text type="h4" style={{ color: theme.colors.primary }}>
                    {/* {'ปรึกษาแพทย์ทางไกลหรือรับเครื่องตรวจ ATK'} */}
                    {'ปรึกษาแพทย์ทางไกลสำหรับผู้ป่วยใช้บริการ HI'}
                  </Text>
                  {description ? (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#e6e6e6',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ alignSelf: 'center' }}>
                        {CODVID_DESCRIPTION[description]}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>

              {/* Select description */}
              {description === '' && (
                <View style={[baseStyles.formContainer, { marginTop: 20 }]}>
                  <View style={{ padding: 10 }}>
                    <View style={{ alignSelf: 'center' }}>
                      <Text type="h6">
                        คุณได้ตรวจโควิด-19 แล้วพบเชื้อใช่หรือไม่
                      </Text>
                    </View>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 20,
                      }}
                    >
                      <View style={{ flex: 0.45 }}>
                        <TouchableOpacity
                          onPress={() => actions.selectDescription(2)}
                          style={{
                            backgroundColor: theme.colors.primary,
                            height: 50,
                            padding: 10,
                            justifyContent: 'center',
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            type="buttonSmall"
                            style={{
                              color: 'white',
                              textAlign: 'center',
                            }}
                          >
                            {'ไม่ (หรือไม่เคยตรวจ)'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 0.45 }}>
                        <TouchableOpacity
                          onPress={() => actions.selectDescription(1)}
                          style={{
                            backgroundColor: theme.colors.primary,
                            height: 50,
                            padding: 10,
                            justifyContent: 'center',
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            type="buttonSmall"
                            style={{
                              color: 'white',
                              textAlign: 'center',
                            }}
                          >
                            {'ใช่'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {description === 1 && (
                <>
                  {/* section ชนิดการตรวจ covid */}
                  <View style={[baseStyles.formContainer, { marginTop: 20 }]}>
                    {/* เลือกชนิดการตรวจ */}
                    <View
                      style={[
                        baseStyles.fieldSet,
                        { marginTop: 20, marginBottom: 20 },
                      ]}
                    >
                      <Text type="body4" style={baseStyles.legend}>
                        {' '}
                        {'ชนิดการตรวจ'}{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          actions.selectType(
                            formik.handleChange('type'),
                            i18next.t('USERREG_SELECT'),
                          )
                        }
                        style={baseStyles.addressBtn}
                      >
                        {formik.values.type ? (
                          <View
                            style={{
                              ...baseStyles.ctnRow,
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              type="body2"
                              style={{
                                ...baseStyles.textBoxShow,
                                textAlign: 'center',
                              }}
                            >
                              {typeText[formik.values.type]}
                            </Text>
                            <Icon
                              name="chevron-right"
                              color={baseStyles.placeholderColor}
                              size={28}
                            />
                          </View>
                        ) : (
                          <View style={baseStyles.addressPlaceholder}>
                            <Text
                              type="body2"
                              style={{
                                ...baseStyles.addressPlaceHolderText,
                                color: baseStyles.placeholderColor,
                              }}
                            >
                              {i18next.t('USERREG_SELECT')}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                    {/* ที่ตรวจโควิด */}
                    {/* <TextInput
                      containerStyles={{ margin: 10 }}
                      label={'ที่ตรวจโควิด'}
                      labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                      maxLength={100}
                      value={formik.values.covidTest}
                      onChangeText={formik.handleChange('covidTest')}
                      onBlur={formik.handleBlur('covidTest')}
                      placeholder={'ที่ตรวจโควิด'}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.covidTest &&
                      formik.errors.covidTest &&
                      renderErrorText(formik.errors.covidTest)}
                  </View> */}
                    <TextInput
                      containerStyles={{ margin: 10 }}
                      label={'ที่ตรวจ'}
                      labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                      maxLength={100}
                      value={formik.values.covidTest}
                      onChangeText={formik.handleChange('covidTest')}
                      onBlur={formik.handleBlur('covidTest')}
                      placeholder={'ที่ตรวจ'}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.covidTest &&
                      formik.errors.covidTest &&
                      renderErrorText(formik.errors.covidTest)}
                  </View>

                  {/* section ยืนยันประวัติผู้ป่วย */}
                  <View style={baseStyles.formContainer}>
                    <View style={baseStyles.frameImg}>
                      <Text type="h6" style={{ color: theme.colors.primary }}>
                        ยืนยันประวัติผู้ป่วย
                      </Text>
                    </View>

                    {/* ถ่ายรูปผลตรวจโควิด */}
                    <View
                      style={[
                        baseStyles.fieldSet,
                        { marginBottom: 20, marginTop: 20 },
                      ]}
                    >
                      <Text
                        type="body4"
                        style={{
                          color: theme.colors.black,
                          position: 'absolute',
                          textAlign: 'center',
                          top: -10,
                          backgroundColor: baseStyles.whiteColor,
                        }}
                      >
                        {/* {' กรุณาถ่ายภาพผลตรวจโควิด '} */}
                        {' กรุณาถ่ายภาพผลตรวจ '}
                        <Text style={baseStyles.errorColor}>*</Text>
                      </Text>
                      <View
                        style={{
                          padding: 15,
                          paddingTop: 20,
                        }}
                      >
                        <View>
                          {formik.values.imageUri !== '' ? (
                            <TouchableOpacity
                              style={[
                                baseStyles.imageContainer,
                                { alignSelf: 'center', borderRadius: 8 },
                              ]}
                              onPress={actions.onLongPress}
                            >
                              <Image
                                source={{ uri: formik.values.imageUri }}
                                style={{
                                  width: 150,
                                  height: 150,
                                  maxWidth: 350,
                                }}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => imagePickerRef.current.show()}
                              style={baseStyles.addImageBtn}
                            >
                              <Icon
                                name="plus"
                                color={theme.colors.primary}
                                type="entypo"
                                size={40}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* ชื่อจริง */}
                    <TextInput
                      containerStyles={{ margin: 10 }}
                      label={i18next.t('USERREG_FIRSTNAME')}
                      labelExtra={
                        <>
                          <Text style={baseStyles.errorColor}>*</Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: baseStyles.placeholderColor,
                            }}
                          >
                            {` (${i18next.t('USERREG_NAMEIDCARD')})`}
                          </Text>
                        </>
                      }
                      maxLength={60}
                      value={formik.values.firstName}
                      onChangeText={formik.handleChange('firstName')}
                      onBlur={formik.handleBlur('firstName')}
                      placeholder={i18next.t('USERREG_FIRSTNAME_THAI')}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.firstName &&
                      formik.errors.firstName &&
                      renderErrorText(formik.errors.firstName)}

                    {/* <View style={{ marginBottom: 20 }}> */}

                    {/* นามสกุล */}
                    <TextInput
                      containerStyles={{ margin: 10 }}
                      label={i18next.t('USERREG_LASTNAME')}
                      selectionColor={'red'}
                      labelExtra={
                        <>
                          <Text style={baseStyles.errorColor}>*</Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: baseStyles.placeholderColor,
                            }}
                          >
                            {` (${i18next.t('USERREG_NAMEIDCARD')})`}
                          </Text>
                        </>
                      }
                      maxLength={60}
                      value={formik.values.lastName}
                      onChangeText={formik.handleChange('lastName')}
                      onBlur={formik.handleBlur('lastName')}
                      placeholder={i18next.t('USERREG_LASTNAME_THAI')}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.lastName &&
                      formik.errors.lastName &&
                      renderErrorText(formik.errors.lastName)}
                    {/* </View> */}

                    {/* น้ำหนัก */}
                    <TextInput
                      containerStyles={{ margin: 10 }}
                      label={'น้ำหนัก'}
                      keyboardType="number-pad"
                      selectionColor={'red'}
                      labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                      value={formik.values.weight}
                      onChangeText={formik.handleChange('weight')}
                      onBlur={formik.handleBlur('weight')}
                      placeholder={'น้ำหนัก (กก.)'}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.weight &&
                      formik.errors.weight &&
                      renderErrorText(formik.errors.weight)}

                    {/* ส่วนสูง */}
                    <TextInput
                      containerStyles={{ margin: 10 }}
                      keyboardType="number-pad"
                      label={'ส่วนสูง (ซม.)'}
                      selectionColor={'red'}
                      labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                      value={formik.values.height}
                      onChangeText={formik.handleChange('height')}
                      onBlur={formik.handleBlur('height')}
                      placeholder={'ส่วนสูง'}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.height &&
                      formik.errors.height &&
                      renderErrorText(formik.errors.height)}

                    {/* อายุ */}

                    <TextInput
                      containerStyles={{ margin: 10 }}
                      keyboardType="number-pad"
                      label={'อายุ'}
                      selectionColor={'red'}
                      labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                      value={formik.values.age}
                      onChangeText={formik.handleChange('age')}
                      onBlur={formik.handleBlur('age')}
                      placeholder={'อายุ (ปี)'}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.age &&
                      formik.errors.age &&
                      renderErrorText(formik.errors.age)}

                    {/* วันที่ตรวจโควิด */}
                    <View>
                      <View style={[baseStyles.fieldSet, { marginTop: 20 }]}>
                        <Text type="body4" style={baseStyles.legend}>
                          {' วันที่รู้ผล '}
                          {/* {' วันที่ตรวจโควิด '} */}
                          <Text style={baseStyles.errorColor}>*</Text>
                        </Text>
                        <TouchableOpacity
                          onPress={() => datePickerRef?.current?.show()}
                          style={baseStyles.addressBtn}
                        >
                          {formik.values.date ? (
                            <View
                              style={{
                                ...baseStyles.ctnRow,
                                alignItems: 'center',
                              }}
                            >
                              <Text
                                type="body2"
                                style={{
                                  ...baseStyles.textBoxShow,
                                  textAlign: 'center',
                                }}
                              >
                                {moment(formik.values.date)
                                  .add(
                                    i18next.language === 'th' ? 543 : 0,
                                    'years',
                                  )
                                  .format('Do MMMM YYYY')}
                              </Text>
                              <Icon
                                name="chevron-right"
                                color={baseStyles.placeholderColor}
                                size={28}
                              />
                            </View>
                          ) : (
                            <View style={baseStyles.addressPlaceholder}>
                              <Text
                                type="body2"
                                style={{
                                  ...baseStyles.addressPlaceHolderText,
                                  color: baseStyles.placeholderColor,
                                }}
                              >
                                {i18next.t('USERREG_SELECT')}
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* สิทธิการรักษา */}
                    {/* <View
                      style={[
                        baseStyles.fieldSet,
                        { marginTop: 20, marginBottom: 20 },
                      ]}
                    >
                      <Text type="body4" style={baseStyles.legend}>
                        {' '}
                        {'สิทธิการรักษา'}{' '}
                        <Text style={baseStyles.errorColor}>*</Text>
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          actions.selectHealthChoice(
                            formik.handleChange('healthChoice'),
                            i18next.t('USERREG_SELECT'),
                          )
                        }
                        style={baseStyles.addressBtn}
                      >
                        {formik.values.healthChoice ? (
                          <View
                            style={{
                              ...baseStyles.ctnRow,
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              type="body2"
                              style={{
                                ...baseStyles.textBoxShow,
                                textAlign: 'center',
                              }}
                            >
                              {healthChoiceText[formik.values.healthChoice]}
                            </Text>
                            <Icon
                              name="chevron-right"
                              color={baseStyles.placeholderColor}
                              size={28}
                            />
                          </View>
                        ) : (
                          <View style={baseStyles.addressPlaceholder}>
                            <Text
                              type="body2"
                              style={{
                                ...baseStyles.addressPlaceHolderText,
                                color: baseStyles.placeholderColor,
                              }}
                            >
                              {i18next.t('USERREG_SELECT')}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View> */}

                    {/* ชื่อผู้ติดต่อฉุกเฉิน */}
                    <TextInput
                      containerStyles={{ margin: 10 }}
                      label={'ชื่อผู้ติดต่อฉุกเฉิน'}
                      labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                      maxLength={60}
                      value={formik.values.emergencyName}
                      onChangeText={formik.handleChange('emergencyName')}
                      onBlur={formik.handleBlur('emergencyName')}
                      placeholder={'ชื่อผู้ติดต่อฉุกเฉิน'}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.emergencyName &&
                      formik.errors.emergencyName &&
                      renderErrorText(formik.errors.emergencyName)}

                    {/* เบอร์ติดต่อฉุกเฉิน (เบอร์ญาติ) */}
                    <TextInput
                      containerStyles={{ margin: 10 }}
                      label={'เบอร์ติดต่อฉุกเฉิน (เบอร์ญาติ)'}
                      labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                      maxLength={10}
                      keyboardType="number-pad"
                      value={formik.values.emergencyNumber}
                      onChangeText={formik.handleChange('emergencyNumber')}
                      onBlur={formik.handleBlur('emergencyNumber')}
                      placeholder={i18next.t('USERREG_MOBILE_NUM')}
                      placeholderTextColor={baseStyles.placeholderColor}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />
                    {formik.touched.emergencyNumber &&
                      formik.errors.emergencyNumber &&
                      renderErrorText(formik.errors.emergencyNumber)}
                    {/* เพศ */}

                    <View
                      style={[
                        baseStyles.fieldSet,
                        { marginBottom: 30, marginTop: 20 },
                      ]}
                    >
                      <Text type="body4" style={baseStyles.legend}>
                        {' '}
                        {i18next.t('USERREG_SEX')}{' '}
                        <Text style={baseStyles.errorColor}>*</Text>
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          actions.selectGender(
                            formik.handleChange('gender'),
                            i18next.t('USERREG_SELECT'),
                          )
                        }
                        style={baseStyles.addressBtn}
                      >
                        {formik.values.gender ? (
                          <View
                            style={{
                              ...baseStyles.ctnRow,
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              type="body2"
                              style={{
                                ...baseStyles.textBoxShow,
                                textAlign: 'center',
                              }}
                            >
                              {genderText[formik.values.gender]}
                            </Text>
                            <Icon
                              name="chevron-right"
                              color={baseStyles.placeholderColor}
                              size={28}
                            />
                          </View>
                        ) : (
                          <View style={baseStyles.addressPlaceholder}>
                            <Text
                              type="body2"
                              style={{
                                ...baseStyles.addressPlaceHolderText,
                                color: baseStyles.placeholderColor,
                              }}
                            >
                              {i18next.t('USERREG_SELECT')}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* ข้อมูลการตั้งครรภ์ */}
                  {formik.values.gender === 'FEMALE' && (
                    <PregnancyInfo
                      data={dataPregnancy}
                      onPress={item => actions.onPressAdditionPregnancy(item)}
                      // onPressAdd={() => navigate(Routes.HealthSearch, { route: Routes.HealthQuestion })}
                      // onPress={setItemCondition}
                      onPressAdd={actions.setPregnancyCondition}
                      setModalMore={actions.setTypeModal}
                      openModalMore={open}
                    />
                  )}

                  {/* AdditionInfo */}
                  <AdditionInfo
                    header="โรคประจำตัว"
                    data={dataCondition}
                    onPress={item => actions.onPressAddition(item)}
                    // onPressAdd={() => navigate(Routes.HealthSearch, { route: Routes.HealthQuestion })}
                    // onPress={setItemCondition}
                    onPressAdd={actions.setItemCondition}
                    setModalMore={actions.setTypeModal}
                    openModalMore={open}
                  />

                  {/* Touchable Person */}
                  <TouchablePerson
                    data={dataPerson}
                    data2={data2}
                    isYou={false}
                    onPress={item => actions.onPressSomeone(item, 'firstForm')}
                    onPress2={item =>
                      actions.onPressSomeone(item, 'secondForm')
                    }
                    style={{
                      borderRadius: 16,
                      backgroundColor: '#fff',
                      marginBottom: 16,
                      marginTop: 16,
                    }}
                  />

                  {/* some text info */}

                  <Text
                    type="body5"
                    style={{
                      textAlign: 'center',
                      marginTop: 16,
                      color: '#262626',
                    }}
                  >
                    For medical emergencies, please call 911 (or your local
                    {'\n'}
                    emergency services) or go to the nearest ER.
                  </Text>

                  <Text
                    type="body5"
                    style={{
                      textAlign: 'center',
                      marginTop: 8,
                      color: '#262626',
                    }}
                  >
                    Answer on Doctor Plus are not intended for individual{'\n'}
                    diagnosis, treatment of prescription.
                  </Text>

                  <View
                    style={[
                      {
                        backgroundColor: theme.colors.white,
                        padding: 10,
                        marginVertical: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                      },
                      { marginTop: 30 },
                    ]}
                  >
                    <View style={baseStyles.styleNote}>
                      <Image
                        source={ICON.security}
                        style={baseStyles.styleIcon}
                      />
                      <Text
                        type="body5"
                        style={{ marginLeft: 10, textAlign: 'center' }}
                      >
                        You details will remain 100% private and secure
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        disabled={
                          formik.errors.firstName ||
                          formik.errors.lastName ||
                          formik.errors.weight ||
                          formik.errors.height ||
                          formik.errors.age ||
                          formik.errors.emergencyName ||
                          formik.errors.emergencyNumber ||
                          formik.errors.covidTest ||
                          btnLoading ||
                          !formik.values.covidTest ||
                          !formik.values.firstName ||
                          !formik.values.lastName ||
                          !formik.values.weight ||
                          !formik.values.height ||
                          !formik.values.age ||
                          !formik.values.date ||
                          // !formik.values.healthChoice ||
                          !formik.values.emergencyName ||
                          !formik.values.emergencyNumber ||
                          !formik.values.gender ||
                          !formik.values.imageUri
                        }
                        style={[
                          baseStyles.touchBtn,
                          {
                            backgroundColor: handleStyleButton(
                              formik.values,
                              formik.errors,
                            ),
                          },
                        ]}
                        onPress={formik.handleSubmit}
                      >
                        <Text style={baseStyles.actionBtn}>
                          {'ไปหน้าถัดไป'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}

              {/* {description === 2 && (
                <View>
                  <AdditionInfo
                    header="แบบประเมิณความเสี่ยง"
                    data={dataAtk}
                    onPress={item => actions.onPressAdditionAtk(item)}
                  />
                  <TouchableOpacity
                    onPress={actions.navigateToBooking}
                    style={[
                      baseStyles.touchBtn,
                      {
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    <Text style={baseStyles.actionBtn}>{'ไปหน้าถัดไป'}</Text>
                  </TouchableOpacity>
                  <View style={{ marginBottom: 40 }} />
                </View>
              )} */}
            </>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HealthQuestionForm;
