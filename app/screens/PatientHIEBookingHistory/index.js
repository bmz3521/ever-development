import React from 'react';
import { View } from 'react-native';
import { BaseStyle } from '@config';
import { useHooks } from './hooks';
import { SafeAreaView, Text, Loading2, Header } from '@components';
import Timeline from './Timeline/Timeline';
import styles from './styles';

export default PatientHIEBookingHistory = ({ navigation }) => {
  const {
    loading,
    error,
    dataHistory,
    actions,
    refreshing,
    i18next,
  } = useHooks({
    navigation,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <View style={styles.bodyContainer}>
        <Header text={i18next.t('HOME_PATIENT_RECORD')} />
        {loading ? (
          <Loading2 />
        ) : error?.err ? (
          <View style={styles.loading}>
            <Text>{i18next.t('HISTORY_ERROR')}</Text>
          </View>
        ) : (
          <Timeline
            loading={loading}
            onRefresh={actions.onRefresh}
            refreshing={refreshing}
            data={dataHistory}
            lineStyle={styles.line}
            eventStyle={{ marginBottom: 0 }}
            contentContainerStyle={({ flex: 1 }, { borderTopLeftRadius: 15 })}
            onEndReachedThreshold={0.1}
            onEndReached={actions.getMoreHistoryData}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
