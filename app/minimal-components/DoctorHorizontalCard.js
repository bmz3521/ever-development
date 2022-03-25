import React from 'react';

//import styles and assets
import styled from 'styled-components';
import colors from '../config/colors';
import * as Typography from '../config/Typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserAvatar from 'react-native-user-avatar';
import { Image as Images } from '@components';

import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  ReviewItem,
  Button,
} from '@components';

import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const DoctorHorizontalCard = ({ navigation, doctorList, clinic }) => {
  let status = 'online';

  return (
    <View
      style={{
        height: 220,
        marginLeft: -20,
        marginRight: -20,
      }}
    >
      <ScrollView
        // contentContainerStyle={{marginLeft: -20, marginRight: -20}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {doctorList.map((review, i) => (
          <Card
            key={review.id}
            style={[
              i === 0 ? { marginLeft: 20 } : { marginLeft: 0 },
              {
                borderWidth: 1,
                borderColor: '#CCCCCC',
                borderRadius: 10,
                padding: 20,
                height: 195,
                width: 350,
                marginRight: 20,
                flex: 'column',
                flex: 2,
              },
            ]}
          >
            <LeftCard>
              {/* <ProfileImage
      source={{
        uri: getImage(_.get(data, 'profileImage')),
      }}
    /> */}
            </LeftCard>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text bold numberOfLines={1} style={{ marginTop: 0 }}>
                  {/* {_.get(data, 'fullname')} */} Dr Tadadaew
                </Text>
                <Text body2 bold>
                  {/* $500 */}
                </Text>
              </View>
              <View style={[styles.reviewView]}>
                <StarRating
                  disabled={true}
                  starSize={16}
                  maxStars={5}
                  rating={5}
                  selectedStar={() => {}}
                  fullStarColor="green"
                />
                <Text style={styles.reviewCount}>119</Text>
              </View>

              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                {/* <Image source={LocationIcon} /> */}
                {status == 'online' ? (
                  <View>
                    <Text style={styles.textOnline}>{status}</Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.textOffline}>{status}</Text>
                  </View>
                )}
                <Text
                  caption1
                  numberOfLines={1}
                  style={{ flex: 1, color: '#A5A4A4' }}
                >
                  แผนกเวชปฏิบัติ
                </Text>
              </View>

              <View style={{ marginTop: 8, flexDirection: 'row' }}>
                {/* <Image source={LocationIcon} /> */}
                <Text
                  caption1
                  numberOfLines={1}
                  style={{ flex: 1, color: '#000000' }}
                >
                  คณะแพทยศาสตร
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  flexWrap: 'wrap',
                  marginTop: 10,
                }}
              >
                <Tag>
                  <TagText>Infection Disease</TagText>
                </Tag>
                <Tag>
                  <TagText>Diabetes</TagText>
                </Tag>
                <Tag>
                  <TagText>Disorder Treat..</TagText>
                </Tag>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default DoctorHorizontalCard;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Card = styled.View`
  border-width: 1;
  border-color: #cccccc;
  border-radius: 10;
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: row;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const LeftCard = styled.View`
  margin-right: 2px;
  margin-left: 2px;
  align-items: flex-start;
  width: 70px;
`;

const ProfileImage = styled(Images)`
  width: 50px;
  height: 50px;
  border-radius: 35px;
`;

const Image = styled(Images)`
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;

const Tag = styled.View`
  background-color: #eaeaea;
  align-self: flex-start;
  padding-vertical: 5px;
  padding-horizontal: 10px;
  border-radius: 30px;
  margin: 3px;
  font-size: 10px;
`;

const TagText = styled.Text`
  font-size: 10px;
`;

const styles = StyleSheet.create({
  reviewView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  reviewCount: {
    paddingHorizontal: 5,
  },
  reviewBlockView: {
    flexDirection: 'column',
    paddingVertical: 20,
  },
  reviewHeaderView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  reviewTitleView: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  contentButtonBottom: {
    marginTop: 10,
  },
  textHeight: {
    marginTop: 10,
    lineHeight: 25,
  },
  subtitleMargin: {
    marginTop: 10,
    marginBottom: 10,
  },
  showOrReadMoreMP: {
    color: '#284F30',
    marginBottom: 15,
    paddingRight: 10,
  },
});
