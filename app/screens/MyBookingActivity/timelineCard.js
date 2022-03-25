import React, { useState, useEffect } from 'react';
import { View, TouchableHighlight, Dimensions } from 'react-native';
import _ from 'lodash';
import { Text, StarRating } from '@components';
import LocationIcon from '@assets/images/location.png';
import { getImage } from '@utils/uploadImageHelper';
import { BaseColor } from '@config';

import everNormal from './images/1_EVER_Normal.png';
import everPress from './images/1_EVER_Press.png';

import doctorNormal from './images/2_Doctor_Normal.png';
import doctorPress from './images/2_Doctor_Press.png';

import drugNormal from './images/3_Drug_Normal.png';
import drugPress from './images/3_Drug_Press.png';

import deliveryNormal from './images/4_Delivery_Normal.png';
import deliveryPress from './images/4_Delivery_Press.png';

import styles, {
  Card,
  ProfileImage,
  LeftCard,
  Tag,
  Image,
  TagText,
} from './style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

const TimelineCard = ({ doctorDone, telePharmaDone, doctorNotePending }) => {
  const [timelineState, setTimeline] = useState([
    {
      name: 'consultDoctor',
      icon: everPress,
      active: everPress,
      done: true,
    },
    {
      name: 'doctorPrescribe',
      icon: doctorNormal,
      active: doctorPress,
      done: doctorNotePending,
    },
    {
      name: 'consultPharmacist',
      icon: drugNormal,
      active: drugPress,
      done: false,
    },
    {
      name: 'homeDelivery',
      icon: deliveryNormal,
      active: deliveryPress,
      done: false,
    },
  ]);

  const timelineComponent = (doctorDone, pharmacyDone, deliveryOtw) => {
    let index;
    let doctorLogicCheck =
      (doctorDone && index == 1) ||
      (doctorDone && index == 2) ||
      (deliveryOtw && index == 3);
    let pharmaLogicCheck = telePharmaDone;

    return timelineState.map((timelineObject, index) => {
      return (
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          key={index}
        >
          {index === 0 ? (
            <View />
          ) : (
            <View
              style={{
                backgroundColor:
                  doctorLogicCheck || telePharmaDone ? '#1188bb' : '#5d5d5d',
                height: 4,
                width: viewportWidth / 5.5,
                marginHorizontal: 2,
                borderRadius: 50,
              }}
            />
          )}
          <View
            key={timelineObject.index}
            style={{
              backgroundColor: 'white',
              height: 25,
              width: 25,
              justifyContent: 'center',
            }}
          >
            {timelineObject.done ? (
              <Image
                resizeMode="contain"
                style={{ height: 25, width: 25, alignItems: 'center' }}
                source={timelineObject.active}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={{ height: 25, width: 25, alignItems: 'center' }}
                source={timelineObject.icon}
              />
            )}
          </View>
        </View>
      );
    });
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
      {timelineComponent(doctorDone)}
    </View>
  );
};

export default TimelineCard;
