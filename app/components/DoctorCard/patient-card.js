import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import { Text, Icon } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import LocationIcon from '@assets/images/location.png';
import MedicalSchoolIcon from '@assets/images/medical-school.png';
import LikeIcon from '@assets/images/like.png';
import { getImage } from '@utils/uploadImageHelper';

import { Card, ProfileImage, LeftCard, Tag, Image, TopCard } from './style';

import styles from './style';

const PatientCard = ({ data, handle, status }) => {
  console.log('dataUser', data);
  return (
    <TouchableHighlight
      underlayColor="transparent"
      disabled={true}
      onPress={() => handle({ ...data, price: 500 })}
    >
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <View>
          <ProfileImage style={styles.userAva} source={Images.avata2} />
        </View>
        <View style={styles.userProfile}>
          <View style={styles.wrapName}>
            <Text title3 bold style={styles.userName}>
              {data &&
                data.data &&
                data.data.userInformation &&
                data.data.userInformation.firstname}
              {_.get(data.userInformation, 'firstname')}
            </Text>
          </View>
          <View style={styles.wrapNotice}>
            <Text style={styles.userNotice}>
              ข้อมูลของคุณจะถูกบันทึกและใช้ในการรักษา
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default PatientCard;
