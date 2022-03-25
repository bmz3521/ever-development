import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { Images } from '@config';
import { useTheme, Avatar, Text } from 'react-native-elements';

const DoctorCard = props => {
  const { bookingCategory, practitioner = null, children } = props;
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        marginHorizontal: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <View style={{ margin: 5 }}>
          <Avatar
            source={
              bookingCategory === `telemed` && practitioner
                ? practitioner.photos.length > 0
                  ? {
                      uri: practitioner.photos.find(
                        x => x.category === 'avatar',
                      ).imageUrl,
                    }
                  : Images.DoctorIcon
                : Images.DoctorIcon
            }
            containerStyle={{
              backgroundColor: theme.colors.grey4,
            }}
            size="medium"
            rounded
          />
        </View>
        <View style={{ padding: 5, flex: 1 }}>
          <View>
            <Text
              style={{
                fontSize: theme.fontSizeDefault,
                fontFamily: theme.fontFamilyDefault,
                color: theme.colors.primary,
              }}
            >
              {[`covid`, `general`].includes(bookingCategory)
                ? `พบแพทย์แบบไม่ระบุแพทย์`
                : bookingCategory === `telemed` && practitioner
                ? `${practitioner.title} ${practitioner.firstName} ${practitioner.lastName}`
                : ``}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: theme.fontFamilyDefault,
                fontSize: theme.fontSizeSmaller,
                color: theme.colors.grey3,
              }}
              numberOfLines={2}
            >
              {bookingCategory === `covid`
                ? `COVID-19`
                : bookingCategory === `general`
                ? `อายุรกรรมทั่วไป`
                : bookingCategory === `telemed` && practitioner
                ? practitioner.bio
                : ``}
            </Text>
          </View>
        </View>
      </View>
      {children}
    </View>
  );
};

export default DoctorCard;
