import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Chart,
  Line,
  Area,
  VerticalAxis,
  HorizontalAxis,
} from 'react-native-responsive-linechart';
import i18next from 'i18next';
import { SafeAreaView, MonitoringItem, MonitoringHeader } from '@components';
import { Header } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { useTheme } from 'react-native-elements';
import styles from './styles';
import { useHooks } from './hooks';

function MonitorBloodPressure({ navigation }) {
  const { theme } = useTheme();

  const {
    pressure,
    defaultPressure,
    highValues,
    lowValues,
    lowestOfHigh,
    highestOfHigh,
    lowestOfLow,
    highestOfLow,
    averageOfHigh,
    averageOfLow,
    defaultTopHigh,
    defaultTopLow,
    defaultBottomHigh,
    defaultBottomLow,
    statistics,
  } = useHooks();

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text={i18next.t('MONIPRES_BLOOD')}
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
                type: 'pressure',
                defaultTopHigh: defaultTopHigh,
                defaultTopLow: defaultTopLow,
                defaultBottomHigh: defaultBottomHigh,
                defaultBottomLow: defaultBottomLow,
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
              yDomain={{ min: 0, max: 200 }}
              xDomain={{ min: 0, max: highValues.length + 10 }}
              viewport={{ size: { width: 10 } }}
              data={highValues}
            >
              <VerticalAxis
                tickValues={[
                  0,
                  defaultPressure.defaultLow,
                  defaultPressure.defaultHigh,
                  200,
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
                  { x: 0, y: 200 },
                  { x: highValues.length + 10, y: 200 },
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
                  { x: 0, y: defaultPressure.defaultHigh },
                  { x: highValues.length + 10, y: defaultPressure.defaultHigh },
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
                  { x: 0, y: defaultPressure.defaultLow },
                  { x: highValues.length + 10, y: defaultPressure.defaultLow },
                ]}
              />
              <Line
                theme={{
                  stroke: { color: '#00bae5', width: 2 },
                  scatter: {
                    default: { width: 8, height: 8, rx: 4, color: '#00bae5' },
                  },
                }}
                smoothing="cubic-spline"
                data={highValues}
              />
              <Line
                theme={{
                  stroke: { color: '#1c9bdb', width: 2 },
                  scatter: {
                    default: { width: 8, height: 8, rx: 4, color: '#1c9bdb' },
                  },
                }}
                data={lowValues}
              />
            </Chart>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={[
              styles(theme).recordContainer,
              { backgroundColor: '#fcbfbf' },
            ]}
          >
            <View>
              <View>
                <Text style={styles(theme).tabText}>
                  {i18next.t('MONIPRES_HIGHSYS')}
                </Text>
              </View>
              <View>
                <Text style={styles(theme).tabValue}>
                  {highestOfHigh}{' '}
                  <Text style={styles(theme).tabMeasure}>
                    {i18next.t('MONIPRES_MMHG')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles(theme).recordContainer,
              { backgroundColor: '#d3f8ff' },
            ]}
          >
            <View>
              <View>
                <Text style={styles(theme).tabText}>
                  {i18next.t('MONIPRES_LOWSYS')}
                </Text>
              </View>
              <View>
                <Text style={styles(theme).tabValue}>
                  {lowestOfHigh}{' '}
                  <Text style={styles(theme).tabMeasure}>
                    {i18next.t('MONIPRES_MMHG')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles(theme).recordContainer,
              { backgroundColor: '#fcbfbf' },
            ]}
          >
            <View>
              <View>
                <Text style={styles(theme).tabText}>
                  {i18next.t('MONIPRES_HIGHDIAS')}
                </Text>
              </View>
              <View>
                <Text style={styles(theme).tabValue}>
                  {highestOfLow}{' '}
                  <Text style={styles(theme).tabMeasure}>
                    {i18next.t('MONIPRES_MMHG')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles(theme).recordContainer,
              { backgroundColor: '#d3f8ff' },
            ]}
          >
            <View>
              <View>
                <Text style={styles(theme).tabText}>
                  {i18next.t('MONIPRES_LOWDIAS')}
                </Text>
              </View>
              <View>
                <Text style={styles(theme).tabValue}>
                  {lowestOfLow}{' '}
                  <Text style={styles(theme).tabMeasure}>
                    {i18next.t('MONIPRES_MMHG')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[styles(theme).recordContainer, { backgroundColor: '#fff' }]}
          >
            <View>
              <View>
                <Text style={styles(theme).tabText}>
                  {i18next.t('MONIGLUC_VALUE_AVG')}
                </Text>
              </View>
              <Text style={[styles(theme).tabValue, { fontSize: 14 }]}>
                {averageOfHigh}/{averageOfLow}
                <Text style={styles(theme).tabMeasure}>
                  {' '}
                  {i18next.t('MONIPRES_MMHG')}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles(theme).listContainer}>
          <MonitoringHeader
            title={i18next.t('MONIPRES_RECORD')}
            pic={Images.BloodPressure}
            primary={theme.colors.primary}
            secondary={theme.colors.secondary}
            statistics={statistics.above + statistics.normal + statistics.below}
            onPress={() =>
              navigation.push('MonitorFullList', {
                report: 'ความดันโลหิต',
                typeId: 4,
                trans: i18next.t('MONIPRES_BLOOD'),
              })
            }
          />

          {pressure.length > 0
            ? pressure
                .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt))
                .splice(0, 5)
                .map(item => (
                  <MonitoringItem
                    key={item.id}
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
                    pressure={true}
                  />
                ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MonitorBloodPressure;
