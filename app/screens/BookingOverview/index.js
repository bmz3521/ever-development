import React, { useCallback, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { useTheme } from 'react-native-elements';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  StarRating,
} from '@components';
import { getTimeText } from '@utils/shared';
import useStyles from './styles';
import useHooks from './hooks';

function BookingOverview({ navigation, route }) {
  const baseStyles = useStyles();
  const { theme } = useTheme();
  const { clinic, clinicPackage, quotation, inquiry, actions, type } = useHooks(
    {
      navigation,
      route,
    },
  );

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text="Booking Overview"
        // subText={type=='procedure' ? clinic.name : clinicPackage.name}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: BaseColor.whiteColor }}>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <View style={baseStyles.row}>
              <View style={baseStyles.leftView}>
                <Text type="body1" style={{ marginBottom: 5 }}>
                  {type == 'procedure' ? clinic.name : clinicPackage.name}
                </Text>
                <StarRating
                  disabled={true}
                  starSize={10}
                  maxStars={5}
                  rating={parseFloat(clinic.clinicRating)}
                  fullStarColor={BaseColor.accentColor}
                />
                <Text type="body2" style={{ marginVertical: 10 }}>
                  {clinic.address}
                </Text>
              </View>
              <View style={baseStyles.rightView}>
                <Image
                  style={baseStyles.image}
                  source={{
                    uri:
                      type == 'procedure'
                        ? clinic.featureImageM
                        : clinicPackage.packagePhotos[0],
                  }}
                />
              </View>
            </View>
          </View>
          <View style={baseStyles.blockView}>
            <View style={baseStyles.row}>
              <View style={baseStyles.centerView}>
                <Text type="body2" style={{ marginBottom: 5 }}>
                  From
                </Text>
                <Text type="body2">{getTimeText(quotation.startTime)}</Text>
              </View>
              <View style={baseStyles.centerView}>
                <Icon name="long-arrow-alt-right" size={24} solid />
              </View>
              <View style={baseStyles.centerView}>
                <Text type="body2" style={{ marginBottom: 5 }}>
                  To
                </Text>
                <Text type="body2">{getTimeText(quotation.endTime)}</Text>
              </View>
            </View>
          </View>

          {type == 'procedure' && (
            <View style={baseStyles.blockView}>
              <Text type="body1">Procedures</Text>
              {quotation?.procedures?.map((procedure, index) => (
                <View style={baseStyles.row} key={index.toString()}>
                  <View style={baseStyles.leftView}>
                    <Text body2>{procedure.name}</Text>
                  </View>
                  <View style={baseStyles.rightView}>
                    <Text type="body2">({procedure.price})</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={baseStyles.blockView}>
            <Text type="body1" style={{ marginBottom: 10 }}>
              Information
            </Text>
            <View style={baseStyles.row}>
              <View style={baseStyles.leftView}>
                <Text type="body2">Name</Text>
              </View>
              <View style={baseStyles.rightView}>
                <Text type="body2">{`${inquiry.firstName} ${inquiry.lastName}`}</Text>
              </View>
            </View>
            <View style={baseStyles.row}>
              <View style={baseStyles.leftView}>
                <Text type="body2">Email</Text>
              </View>
              <View style={baseStyles.rightView}>
                <Text type="body2">{inquiry.email}</Text>
              </View>
            </View>
            <View style={baseStyles.row}>
              <View style={baseStyles.leftView}>
                <Text type="body2">Message</Text>
              </View>
              <View style={baseStyles.rightView}>
                <Text type="body2" style={{ textAlign: 'left' }}>
                  {inquiry.message}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[baseStyles.resultContainer]}>
        <View style={baseStyles.row}>
          <View style={baseStyles.centerView}>
            <Text style={{ color: theme.colors.primary }}>
              {quotation.totalPrice}
            </Text>
          </View>
        </View>
        <View style={baseStyles.row}>
          <View style={baseStyles.centerView}>
            <Text type="body1">{getTimeText(quotation.startTime)}</Text>
          </View>
          <View style={baseStyles.centerView}>
            <Icon name="long-arrow-alt-right" size={24} solid />
          </View>
          <View style={baseStyles.centerView}>
            <Text type="body1">{getTimeText(quotation.endTime)}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          baseStyles.bottomBtn,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
        // onPress={
        //   type == 'procedure' ? actions.onBookNow : actions.onBookPackage
        // }
        onPress={actions.onBookOMA}
      >
        <Text type="buttonLarge" style={baseStyles.bottomBtnText}>
          {'Booking Now'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default BookingOverview;
