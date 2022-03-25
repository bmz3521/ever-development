import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Chart,
  Line,
  Area,
  VerticalAxis,
  HorizontalAxis,
} from 'react-native-responsive-linechart';
import {
  SafeAreaView,
  MonitoringHeader,
  MonitoringItem,
  Header,
} from '@components';
import i18next from 'i18next';
import { BaseStyle, BaseColor, Images } from '@config';
import { useTheme } from 'react-native-elements';
import styles from './styles';
import { useHooks } from './hooks';

function MonitorHeartRate({ navigation }) {
  const { theme } = useTheme();
  const {
    heartRates,
    defaultHeartRate,
    values,
    lowest,
    highest,
    average,
    statistics,
  } = useHooks();

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text={i18next.t('MONIHR_HR')}
        onPressLeft={() => navigation.goBack()}
        renderRight={() => (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={false}
            style={{
              flex: 1,
            }}
            onPress={() =>
              navigation.navigate('MonitorAddData', {
                type: 'heart',
                above: 100,
                below: 60,
              })
            }
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}
            >
              <View>
                <Text
                  style={{
                    color: '#00bae5',
                    textAlign: 'center',
                    alignSelf: 'center',
                    lineHeight: 40,
                    paddingRight: 5,
                  }}
                >
                  Add Data
                </Text>
              </View>
              <View style={styles(theme).add}>
                <Text style={styles(theme).buttonText}>+</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#fff' }}
      >
        <View style={styles(theme).container}>
          <View style={styles(theme).topContainer}>
            <Chart
              style={{ height: 180, width: '100%' }}
              padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
              yDomain={{ min: 0, max: 140.0 }}
              xDomain={{ min: 0, max: values.length + 10 }}
              viewport={{ size: { width: 10 } }}
              data={values}
            >
              <VerticalAxis
                tickValues={[
                  0,
                  defaultHeartRate.defaultLow,
                  defaultHeartRate.defaultHigh,
                ]}
                theme={{
                  axis: { stroke: { color: '#000', width: 2 } },
                  ticks: { stroke: { color: 'green', width: 2 } },
                  labels: { formatter: v => Number(v) },
                }}
              />
              <HorizontalAxis
                tickCount={1}
                theme={{
                  axis: { stroke: { color: '#000', width: 2 } },
                  labels: {
                    formatter: v => Number(v),
                  },
                }}
              />

              <Area
                theme={{
                  gradient: {
                    from: { color: '#fcbfbf', opacity: 1.0 },
                    to: { color: '#fcbfbf', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: 140 },
                  { x: values.length + 10, y: 140 },
                ]}
              />
              <Area
                theme={{
                  gradient: {
                    from: { color: '#c9ffd5', opacity: 1.0 },
                    to: { color: '#c9ffd5', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: defaultHeartRate.defaultHigh },
                  { x: values.length + 10, y: defaultHeartRate.defaultHigh },
                ]}
              />
              <Area
                theme={{
                  gradient: {
                    from: { color: '#d3f8ff', opacity: 1.0 },
                    to: { color: '#d3f8ff', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: defaultHeartRate.defaultLow },
                  { x: values.length + 10, y: defaultHeartRate.defaultLow },
                ]}
              />
              <Line
                theme={{
                  stroke: { color: '#00bae5', width: 2 },
                  scatter: {
                    default: { width: 8, height: 8, rx: 4, color: '#00bae5' },
                  },
                }}
                data={values}
              />
            </Chart>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={[
              styles(theme).recordContainer,
              {
                backgroundColor: '#fcbfbf',
              },
            ]}
          >
            <View>
              <View>
                <Text style={styles(theme).tabText}>
                  {i18next.t('MONIGLUC_VALUE_HIGHEST')}
                </Text>
              </View>
              <View>
                <Text style={styles(theme).tabValue}>
                  {highest}{' '}
                  <Text style={styles(theme).tabMeasure}>
                    {i18next.t('MONIHR_BPM')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles(theme).recordContainer,
              {
                backgroundColor: '#d3f8ff',
              },
            ]}
          >
            <View>
              <View>
                <Text style={styles(theme).tabText}>
                  {i18next.t('MONIHR_LOWEST')}
                </Text>
              </View>
              <View>
                <Text style={styles(theme).tabValue}>
                  {lowest}{' '}
                  <Text style={styles(theme).tabMeasure}>
                    {i18next.t('MONIHR_BPM')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles(theme).recordContainer,
              {
                backgroundColor: '#fff',
              },
            ]}
          >
            <View>
              <View>
                <Text style={styles(theme).tabText}>
                  {i18next.t('MONIHR_AVG')}
                </Text>
              </View>
              <Text style={styles(theme).tabValue}>
                {average.toFixed(0)}{' '}
                <Text style={styles(theme).tabMeasure}>
                  {i18next.t('MONIHR_BPM')}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles(theme).listContainer}>
          <MonitoringHeader
            title={i18next.t('MONIHR_RECORD_HR')}
            pic={Images.HeartRate}
            primary={theme.colors.primary}
            secondary={theme.colors.secondary}
            statistics={statistics.above + statistics.normal + statistics.below}
            onPress={() =>
              navigation.push('MonitorFullList', {
                report: 'หัวใจ',
                typeId: 8,
                trans: i18next.t('MONIHR_HR'),
              })
            }
          />

          {heartRates.length > 0
            ? heartRates
                .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt))
                .splice(0, 5)
                .map(item => (
                  <MonitoringItem
                    key={item.id}
                    type={i18next.t('MONIHR_BPM')}
                    value={item.detail.times}
                    low={60}
                    high={100}
                    recordedAt={item.recordedAt}
                    colorLow="#36daf7"
                    colorHigh="#CC4343"
                    colorNeutral="#0AB678"
                  />
                ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MonitorHeartRate;
