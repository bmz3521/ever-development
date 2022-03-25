import React from 'react';
import { View, FlatList, Text, SectionList } from 'react-native';
import { BookingTabHospital } from '@components';
import styles from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

function BookingTab(props) {
  const {
    navigation,
    bookings,
    bookingsUpcoming,
    bookingsCompleted,
    bookingsToday,
  } = props;

  const handlePressItem = React.useCallback(
    item => () => {
      navigation.navigate('MyBookingActivity', { bookingId: item.bookingId });
    },
    [navigation],
  );

  return (
    <>
      <View style={[styles.content]}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          วันนี้
        </Text>
        <View style={styles.autocompleteContainer}>
          {bookingsToday.map(booking => (
            <BookingTabHospital
              style={[styles.item]}
              booking={booking}
              onPress={handlePressItem(booking)}
            />
          ))}
        </View>
      </View>
      <View style={[styles.content]}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          ล่าสุด
        </Text>
        <View style={styles.autocompleteContainer}>
          {bookingsUpcoming.map(booking => (
            <BookingTabHospital
              style={[styles.item]}
              booking={booking}
              onPress={handlePressItem(booking)}
            />
          ))}
        </View>
      </View>
      <View style={[styles.content]}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          ก่อนหน้านี้
        </Text>
        <View style={styles.autocompleteContainer}>
          {bookingsCompleted.map(booking => (
            <BookingTabHospital
              style={[styles.item]}
              booking={booking}
              onPress={handlePressItem(booking)}
            />
          ))}
        </View>
      </View>
    </>
  );
}

export default BookingTab;
