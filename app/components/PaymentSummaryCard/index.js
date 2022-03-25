import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme, Avatar } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import i18next from 'i18next';
import { Images } from '@config';
import PropTypes from 'prop-types';

const PaymentSummaryCard = props => {
  const {
    bookingCategory = null,
    consultationPrice = 0,
    bookingData = null,
    // totalPrice = 0,
    shippingPrice = 0,
    suggestionList = [
      { title: i18next.t('SELECT_PAYMENT_METHOD_CASH'), id: 1 },
      { title: i18next.t('SELECT_PAYMENT_METHOD_DEBIT'), id: 2 },
      { title: i18next.t('SELECT_PAYMENT_METHOD_INTERNET'), id: 3 },
    ],
  } = props;
  const { theme } = useTheme();

  const [drugPriceTotal, setDrugPriceTotal] = useState(0);

  useEffect(() => {
    let drugPriceTotal = 0;

    bookingData?.prescription?.map(item => {
      if (item.unitPriceCents && item.unitPriceCents !== undefined) {
        return (drugPriceTotal += (item.unitPriceCents * item.amount) / 100);
      }
      return;
    });

    setDrugPriceTotal(drugPriceTotal);
  }, []);

  const orderPrice = drugPriceTotal + consultationPrice;

  const renderIconService = ({ item, index }) => {
    return (
      <View key={index} style={styles(theme).suggestionCard}>
        <View style={styles(theme).DrugListCarousel}>
          <View>
            <Avatar
              source={Images.DoctorIcon}
              containerStyle={{
                backgroundColor: theme.colors.grey4,
              }}
              size="medium"
              rounded
            />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyBold,
                },
              ]}
            >
              {`Paracetamol \n250mg`}
            </Text>
            <Text style={styles(theme).suggestionPriceText}>
              {i18next.t('TELEPAYMENT_FREE')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles(theme).sectionContainer}>
      <View style={styles(theme).ViewRow}>
        <Text style={styles(theme).titleText}>
          {i18next.t('PAYMENTORDER_ORDERSUMMARY')}
        </Text>
        {/* <TouchableOpacity>
          <Text
            style={[
              styles(theme).titleText,
              {
                fontSize: theme.fontSizeSmallest,
                fontFamily: theme.fontFamilyDefault,
                color: theme.colors.secondary,
              },
            ]}
          >
            เพิ่มรายการ
          </Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles(theme).sectionOrder}>
        <View style={styles(theme).threeColRow}>
          <View style={styles(theme).OrderList}>
            <View style={styles(theme).Quantity}>
              <Text style={styles(theme).QuantityText}>1x</Text>
            </View>
            <View style={styles(theme).listName}>
              <Text style={styles(theme).listText}>{bookingCategory}</Text>
            </View>
          </View>

          <View style={styles(theme).priceWrapper}>
            <Text style={styles(theme).priceText}>
              {consultationPrice === 0
                ? i18next.t('TELEPAYMENT_FREE')
                : `฿${consultationPrice.toFixed(2).toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB',
                  })}`}
            </Text>
          </View>
        </View>
      </View>

      {bookingData?.prescription && (
        <>
          <View style={styles(theme).prescriptionSection}>
            {bookingData?.prescription?.map((item, index) => (
              <View key={index} style={styles(theme).rowSection}>
                <View style={styles(theme).Quantity}>
                  <Text style={styles(theme).QuantityText}>
                    {`${item.amount}x`}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles(theme).drugName}>
                    {`${item.tradeName} (${item.activeIngredient}) ${item.strength} ${item.dosageForm}`}
                  </Text>
                  <Text style={styles(theme).drugEvent}>
                    {item.drugTimeEvent?.nameTh}
                  </Text>
                </View>
                {item.unitPriceCents && (
                  <View>
                    <Text style={styles(theme).drugPrice}>
                      {item.unitPriceCents && item.unitPriceCents !== undefined
                        ? `฿${((item.unitPriceCents * item.amount) / 100)
                            ?.toFixed(2)
                            .toLocaleString('th-TH', {
                              style: 'currency',
                              currency: 'THB',
                            })}`
                        : `฿0.00`}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
          <View style={{ paddingHorizontal: 5, paddingTop: 10 }}>
            <Text style={styles(theme).helperText}>
              ราคาและจำนวนยาอาจจะมีการเปลี่ยนแปลงได้ตามการปรึกษากับเภสัชกร
            </Text>
          </View>
        </>
      )}

      <View style={styles(theme).divider} />

      <View style={styles(theme).ViewSections}>
        <View style={styles(theme).ViewRow}>
          <Text style={styles(theme).titleText}>
            {i18next.t('PAYMENTORDER_TOTAL')}
          </Text>
          <Text style={styles(theme).titleText}>
            {orderPrice === 0
              ? i18next.t('TELEPAYMENT_FREE')
              : `฿${orderPrice.toFixed(2).toLocaleString('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                })}`}
          </Text>
        </View>

        <View style={styles(theme).ViewRow}>
          <Text style={styles(theme).titleText}>
            {i18next.t('PAYMENTORDER_SHIPPING')}
          </Text>
          <Text
            style={[
              styles(theme).titleText,
              {
                fontSize: theme.fontSizeSmall,
                fontFamily: theme.fontFamilyDefault,
              },
            ]}
          >
            {shippingPrice === 0
              ? i18next.t('TELEPAYMENT_FREE')
              : `฿${shippingPrice.toFixed(2).toLocaleString('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                })}`}
          </Text>
        </View>
      </View>

      {/* {bookingCategory === 'general' ||
        (bookingCategory !== 'telemed' &&
          bookingCategory !== 'procedure' &&
          bookingCategory !== 'clinicPackage' &&
          bookingCategory !== 'covid' && (
            <>
              <View style={styles(theme).divider} />

              <Text style={styles(theme).titleTextSuggest}>
                {i18next.t('PAYMENTORDER_SUGGEST')}
              </Text>
              <FlatList
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
                data={suggestionList}
                renderItem={renderIconService}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
                onEndReachedThreshold={0.1}
              />
            </>
          ))} */}
    </View>
  );
};

PaymentSummaryCard.propTypes = {
  bookingCategory: PropTypes.string,
  consultationPrice: PropTypes.number,
  bookingData: PropTypes.object,
  totalPrice: PropTypes.number,
  shippingPrice: PropTypes.number,
  suggestionList: PropTypes.array,
};

export default PaymentSummaryCard;
