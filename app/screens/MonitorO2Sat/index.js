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
  Icon,
  Image,
  MonitoringHeader,
  MonitoringItem,
  Header,
} from '@components';
import i18next from 'i18next';
import { BaseStyle, BaseColor, Images } from '@config';
import { useTheme } from 'react-native-elements';
import styles from './styles';
import { useHooks } from './hooks';

function MonitorO2Sat({ navigation }) {
  const { theme } = useTheme();

  const {
    oxygens,
    defaultOxygen,
    values,
    lowest,
    highest,
    average,
    statistics,
  } = useHooks();

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        onPressLeft={() => navigation.goBack()}
        text={i18next.t('MONIO2_O2')}
        renderRight={() => (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={false}
            style={{
              flex: 1,
            }}
            onPress={() =>
              navigation.navigate('MonitorAddData', {
                type: 'oxygen',
                dangerous: 95,
                low: 90,
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
              yDomain={{ min: 80, max: 100.0 }}
              xDomain={{ min: 0, max: values.length + 10 }}
              viewport={{ size: { width: 10 } }}
              data={values}
            >
              <VerticalAxis
                tickValues={[
                  defaultOxygen.defaultLow == 80 ? 0 : 80,
                  defaultOxygen.defaultLow,
                  defaultOxygen.defaultDangerous,
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
                    from: { color: '#c9ffd5', opacity: 1.0 },
                    to: { color: '#c9ffd5', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: 100 },
                  { x: values.length + 10, y: 100 },
                ]}
              />
              <Area
                theme={{
                  gradient: {
                    from: { color: '#ffe6a8', opacity: 1.0 },
                    to: { color: '#ffe6a8', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: defaultOxygen.defaultDangerous },
                  { x: values.length + 10, y: defaultOxygen.defaultDangerous },
                ]}
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
                  { x: 0, y: defaultOxygen.defaultLow },
                  { x: values.length + 10, y: defaultOxygen.defaultLow },
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
                backgroundColor: '#c9ffd5',
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
                  {highest} <Text style={styles(theme).tabMeasure}>%</Text>
                </Text>
              </View>
            </View>
          </View>

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
                  {i18next.t('MONIGLUC_VALUE_LOWEST')}
                </Text>
              </View>
              <View>
                <Text style={styles(theme).tabValue}>
                  {lowest} <Text style={styles(theme).tabMeasure}>%</Text>
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
                  {i18next.t('MONIGLUC_VALUE_AVG')}
                </Text>
              </View>
              <Text style={styles(theme).tabValue}>
                {average.toFixed(2)}{' '}
                <Text style={styles(theme).tabMeasure}>%</Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles(theme).listContainer}>
          <MonitoringHeader
            title={i18next.t('MONIO2_RECORD_O2')}
            pic={Images.O2Sat}
            primary={theme.colors.primary}
            secondary={theme.colors.secondary}
            statistics={statistics.above + statistics.normal + statistics.below}
            onPress={() =>
              navigation.push('MonitorFullList', {
                report: '????????????????????????',
                typeId: 7,
                trans: i18next.t('MONIO2_O2'),
              })
            }
          />
          {oxygens.length > 0
            ? oxygens
                .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt))
                .splice(0, 5)
                .map(item => (
                  <MonitoringItem
                    key={item.id}
                    type="%"
                    value={item.detail.percent}
                    low={90}
                    high={95}
                    recordedAt={item.recordedAt}
                    colorLow="#CC4343"
                    colorHigh="#0AB678"
                    colorNeutral="#E6B285"
                    oxygen={true}
                  />
                ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MonitorO2Sat;
