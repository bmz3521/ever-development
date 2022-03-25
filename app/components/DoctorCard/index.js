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
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          padding: 10,
        }}
      >
        <View style={{ margin: 10 }}>
          <Avatar
            source={
              practitioner
                ? practitioner?.imageUrl
                  ? {
                      uri: practitioner?.imageUrl,
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
              {practitioner
                ? `${practitioner.title ? practitioner.title : ''}${
                    practitioner.firstName
                  } ${practitioner.lastName}`
                : `ปรึกษาแพทย์แบบสุ่ม`}
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
              {practitioner
                ? practitioner.bio
                : bookingCategory === `covid`
                ? `COVID-19`
                : bookingCategory === `general`
                ? `อายุรกรรมทั่วไป`
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
