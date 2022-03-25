import React from 'react';
import { View, FlatList, Text, SectionList } from 'react-native';
import { BookingTabHospital } from '@components';
import styles from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

function BookingTab(props) {
  const { navigation, bookings, bookingPast, isFocused , treatmentStatus} = props;
  let data;

  let bookingAll = [];
  let bookingHistory = [];

  const bookingReverseDate = bookings.reverse();
  if (bookingAll && bookingHistory) {
    data = [
      {
        title: 'กำลังดำเนินการ',
        data: [...bookingReverseDate],
      },
      {
        title: 'อยู่ในการดูแล',
        data: [],
      },
      {
        title: 'ประวัติ',
        data: [...bookingPast],
      },
    ];
  }

  const handlePressItem = React.useCallback(
    item => () => {
      navigation.navigate('MyBookingActivity', {
        bookingId: item.item.bookingId,
      });
    },
    [navigation],
  );

  return (
    <>
      {bookings && bookingHistory && (
        <SectionList
          lazy
          stickySectionHeadersEnabled={true}
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={item => (
            <BookingTabHospital
              // key={index}
              style={[styles.item]}
              bookingItem={item}
              onPress={handlePressItem(item)}
            />
          )}
          renderSectionHeader={({ index, section: { title } }) => (
            <>
                <View
                  style={{
                    paddingLeft: 15,
                    backgroundColor: 'white',
                    paddingTop: 15,
                    paddingBottom: 8,
                  }}
                >
              <Text bold style={{ fontSize: 16, fontWeight: 'bold' }}>
                {title}
              </Text>
            </View>
            {title === 'อยู่ในการดูแล' ?  <View>{treatmentStatus}</View>: null }

            </>
          )}
        />
      )}
    </>
  );
}

export default BookingTab;
