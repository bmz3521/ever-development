import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import {
  SafeAreaView,
  Image,
  MonitoringFullItem,
  DeleteButton,
  Header,
} from '@components';
import i18next from 'i18next';
import { BaseStyle, BaseColor, Images } from '@config';
import { useTheme } from 'react-native-elements';
import styles from './styles';
import { useHooks } from './hooks';

function MonitorFullList({ navigation, route }) {
  const [extractedHeight] = useState(route.params.extractedHeight);
  const [report] = useState(route.params.report);
  const { trans } = route.params;
  const { typeId } = route.params;

  const { theme } = useTheme();

  const {
    glucose,
    pressure,
    temperature,
    oxygen,
    bmi,
    heartRate,
    defaultGlucose,
    defaultTopHigh,
    defaultTopLow,
    defaultBottomHigh,
    defaultBottomLow,
    refreshing,
    events,
  } = useHooks({ report, typeId });

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: '#fff' }]}
      forceInset={{ top: 'always' }}
    >
      <Header
        text={trans}
        onPressLeft={() => navigation.navigate('HealthActivity')}
      />

      {report === 'น้ำตาลในเลือด' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles(theme).listContainer}
          data={glucose}
          renderItem={({ item, index }) => (
            <MonitoringFullItem
              id={item.id}
              type={i18next.t('MONIGLUC_MGDL')}
              value={item.detail.glucose}
              low={defaultGlucose.defaultLow}
              high={defaultGlucose.defaultHigh}
              period={item?.detail?.period}
              reason={item?.detail?.reason}
              recordedAt={item.recordedAt}
              colorLow="#CC4343"
              colorHigh="#36daf7"
              colorNeutral="#0AB678"
              renderLeftActions={() => (
                <DeleteButton onPress={() => events.onDelete(item.id)} />
              )}
            />
          )}
          onRefresh={events.onRefresh}
          refreshing={refreshing}
          onEndReached={events.fetchGlucoseReports}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <View
              style={[styles(theme).left, { marginTop: 5, marginBottom: 10 }]}
            >
              {glucose.length > 0 && (
                <Text style={{ color: '#ccc' }}>
                  {i18next.t('MONIFULL_SWIPE_RIGHT')}
                </Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles(theme).header}>
              <View style={styles(theme).left}>
                <Image
                  source={Images.BloodGlucose}
                  style={styles(theme).image}
                />
                <Text style={styles(theme).leftText}>
                  {i18next.t('MONIGLUC_RECORD')}
                </Text>
              </View>

              <View style={styles(theme).addContainer}>
                <TouchableOpacity
                  style={styles(theme).add}
                  disabled={false}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('MonitorAddData', {
                      type: 'glucose',
                      above: defaultGlucose.defaultHigh,
                      below: defaultGlucose.defaultLow,
                    })
                  }
                >
                  <Text style={styles(theme).buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
        />
      )}

      {report === 'ความดันโลหิต' && (
        <FlatList
          contentContainerStyle={styles(theme).listContainer}
          showsVerticalScrollIndicator={false}
          data={pressure}
          renderItem={({ item, index }) => (
            <MonitoringFullItem
              type={i18next.t('MONIPRES_MMHG')}
              value={item.detail.high}
              value2={item.detail.low}
              topHigh={defaultTopHigh}
              topLow={defaultTopLow}
              bottomHigh={defaultBottomHigh}
              bottomLow={defaultBottomLow}
              period={item?.detail?.period}
              reason={item?.detail?.reason}
              recordedAt={item.recordedAt}
              colorLow="#36daf7"
              colorHigh="#CC4343"
              colorNeutral="#0AB678"
              renderLeftActions={() => (
                <DeleteButton onPress={() => events.onDelete(item.id)} />
              )}
              pressure={true}
            />
          )}
          onRefresh={events.onRefresh}
          refreshing={refreshing}
          onEndReached={events.fetchPressureReports}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <View
              style={[styles(theme).left, { marginTop: 5, marginBottom: 10 }]}
            >
              {pressure.length > 0 && (
                <Text style={{ color: '#ccc' }}>
                  {i18next.t('MONIFULL_SWIPE_RIGHT')}
                </Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles(theme).header}>
              <View style={styles(theme).left}>
                <Image
                  source={Images.BloodPressure}
                  style={styles(theme).image}
                />
                <Text style={styles(theme).leftText}>
                  {i18next.t('MONIPRES_RECORD')}
                </Text>
              </View>
              <View style={styles(theme).addContainer}>
                <TouchableOpacity
                  style={styles(theme).add}
                  disabled={false}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('MonitorAddData', {
                      type: 'pressure',
                      defaultTopHigh: defaultTopHigh,
                      defaultTopLow: defaultTopLow,
                      defaultBottomHigh: defaultBottomHigh,
                      defaultBottomLow: defaultBottomLow,
                    })
                  }
                >
                  <Text style={styles(theme).buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
        />
      )}

      {report === 'อุณหภูมิ' && (
        <FlatList
          contentContainerStyle={styles(theme).listContainer}
          showsVerticalScrollIndicator={false}
          data={temperature}
          renderItem={({ item, index }) => (
            <MonitoringFullItem
              type="°C"
              value={item.detail.celsius}
              low={35.0}
              high={37.8}
              recordedAt={item.recordedAt}
              colorLow="#CC4343"
              colorHigh="#36daf7"
              colorNeutral="#0AB678"
              renderLeftActions={() => (
                <DeleteButton onPress={() => events.onDelete(item.id)} />
              )}
            />
          )}
          onRefresh={events.onRefresh}
          refreshing={refreshing}
          onEndReached={events.fetchTemperatureReports}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <View
              style={[styles(theme).left, { marginTop: 5, marginBottom: 10 }]}
            >
              {temperature.length > 0 && (
                <Text style={{ color: '#ccc' }}>
                  {i18next.t('MONIFULL_SWIPE_RIGHT')}
                </Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles(theme).header}>
              <View style={styles(theme).left}>
                <Image source={Images.BodyTemp} style={styles(theme).image} />
                <Text style={styles(theme).leftText}>
                  {i18next.t('MONITEMP_RECORD')}
                </Text>
              </View>
              <View style={styles(theme).addContainer}>
                <TouchableOpacity
                  style={styles(theme).add}
                  activeOpacity={0.8}
                  disabled={false}
                  onPress={() =>
                    navigation.navigate('MonitorAddData', {
                      type: 'temperature',
                      above: 37.8,
                      below: 35.0,
                    })
                  }
                >
                  <Text style={styles(theme).buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
        />
      )}

      {report === 'ออกซิเจน' && (
        <FlatList
          contentContainerStyle={styles(theme).listContainer}
          showsVerticalScrollIndicator={false}
          data={oxygen}
          renderItem={({ item, index }) => (
            <MonitoringFullItem
              type="%"
              value={item.detail.percent}
              high={95.0}
              low={90}
              recordedAt={item.recordedAt}
              colorLow="#CC4343"
              colorHigh="#0AB678"
              colorNeutral="#E6B285"
              oxygen={true}
              renderLeftActions={() => (
                <DeleteButton onPress={() => events.onDelete(item.id)} />
              )}
            />
          )}
          onRefresh={events.onRefresh}
          refreshing={refreshing}
          onEndReached={events.fetchOxygenReports}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <View
              style={[styles(theme).left, { marginTop: 5, marginBottom: 10 }]}
            >
              {oxygen.length > 0 && (
                <Text style={{ color: '#ccc' }}>
                  {i18next.t('MONIFULL_SWIPE_RIGHT')}
                </Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles(theme).header}>
              <View style={styles(theme).left}>
                <Image source={Images.O2Sat} style={styles(theme).image} />
                <Text style={styles(theme).leftText}>
                  {i18next.t('MONIO2_RECORD_O2')}
                </Text>
              </View>
              <View style={styles(theme).addContainer}>
                <TouchableOpacity
                  style={styles(theme).add}
                  activeOpacity={0.8}
                  disabled={false}
                  onPress={() =>
                    navigation.navigate('MonitorAddData', {
                      type: 'oxygen',
                      dangerous: 95,
                      low: 90,
                    })
                  }
                >
                  <Text style={styles(theme).buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
        />
      )}

      {report === 'ดัชนีมวลกาย' && (
        <FlatList
          contentContainerStyle={styles(theme).listContainer}
          showsVerticalScrollIndicator={false}
          data={bmi}
          renderItem={({ item, index }) => (
            <MonitoringFullItem
              type={i18next.t('MONIWEIGHT_KGSQM')}
              value={item.detail.bmi}
              weight={item.detail.weight}
              height={item.detail.height}
              high={22.99}
              low={18.5}
              recordedAt={item.recordedAt}
              colorLow="#36daf7"
              colorHigh="#CC4343"
              colorNeutral="#0AB678"
              renderLeftActions={() => (
                <DeleteButton onPress={() => events.onDelete(item.id)} />
              )}
            />
          )}
          onRefresh={events.onRefresh}
          refreshing={refreshing}
          onEndReached={events.fetchBmiReports}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <View
              style={[styles(theme).left, { marginTop: 5, marginBottom: 10 }]}
            >
              {bmi.length > 0 && (
                <Text style={{ color: '#ccc' }}>
                  {i18next.t('MONIFULL_SWIPE_RIGHT')}
                </Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles(theme).header}>
              <View style={styles(theme).left}>
                <Image source={Images.Weight} style={styles(theme).image} />
                <Text style={styles(theme).leftText}>
                  {i18next.t('MONIWEIGHT_RECORD_BMI')}
                </Text>
              </View>
              <View style={styles(theme).addContainer}>
                <TouchableOpacity
                  style={styles(theme).add}
                  activeOpacity={0.8}
                  disabled={false}
                  onPress={() =>
                    navigation.navigate('MonitorAddData', {
                      type: 'bmi',
                      above: 22.99,
                      below: 18.5,
                      extractedHeight: extractedHeight,
                    })
                  }
                >
                  <Text style={styles(theme).buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
        />
      )}

      {report === 'หัวใจ' && (
        <FlatList
          contentContainerStyle={styles(theme).listContainer}
          showsVerticalScrollIndicator={false}
          data={heartRate}
          renderItem={({ item, index }) => (
            <MonitoringFullItem
              type={i18next.t('MONIHR_BPM')}
              value={item.detail.times}
              low={60}
              high={100}
              recordedAt={item.recordedAt}
              colorLow="#36daf7"
              colorHigh="#CC4343"
              colorNeutral="#0AB678"
              renderLeftActions={() => (
                <DeleteButton onPress={() => events.onDelete(item.id)} />
              )}
            />
          )}
          onRefresh={events.onRefresh}
          refreshing={refreshing}
          onEndReached={events.fetchHeartReports}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <View
              style={[styles(theme).left, { marginTop: 5, marginBottom: 10 }]}
            >
              {heartRate.length > 0 && (
                <Text style={{ color: '#ccc' }}>
                  {i18next.t('MONIFULL_SWIPE_RIGHT')}
                </Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles(theme).header}>
              <View style={styles(theme).left}>
                <Image source={Images.HeartRate} style={styles(theme).image} />
                <Text style={styles(theme).leftText}>
                  {i18next.t('MONIHR_RECORD_HR')}
                </Text>
              </View>
              <View style={styles(theme).addContainer}>
                <TouchableOpacity
                  style={styles(theme).add}
                  activeOpacity={0.8}
                  disabled={false}
                  onPress={() =>
                    navigation.navigate('MonitorAddData', {
                      type: 'heart',
                      above: 100,
                      below: 60,
                    })
                  }
                >
                  <Text style={styles(theme).buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
        />
      )}
    </SafeAreaView>
  );
}

export default MonitorFullList;
