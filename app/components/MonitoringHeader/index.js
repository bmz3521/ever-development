import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image, Text } from '@components';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import styles from './styles';

function MonitoringHeader(props) {
  const { pic, primary, secondary, title, ...rest } = props;

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Image source={pic} style={styles.image} />
        <View>
          <Text type="h6">{title}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity {...rest} activeOpacity={0.8}>
          <Text type="body2" style={{ color: primary }}>
            {i18next.t('MONIGLUC_VIEWALL')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MonitoringHeader;

MonitoringHeader.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  pic: PropTypes.node,
  title: PropTypes.string,
  statistics: PropTypes.number,
};

MonitoringHeader.defaultProps = {
  style: {},
  pic: null,
  title: '',
  statistics: 0,
};
