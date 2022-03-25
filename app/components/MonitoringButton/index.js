import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';
import { Image, Icon, Text } from '@components';
import { useTheme } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';
import i18next from 'i18next';
function MonitoringButton(props) {
  const {
    id,
    noOfLines,
    icon,
    disabled,
    title,
    type,
    img,
    latestValue,
    latestValue2,
    latestResult,
    latestColor,
    latestBg,
    barBallValuePositionInPercentage,
    ...rest
  } = props;

  const { theme } = useTheme();

  const firstOpacity = useRef(new Animated.Value(0)).current;

  const secondOpacity = useRef(new Animated.Value(0)).current;

  const thirdOpacity = useRef(new Animated.Value(0)).current;

  const fourthOpacity = useRef(new Animated.Value(0)).current;

  const fifthOpacity = useRef(new Animated.Value(0)).current;

  const sixthOpacity = useRef(new Animated.Value(0)).current;

  // let latestColor = undefined
  //  let latestResult = undefined;
  //  let latestBg = undefined;

  let ballColorRed = latestResult ? '#FE685A' : '#B6B6B6';

  useEffect(() => {
    Animated.stagger(30, [
      Animated.timing(firstOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(secondOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(thirdOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(fourthOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(fifthOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(sixthOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      useNativeDriver={true}
      style={[
        styles(theme).resultBox,
        //     latestColor
        //       ? { borderTopColor: latestColor, borderTopWidth: 0.5 }
        //       : { borderTopColor: '#c0c0c0', borderTopWidth: 0.5 },
        {
          // borderLeftColor: latestColor ? latestColor : '#969696',
          opacity:
            id === 1
              ? firstOpacity
              : id === 2
              ? secondOpacity
              : id === 3
              ? thirdOpacity
              : id === 4
              ? fourthOpacity
              : id === 5
              ? fifthOpacity
              : id === 6
              ? sixthOpacity
              : 1,
        },
      ]}
    >
      <TouchableOpacity {...rest} disabled={disabled} activeOpacity={0.8}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            {img ? (
              <Image source={img} style={{ width: 20, height: 20 }} />
            ) : null}
          </View>

          {/* <View style={{ justifyContent: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.smallText,
                  { paddingRight: 5 },
                  latestColor ? { color: latestColor } : null,
                ]}
              >
                {latestResult}
              </Text>
              <Icon name="chevron-right" size={18} color="#545B5F" />
            </View>
          </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Text type="subTitle2" style={{ fontWeight: 'bold' }}>
            {title}
          </Text>
        </View>
        <View style={styles(theme).valueContainer}>
          <View style={styles(theme).valueContainer}>
            <Text type="h4" style={{ paddingRight: 5 }}>
              {latestValue}
              {latestValue2 !== 0 && `/${latestValue2}`}
            </Text>
            <Text type="body5">{type}</Text>
          </View>
        </View>
        <View style={styles(theme).valueContainer}>
          <View
            style={[
              latestBg && latestBg
                ? { backgroundColor: latestBg }
                : { backgroundColor: '#F2F2F2' },
              {
                marginTop: 17,
                marginLeft: 12,
                height: 10,
                width: 70,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              },
            ]}
          >
            <View
              style={{
                alignSelf: 'center',
                width:
                  latestResult && latestResult === 'เกณฑ์ดี'
                    ? '75%'
                    : latestResult === 'ต่ำกว่าเกณฑ์' ||
                      latestResult === 'สูงกว่าเกณฑ์'
                    ? '55%'
                    : null,
                backgroundColor:
                  latestColor && latestColor ? latestColor : '#B6B6B6',
                height: '100%',
              }}
            />
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor:
                  latestResult && latestResult === 'เกณฑ์ดี'
                    ? '#248F77'
                    : latestResult &&
                      (latestResult === 'ต่ำกว่าเกณฑ์' ||
                        latestResult === 'สูงกว่าเกณฑ์')
                    ? ballColorRed
                    : '#F2F2F2',
                left:
                  barBallValuePositionInPercentage !== undefined &&
                  latestResult &&
                  latestResult === 'เกณฑ์ดี'
                    ? barBallValuePositionInPercentage * 60 + 10
                    : barBallValuePositionInPercentage !== undefined
                    ? barBallValuePositionInPercentage + 60
                    : 30,
                position: 'absolute',
                borderRadius: 30,
                top: 0,
              }}
            />
          </View>
          {latestResult && latestResult === 'เกณฑ์ดี' ? (
            <Text
              type="h5"
              style={{ paddingRight: 5, lineHeight: 25, color: '#248F77' }}
            >
              {i18next.t('HEALTHACT_DIARY_INDICATOR_NORMAL')}
            </Text>
          ) : latestResult &&
            (latestResult === 'ต่ำกว่าเกณฑ์' ||
              latestResult === 'สูงกว่าเกณฑ์') ? (
            <View>
              <Text
                type={i18next.language === 'th' ? 'h5' : 'h6'}
                style={{ paddingRight: 5, color: ballColorRed, lineHeight: 25 }}
              >
                {i18next.t('HEALTHACT_DIARY_INDICATOR_ABNORMAL')}
              </Text>
            </View>
          ) : (
            <Text
              type="h5"
              style={{ paddingRight: 5, lineHeight: 25, color: '#248F77' }}
            >
              -
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default MonitoringButton;

MonitoringButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.number,
  icon: PropTypes.node,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  latestValue: PropTypes.number,
  latestValue2: PropTypes.number,
  latestResult: PropTypes.string,
  latestColor: PropTypes.string,
  latestBg: PropTypes.string,
};

MonitoringButton.defaultProps = {
  style: {},
  id: 1,
  icon: null,
  outline: false,
  disabled: false,
  title: '',
  type: '',
  latestValue: 0,
  latestValue2: 0,
  latestResult: '-',
  latestColor: '#000',
  latestBg: '#969696',
};
