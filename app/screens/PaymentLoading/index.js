import React, { useEffect, useState } from 'react';

import {
  View,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, Text, StepProgress, Loading } from '@components';
import { useTheme, Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Images } from '@config';

import i18next from 'i18next';
import styles from './styles';
import useHooks from './hooks';

const PaymentLoading = ({ navigation, route }) => {
  const { theme } = useTheme();
  const {
    fromTo,
    bookingCategory,
    bookingData,
    loading,
    actions,
    consultationPrice,
    drugPriceTotal,
    totalPrice,
    shippingPrice,
    PaymentIcon,
  } = useHooks({
    navigation,
    route,
    theme,
  });

  return (
    <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
      <Loading isVisible={loading} />
      <View style={{ paddingTop: 40, marginBottom: 60 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text type="h5" style={{ marginBottom: 5 }}>
                Processing
              </Text>
              <View
                style={{
                  transform: [{ rotate: '270deg' }],
                  marginLeft: 10,
                  marginTop: -3,
                }}
              >
                <AnimatedCircularProgress
                  size={16}
                  width={8}
                  fill={100}
                  backgroundColor={theme.colors.secondary}
                  tintColor="#fff"
                  duration={5000}
                />
              </View>
            </View>

            <Text type="subTitle2">Sending your booking...</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{ marginTop: 4 }}>
              <Text type="buttonSmall" style={{ color: theme.colors.primary }}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <StepProgress />
      </View>

      <View style={styles(theme).sectionContainer}>
        <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
          <View style={{ marginBottom: 15 }}>
            <Text type="body4">{fromTo[bookingCategory]}</Text>
          </View>

          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
          >
            <Text type="body3"> {i18next.t('PAYMENTORDER_TOTAL')}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <PaymentIcon />
              <Text type="body4">{`฿${totalPrice
                .toFixed(2)
                .toLocaleString('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                })}`}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: theme.colors.grey5,
            height: 0.5,
            marginHorizontal: 10,
          }}
        />

        <View
          style={{ paddingTop: 20, paddingHorizontal: 15, paddingBottom: 5 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <View style={{ marginRight: 20 }}>
              <Text type="body4">1x</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text type="body4">{fromTo[bookingCategory]}</Text>
              <Text type="body3">{`฿${consultationPrice
                .toFixed(2)
                .toLocaleString('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                })}`}</Text>
            </View>
          </View>

          {bookingData?.prescription && (
            <View>
              {bookingData?.prescription?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: 15,
                  }}
                >
                  <View style={{ marginRight: 20 }}>
                    <Text type="body4">{`${item.amount}x`}</Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text type="body4">{`${item.tradeName} (${item.activeIngredient}) ${item.strength} ${item.dosageForm}`}</Text>
                    </View>
                    {item.unitPriceCents && (
                      <Text type="body3" style={{ paddingLeft: 10 }}>
                        {item.unitPriceCents &&
                        item.unitPriceCents !== undefined
                          ? `฿${((item.unitPriceCents * item.amount) / 100)
                              ?.toFixed(2)
                              .toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB',
                              })}`
                          : `฿0.00`}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <View style={{ marginRight: 20 }}>
              <Text type="body4">1x</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text type="body4">{i18next.t('PAYMENTORDER_SHIPPING')}</Text>
              <Text type="body3">{`฿${shippingPrice
                .toFixed(2)
                .toLocaleString('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                })}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentLoading;
