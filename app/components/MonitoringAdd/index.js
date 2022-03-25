import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import i18next from 'i18next';
import { Icon, Image, Text } from '@components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from 'react-native-elements';

import styles from './styles';

function MonitoringAdd(props) {
  const validationGlucoseSchema = Yup.object().shape({
    value: Yup.number()
      .integer(i18next.t('MONIADD_FILL_CORRECTED'))
      .required(i18next.t('MONIADD_FILL_GLUCOSE'))
      .min(1, i18next.t('MONIADD_FILL_GLUCOSE'))
      .typeError(i18next.t('MONIADD_FILL_NUM'))
      .label('Value'),
  });

  const validationPressureSchema = Yup.object().shape({
    above: Yup.number()
      .required(i18next.t('MONIADD_FILL_SYS'))
      .integer(i18next.t('MONIADD_FILL_CORRECTED'))
      .min(1, i18next.t('MONIADD_FILL_SYS'))
      .typeError(i18next.t('MONIADD_FILL_NUM'))
      .label('ValueHigh'),
    below: Yup.number()
      .required(i18next.t('MONIADD_FILL_DIASTOLIC'))
      .integer(i18next.t('MONIADD_FILL_CORRECTED'))
      .min(1, i18next.t('MONIADD_FILL_SYS'))
      .typeError(i18next.t('MONIADD_FILL_DIASTOLIC'))
      .label('ValueLow'),
  });

  const validationBmiSchema = Yup.object().shape({
    weight: Yup.number()
      .required(i18next.t('MONIADD_FILL_WEIGHT'))
      .min(20, i18next.t('MONIADD_LOWER_WEIGHT'))
      .max(250, i18next.t('MONIADD_EXCEED_WEIGHT'))
      .typeError(i18next.t('MONIADD_FILL_NUM'))
      .label('weight'),
    height: Yup.number()
      .required(i18next.t('MONIADD_FILL_HEIGHT'))
      .min(50, i18next.t('MONIADD_LOWER_HEIGHT'))
      .max(250, i18next.t('MONIADD_EXCEED_HEIGHT'))
      .typeError(i18next.t('MONIADD_FILL_NUM'))
      .label('height'),
  });

  const validationTempSchema = Yup.object().shape({
    value: Yup.number()
      .required(i18next.t('MONIADD_FILL_TEMP'))
      .min(1, i18next.t('MONIADD_FILL_TEMP'))
      .typeError(i18next.t('MONIADD_FILL_NUM'))
      .label('Value'),
  });

  const validationO2Schema = Yup.object().shape({
    value: Yup.number()
      .required(i18next.t('MONIADD_FILL_O2'))
      .min(1, i18next.t('MONIADD_FILL_O2'))
      .typeError(i18next.t('MONIADD_FILL_NUM'))
      .label('Value'),
  });

  const validationHeartSchema = Yup.object().shape({
    value: Yup.number()
      .required(i18next.t('MONIADD_FILL_HR'))
      .min(1, i18next.t('MONIADD_FILL_HR'))
      .typeError(i18next.t('MONIADD_FILL_NUM'))
      .label('Value'),
  });

  const activityList = [
    { id: 1, title: i18next.t('MONIADD_EMERGENCY') },
    { id: 2, title: i18next.t('MONIADD_MORNING') },
    { id: 3, title: i18next.t('MONIADD_BREAKFAST_BEFORE') },
    { id: 4, title: i18next.t('MONIADD_BREAKFAST_AFTER') },
    { id: 5, title: i18next.t('MONIADD_LUNCH_BEFORE') },
    { id: 6, title: i18next.t('MONIADD_LUNCH_AFTER') },
    { id: 7, title: i18next.t('MONIADD_DINNER_BEFORE') },
    { id: 8, title: i18next.t('MONIADD_DINNER_AFTER') },
    { id: 9, title: i18next.t('MONIADD_BED_BEFORE') },
  ];

  const glucoseAbove = [
    { id: 1, title: i18next.t('MONIADD_CONSUME_HIGHSUGAR') },
    { id: 2, title: i18next.t('MONIADD_CONSUME_GREATER') },
    { id: 3, title: i18next.t('MONIADD_FORGOT_MEDINSULIN') },
    { id: 4, title: i18next.t('MONIADD_LOWER_MED') },
  ];

  const glucoseBelow = [
    { id: 1, title: i18next.t('MONIADD_CONSUME_NOTHING') },
    { id: 2, title: i18next.t('MONIADD_CONSUME_LESS') },
    { id: 3, title: i18next.t('MONIADD_CONSUME_MOREMED') },
    { id: 4, title: i18next.t('MONIADD_MED_INCREASE') },
    { id: 5, title: i18next.t('MONIADD_MUCH_EXCERSIZE') },
    { id: 6, title: i18next.t('MONIADD_CONSUME_ALCO') },
  ];

  const pressureAbove = [
    { id: 1, title: i18next.t('MONIADD_CONSUME_SODIUM') },
    { id: 2, title: i18next.t('MONIADD_FORGOT_MED') },
    { id: 3, title: i18next.t('MONIADD_LOWER_MED') },
    { id: 4, title: i18next.t('MONIADD_STRESS') },
  ];

  const pressureBelow = [
    { id: 1, title: i18next.t('MONIADD_CONSUME_MOREMED2') },
    { id: 2, title: i18next.t('MONIADD_MED_INCREASE2') },
    { id: 3, title: i18next.t('MONIADD_QUICKLY_CHANGE') },
    { id: 4, title: i18next.t('MONIADD_DIARRHEA_VOMIT') },
  ];

  const {
    title,
    max,
    type,
    measurement,
    pic,
    activity,
    activityInput,
    reason,
    reasonInput,
    selectActivity,
    selectReason,
    addReport,
    modalAbove,
    modalBelow,
    setWarning,
    extractedHeight,
    primary,
    secondary,
    loading,
    ...rest
  } = props;

  const { theme } = useTheme();

  const [reasonsforAbove, setReasonsForAbove] = useState();
  const [reasonsforBelow, setReasonsForBelow] = useState();

  useEffect(() => {
    if (type === 'glucose') {
      setReasonsForAbove(glucoseAbove);
      setReasonsForBelow(glucoseBelow);
    } else if (type === 'pressure') {
      setReasonsForAbove(pressureAbove);
      setReasonsForBelow(pressureBelow);
    }
  }, []);

  return (
    <View style={styles(theme).top}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={pic} style={styles(theme).image} />
          <Text type="h5" style={styles(theme).centerText}>
            {title}
          </Text>
        </View>

        {/* <Text style={styles(theme).centerText}>(บันทึกครั้งที่ {no})</Text> */}
      </View>
      <View style={styles(theme).dataContainer}>
        <Formik
          // initialValues={{ value: '' }}
          // enableReinitialize
          initialValues={{
            height: extractedHeight === 0 ? '' : extractedHeight,
          }}
          onSubmit={addReport}
          validationSchema={
            type === 'glucose'
              ? validationGlucoseSchema
              : type === 'pressure'
              ? validationPressureSchema
              : type === 'bmi'
              ? validationBmiSchema
              : type === 'temperature'
              ? validationTempSchema
              : type === 'heart'
              ? validationHeartSchema
              : validationO2Schema
          }
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            handleBlur,
            touched,
          }) => (
            <>
              {type === 'pressure' ? (
                <RenderPressure
                  max={max}
                  onBlurAbove={handleBlur('above')}
                  onChangeTextAbove={handleChange('above')}
                  onBlurBelow={handleBlur('below')}
                  onChangeTextBelow={handleChange('below')}
                  above={values.above}
                  below={values.below}
                  measurement={measurement}
                />
              ) : type === 'bmi' ? (
                <RenderBmi
                  max={max}
                  onBlurHeight={handleBlur('height')}
                  onChangeTextHeight={handleChange('height')}
                  onBlurWeight={handleBlur('weight')}
                  onChangeTextWeight={handleChange('weight')}
                  weight={values.weight}
                  height={values.height}
                  extractedHeight={extractedHeight}
                />
              ) : (
                // Glucose, temperature, heart rate, and oxygen share the same template
                <RenderSingleValue
                  max={max}
                  onBlur={handleBlur('value')}
                  onChangeText={handleChange('value')}
                  value={values.value}
                  measurement={measurement}
                />
              )}

              {errors.value && (
                <Text type="subTitle3" style={styles(theme).err}>
                  {errors.value}
                </Text>
              )}
              {errors.above && (
                <Text type="subTitle3" style={styles(theme).err}>
                  {errors.above}
                </Text>
              )}
              {errors.below && (
                <Text type="subTitle3" style={styles(theme).err}>
                  {errors.below}
                </Text>
              )}
              {errors.weight && (
                <Text type="subTitle3" style={styles(theme).err}>
                  {errors.weight}
                </Text>
              )}
              {errors.height && (
                <Text type="subTitle3" style={styles(theme).err}>
                  {errors.height}
                </Text>
              )}

              {(type === 'glucose' || type === 'pressure') && (
                <>
                  <Text type="h7" style={styles(theme).leftText}>
                    {i18next.t('MONIADD_RECORD_TIME')}
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 10 }}
                  >
                    {activityList.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles(theme).activityBox,
                          activity === item.title && activityInput === null
                            ? { backgroundColor: primary }
                            : null,
                        ]}
                        activeOpacity={0.9}
                        onPress={() => selectActivity(item.title)}
                      >
                        <Text
                          type="body2"
                          style={
                            activity === item.title && activityInput === null
                              ? { color: '#fff' }
                              : null
                          }
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}

              {modalAbove && (
                <>
                  <Text type="h7" style={styles(theme).leftText}>
                    {i18next.t('MONIADD_REASON_EXCEED')}
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {reasonsforAbove.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles(theme).activityBox,
                          reason === item.title && reasonInput === null
                            ? { backgroundColor: primary }
                            : null,
                        ]}
                        activeOpacity={0.9}
                        onPress={() => selectReason(item.title)}
                      >
                        <Text
                          type="body2"
                          style={
                            reason === item.title && reasonInput === null
                              ? { color: '#fff' }
                              : null
                          }
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}

              {modalBelow && (
                <>
                  <Text type="h7" style={styles(theme).leftText}>
                    {i18next.t('MONIADD_REASON_BELOW')}
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {reasonsforBelow.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles(theme).activityBox,
                          reason === item.title && reasonInput === null
                            ? { backgroundColor: primary }
                            : null,
                        ]}
                        activeOpacity={0.9}
                        onPress={() => selectReason(item.title)}
                      >
                        <Text
                          type="body2"
                          style={
                            reason === item.title && reasonInput === null
                              ? { color: '#fff' }
                              : null
                          }
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}

              {activity === null ? (
                <LinearGradient
                  style={styles(theme).add}
                  colors={['#fff', '#fff']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setWarning(true)}
                  >
                    <Icon name="save" style={styles(theme).unsaveIcon} />
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <LinearGradient
                  style={styles(theme).add}
                  colors={[primary, '#019ec1']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{
                      width: '100%',
                      alignItems: 'center',
                    }}
                    disabled={false}
                    onPress={loading ? () => {} : handleSubmit}
                  >
                    {loading ? (
                      <ActivityIndicator
                        style={styles(theme).saveIcon}
                        color={'teal'}
                        size={25}
                      />
                    ) : (
                      <Icon name="save" style={styles(theme).saveIcon} />
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

function RenderSingleValue({ max, onBlur, onChangeText, value, measurement }) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TextInput
        keyboardType="numeric"
        maxLength={max}
        placeholderTextColor="#6e6969"
        placeholder="0"
        style={styles(theme).valueInsert}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        width={120}
      />

      <Text type="subTitle2">{measurement}</Text>
    </View>
  );
}

function RenderPressure({
  max,
  above,
  onBlurAbove,
  onChangeTextAbove,
  below,
  onBlurBelow,
  onChangeTextBelow,
  measurement,
}) {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).withBottom}>
      <View>
        <Text type="h6" style={styles(theme).leftText}>
          {i18next.t('MONIADD_SYS')}
        </Text>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TextInput
            keyboardType="numeric"
            maxLength={max}
            placeholderTextColor="#6e6969"
            placeholder="0"
            style={styles(theme).valueInsert}
            onBlur={onBlurAbove}
            onChangeText={onChangeTextAbove}
            value={above}
            width={120}
          />

          <Text type="subTitle2">{measurement}</Text>
        </View>
      </View>

      <View>
        <Text type="h6" style={styles(theme).leftText}>
          {i18next.t('MONIADD_DIA')}
        </Text>

        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TextInput
            keyboardType="numeric"
            maxLength={max}
            placeholderTextColor="#6e6969"
            placeholder="0"
            style={styles(theme).valueInsert}
            onBlur={onBlurBelow}
            onChangeText={onChangeTextBelow}
            value={below}
            width={120}
          />

          <Text type="subTitle2">{measurement}</Text>
        </View>
      </View>
    </View>
  );
}

function RenderBmi({
  max,
  height,
  onBlurHeight,
  onChangeTextHeight,
  weight,
  onBlurWeight,
  onChangeTextWeight,
  extractedHeight,
}) {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).withBottom}>
      <View>
        <Text type="h6" style={styles(theme).leftText}>
          {i18next.t('MONIADD_WEIGHT')}
        </Text>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TextInput
            keyboardType="numeric"
            maxLength={max}
            placeholderTextColor="#6e6969"
            placeholder="0"
            style={styles(theme).valueInsert}
            onBlur={onBlurWeight}
            onChangeText={onChangeTextWeight}
            value={weight}
            width={120}
          />

          <Text type="subTitle2">{i18next.t('MONIWEIGHT_KG')}</Text>
        </View>
      </View>

      <View>
        <Text type="h6" style={styles(theme).leftText}>
          {i18next.t('MONIADD_HEIGHT')}
        </Text>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TextInput
            keyboardType="numeric"
            maxLength={max}
            placeholderTextColor="#6e6969"
            placeholder={extractedHeight.toString()}
            style={styles(theme).valueInsert}
            onBlur={onBlurHeight}
            onChangeText={onChangeTextHeight}
            value={height.toString()}
            width={120}
          />

          <Text type="subTitle2">{i18next.t('MONIWEIGHT_CM')}</Text>
        </View>
      </View>
    </View>
  );
}

export default MonitoringAdd;

MonitoringAdd.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  type: PropTypes.string,
  no: PropTypes.number,
  max: PropTypes.number,
  activity: PropTypes.string,
  activityInput: PropTypes.string,
  reason: PropTypes.string,
  reasonInput: PropTypes.string,
  selectActivity: PropTypes.func,
  selectReason: PropTypes.func,
  modalAbove: PropTypes.bool,
  modalBelow: PropTypes.bool,
  setWarning: PropTypes.func,
  loading: PropTypes.bool,
};

MonitoringAdd.defaultProps = {
  style: {},
  title: '',
  type: '',
  no: 0,
  max: 3,
  activity: '',
  activityInput: null,
  reason: '',
  reasonInput: null,
  selectActivity: null,
  selectReason: null,
  modalAbove: false,
  modalBelow: false,
  setWarning: null,
  loading: false,
};
