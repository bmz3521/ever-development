import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import styles from './styles';

import 'moment/locale/th';
function MonitoringItem(props) {
  i18next.language === 'th' ? moment.locale('th') : moment.locale('en');

  const [showId, setShowId] = useState([]);

  const {
    id,
    type,
    value,
    value2,
    low,
    high,
    recordedAt,
    period,
    reason,
    colorLow,
    colorHigh,
    colorNeutral,
    topHigh,
    topLow,
    bottomHigh,
    bottomLow,
    oxygen,
    pressure,
    weight,
    height,
    ...rest
  } = props;

  return (
    <View>
      <View {...rest} style={[styles.itemContainer]}>
        {oxygen ? (
          <View style={styles.dateAndActivity}>
            {value > high ? (
              <Text type="h5" style={{ color: colorHigh }}>
                {value}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            ) : value > low ? (
              <Text type="h5" style={{ color: colorNeutral }}>
                {value}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            ) : (
              <Text type="h5" style={{ color: colorLow }}>
                {value}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            )}
          </View>
        ) : pressure ? (
          <View style={styles.dateAndActivity}>
            {value > topLow &&
            value <= topHigh &&
            value2 >= bottomLow &&
            value2 <= bottomHigh ? (
              <Text type="h5" style={{ color: colorNeutral }}>
                {value}/{value2}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            ) : value > topHigh || value2 > bottomHigh ? (
              <Text type="h5" style={{ color: colorHigh }}>
                {value}/{value2}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            ) : (
              <Text type="h5" style={{ color: colorLow }}>
                {value}/{value2}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.dateAndActivity}>
            {value < low ? (
              <Text type="h5" style={{ color: colorLow }}>
                {value}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            ) : value > high ? (
              <Text type="h5" style={{ color: colorHigh }}>
                {value}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            ) : (
              <Text type="h5" style={{ color: colorNeutral }}>
                {value}{' '}
                <Text type="body3" style={{ color: '#535353' }}>
                  {type}
                </Text>
              </Text>
            )}
            {weight !== undefined &&
              height !== undefined &&
              weight !== 0 &&
              height !== 0 && (
                <View>
                  <Text type="body3" style={{ color: '#535353' }}>
                    ({weight} {i18next.t('MONIWEIGHT_KG')} / {height}{' '}
                    {i18next.t('MONIWEIGHT_CM')})
                  </Text>
                </View>
              )}
          </View>
        )}

        <View style={styles.resultAndDelete}>
          <Text type="body3" style={{ color: '#535353' }}>
            {moment(recordedAt).format('D MMM YYYY')}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (!showId.includes(id)) {
                setShowId([...showId, id]);
              } else {
                setShowId(showId.filter(x => x !== id));
              }
            }}
          >
            <MaterialIcons
              name={showId.includes(id) ? 'expand-less' : 'expand-more'}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showId.includes(id) && (
        <View style={styles.expanded}>
          <View style={{ flex: 1 }}>
            <Text type="body3" style={{ color: '#535353' }}>
              {i18next.t('MONIGLUC_TIME')}: {moment(recordedAt).format('HH:mm')}{' '}
            </Text>
            {period && (
              <Text type="body3" style={{ color: '#535353' }}>
                {period}
              </Text>
            )}
            {reason && (
              <Text type="body3" style={{ color: '#535353' }}>
                {i18next.t('MONIGLUC_NOTE')}: {reason}
              </Text>
            )}
          </View>

          {oxygen ? (
            <View>
              {value > high ? (
                <Text type="h6" style={{ color: colorHigh }}>
                  {i18next.t('MONIO2_TRES_NORMAL')}
                </Text>
              ) : value > low ? (
                <Text type="h6" style={{ color: colorNeutral }}>
                  {i18next.t('MONIO2_OBSERVE')}
                </Text>
              ) : (
                <Text type="h6" style={{ color: colorLow }}>
                  {i18next.t('MONIO2_TRES_BELOW')}
                </Text>
              )}
            </View>
          ) : pressure ? (
            <View>
              {value > topLow &&
              value <= topHigh &&
              value2 >= bottomLow &&
              value2 <= bottomHigh ? (
                <Text type="h6" style={{ color: colorNeutral }}>
                  {i18next.t('MONIPRES_TRES_NORMAL')}
                </Text>
              ) : value > topHigh || value2 > bottomHigh ? (
                <Text type="h6" style={{ color: colorHigh }}>
                  {i18next.t('MONIPRES_TRES_ABOVE')}
                </Text>
              ) : (
                <Text type="h6" style={{ color: colorLow }}>
                  {i18next.t('MONIPRES_TRES_BELOW')}
                </Text>
              )}
            </View>
          ) : (
            <View>
              {value < low ? (
                <Text type="h6" style={{ color: colorLow }}>
                  {i18next.t('MONIGLUC_RATE_BELOW')}
                </Text>
              ) : value > high ? (
                <Text type="h6" style={{ color: colorHigh }}>
                  {i18next.t('MONIGLUC_RATE_ABOVE')}
                </Text>
              ) : (
                <Text type="h6" style={{ color: colorNeutral }}>
                  {i18next.t('MONIGLUC_RATE_NORMAL')}
                </Text>
              )}
            </View>
          )}
        </View>
      )}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
      </View>
    </View>
  );
}

export default MonitoringItem;

MonitoringItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.string,
  value: PropTypes.number,
  value2: PropTypes.number,
  low: PropTypes.number,
  high: PropTypes.number,
  recordedAt: PropTypes.string,
  period: PropTypes.string,
  reason: PropTypes.string,
  colorLow: PropTypes.string,
  colorHigh: PropTypes.string,
  colorNeutral: PropTypes.string,
  topHigh: PropTypes.number,
  topLow: PropTypes.number,
  bottomHigh: PropTypes.number,
  bottomLow: PropTypes.number,
  oxygen: PropTypes.bool,
  pressure: PropTypes.bool,
  weight: PropTypes.number,
  height: PropTypes.number,
};

MonitoringItem.defaultProps = {
  style: {},
  type: '',
  value: 0,
  value2: 0,
  low: 0,
  high: 0,
  recordedAt: '',
  period: null,
  reason: null,
  colorLow: '#000',
  colorHigh: '#000',
  colorNeutral: '#000',
  topHigh: 0,
  topLow: 0,
  bottomHigh: 0,
  bottomLow: 0,
  oxygen: false,
  pressure: false,
  weight: 0,
  height: 0,
};
