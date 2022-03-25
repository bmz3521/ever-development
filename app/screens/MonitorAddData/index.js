import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView, Header, Text, MonitoringAdd } from '@components';
import { BaseStyle, Images } from '@config';
import i18next from 'i18next';
import { useTheme } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useHooks } from './hooks';
import styles from './styles';

function MonitorAddData({ navigation, route }) {
  const { theme } = useTheme();
  const user = useSelector(state => state.user);
  const { type, no, extractedHeight } = route.params;

  const {
    reason,
    reasonInput,
    activity,
    activityInput,
    modalAbove,
    setModalAbove,
    modalBelow,
    setModalBelow,
    setWarning,
    saveResult,
    setSaveResult,
    saveSuccess,
    loading,
    events,
  } = useHooks({ user, route });

  useEffect(() => {
    const checkNetwork = () => {
      NetInfo.fetch().then(state => {
        console.log(state);
        console.log('Is isInternetReachable?', state.isInternetReachable);

        const notConnected = () => {
          Alert.alert(
            i18next.t('STATUS_NOCONNECTION'),
            i18next.t('STATUS_CHECKINTERNET'),
            [
              {
                text: i18next.t('STATUS_OK'),
                onPress: () => navigation.navigate('HealthActivity'),
              },
            ],
          );
        };

        if (state?.isInternetReachable === false) {
          notConnected();
        }
      });
    };

    checkNetwork();
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <Header
          text={i18next.t('MONIADD_DETAIL')}
          onPressLeft={() => navigation.goBack()}
        />

        <ScrollView style={{ backgroundColor: '#fff' }}>
          {type === 'glucose' ? (
            <MonitoringAdd
              title={i18next.t('MONIADD_GLUCOSE_LEVEL')}
              // no={no + 1}
              addReport={events.addGlucoseReport}
              max={3}
              pic={Images.BloodGlucose}
              type={type}
              measurement={i18next.t('MONIADD_MMDL')}
              activity={activity}
              activityInput={activityInput}
              selectActivity={events.selectActivity}
              selectReason={events.selectReason}
              reason={reason}
              reasonInput={reasonInput}
              modalAbove={modalAbove}
              modalBelow={modalBelow}
              setModalAbove={setModalAbove}
              setModalBelow={setModalBelow}
              setWarning={setWarning}
              primary={theme.colors.primary}
              secondary={theme.colors.secondary}
              loading={loading}
            />
          ) : null}

          {type === 'pressure' ? (
            <MonitoringAdd
              title={i18next.t('MONIADD_FILL_BLOODPRESSURE')}
              // no={no + 1}
              addReport={events.addPressureReport}
              max={3}
              pic={Images.BloodPressure}
              type={type}
              measurement={i18next.t('MONIADD_MMHG')}
              activity={activity}
              activityInput={activityInput}
              selectActivity={events.selectActivity}
              selectReason={events.selectReason}
              reason={reason}
              reasonInput={reasonInput}
              modalAbove={modalAbove}
              modalBelow={modalBelow}
              setModalAbove={setModalAbove}
              setModalBelow={setModalBelow}
              setWarning={setWarning}
              primary={theme.colors.primary}
              secondary={theme.colors.secondary}
              loading={loading}
            />
          ) : null}

          {type === 'bmi' ? (
            <MonitoringAdd
              title={i18next.t('MONIADD_FILL_BMI')}
              // no={no + 1}
              extractedHeight={extractedHeight}
              addReport={events.addBmiReport}
              max={5}
              pic={Images.Weight}
              type={type}
              measurement={i18next.t('MONIADD_CM')}
              setWarning={setWarning}
              primary={theme.colors.primary}
              secondary={theme.colors.secondary}
              loading={loading}
            />
          ) : null}

          {type === 'temperature' ? (
            <MonitoringAdd
              title={i18next.t('MONIADD_FILL_TEMP2')}
              // no={no + 1}
              addReport={events.addTemperatureReport}
              max={5}
              pic={Images.BodyTemp}
              type={type}
              measurement={i18next.t('MONIADD_C')}
              setWarning={setWarning}
              primary={theme.colors.primary}
              secondary={theme.colors.secondary}
              loading={loading}
            />
          ) : null}

          {type === 'oxygen' ? (
            <MonitoringAdd
              title={i18next.t('MONIADD_FILLING_O2')}
              // no={no + 1}
              addReport={events.addO2Report}
              max={3}
              pic={Images.O2Sat}
              type={type}
              measurement="%"
              setWarning={setWarning}
              primary={theme.colors.primary}
              secondary={theme.colors.secondary}
              loading={loading}
            />
          ) : null}

          {type === 'heart' ? (
            <MonitoringAdd
              title={i18next.t('MONIADD_FILL_HR')}
              // no={no + 1}
              addReport={events.addHeartRateReport}
              max={3}
              pic={Images.HeartRate}
              type={type}
              measurement={i18next.t('MONIADD_BPM')}
              setWarning={setWarning}
              primary={theme.colors.primary}
              secondary={theme.colors.secondary}
              loading={loading}
            />
          ) : null}

          {saveResult && (
            <Modal animationType="fade" transparent={true} visible={saveResult}>
              <View style={styles.centeredView}>
                <View style={styles.modalActivity}>
                  {saveSuccess ? (
                    <Text
                      type="h5"
                      style={{
                        color: theme.colors.primary,
                        paddingHorizontal: 60,
                        textAlign: 'center',
                      }}
                    >
                      {i18next.t('MONIADD_FILL_SUCCESS')}
                    </Text>
                  ) : (
                    <Text
                      type="h5"
                      style={{
                        color: '#79022F',
                        paddingHorizontal: 60,
                        textAlign: 'center',
                      }}
                    >
                      {i18next.t('MONIADD_FILL_ERROR')}
                    </Text>
                  )}

                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      underlayColor="grey"
                      style={styles.save}
                      disabled={false}
                      onPress={() => {
                        setSaveResult(false);
                        navigation.navigate('HealthActivity');
                      }}
                    >
                      <Text type="h5" style={styles.buttonTextAdd}>
                        {i18next.t('STATUS_OK')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default MonitorAddData;
