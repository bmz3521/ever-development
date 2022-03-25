import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from '@components';
import { Header, Text, Avatar, Badge, Icon } from 'react-native-elements';
import { BaseStyle, BaseColor } from '@config';
import axios from 'axios';
import _ from 'lodash';
import Loading from './loading';
import config from '@_config';
import { useSelector, useDispatch } from 'react-redux';
import { TelemedicineActions } from 'app/actions';

const TeleDoctor = ({ route, navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { doctorType } = route.params;

  useEffect(() => {
    fetchDoctorList();
  }, []);
  //?filter[organizationId]=${organizationId}
  const fetchDoctorList = async () => {
    setLoading(true);
    await axios
      .get(`${config.VA_API_URL}/DoctorTypes/${doctorType.id}/appUsers`)
      .then(response => {
        setDoctors(response.data.slice(0, 10));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(setLoading(false));
  };

  const handlePressDoctorCard = async doctor => {
    try {
      await dispatch(TelemedicineActions.setTelemedicine(doctor));
    } catch (error) {
      console.log(error);
    } finally {
      navigation.navigate('TeleDoctorProfile', {
        practitionerType: doctorType,
        practitioner: doctor,
      });
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <StatusBar />
      <Header
        placement="left"
        backgroundColor="#2aa275"
        leftComponent={{
          icon: 'chevron-left',
          color: '#fff',
          onPress: () => navigation.goBack(),
        }}
        leftContainerStyle={{
          justifyContent: 'center',
        }}
        centerComponent={
          <View
            style={{
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontFamily: 'Prompt-Regular',
              }}
            >
              {'รายชื่อแพทย์'}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#dcdcdc',
                fontFamily: 'Prompt-LightItalic',
              }}
            >
              {doctorType.name}
            </Text>
          </View>
        }
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#CCC',
          borderRadius: 5,
          margin: 15,
        }}
      >
        <Icon
          name="search"
          color="#8d8d8d"
          solid
          size={20}
          style={{ padding: 10 }}
        />
        <TextInput
          style={{
            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 0,
            color: '#424242',
            fontFamily: 'Prompt-Regular',
          }}
          onChangeText={text => setSearchText(text)}
          placeholder="ค้นหาแพทย์"
          placeholderTextColor={BaseColor.grayColor}
          value={searchText}
        />
      </View>
      {loading ? (
        <Loading></Loading>
      ) : (
        <ScrollView>
          {doctors.map((doctor, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor: '#f5f5f5',
                marginVertical: 5,
                marginHorizontal: 15,
                borderRadius: 5,
              }}
              onPress={() => handlePressDoctorCard(doctor)}
            >
              <View style={{ padding: 10 }}>
                <View>
                  <Avatar
                    {...(doctor.profileImage
                      ? {
                          source: {
                            ...{
                              uri: `${
                                doctor.profileImage
                              }?random_number=${new Date().getTime()}`,
                            },
                          },
                        }
                      : {
                          title: doctor.fullname.substring(0, 1).toUpperCase(),
                        })}
                    containerStyle={{
                      backgroundColor: '#c0c0c0',
                    }}
                    size="medium"
                    rounded
                  />
                  <Badge
                    status={'success'}
                    containerStyle={{
                      position: 'absolute',
                      top: -1,
                      right: -1,
                    }}
                    badgeStyle={{ width: 12, height: 12, borderRadius: 100 }}
                  />
                </View>
              </View>
              <View style={{ flex: 5, padding: 5 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 3,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#696969',
                      fontFamily: 'Prompt-Regular',
                    }}
                  >
                    {doctor.fullname}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    flexWrap: 'wrap',
                    marginTop: 5,
                  }}
                >
                  <Badge
                    value="Infection Disease"
                    badgeStyle={{ backgroundColor: '#2aa275', borderRadius: 5 }}
                    textStyle={{ fontFamily: 'Prompt-Medium' }}
                    containerStyle={{ margin: 2 }}
                  />
                  <Badge
                    value="Internal Medicine"
                    badgeStyle={{ backgroundColor: '#2aa275', borderRadius: 5 }}
                    textStyle={{ fontFamily: 'Prompt-Medium' }}
                    containerStyle={{ margin: 2 }}
                  />
                  <Badge
                    value="CP"
                    badgeStyle={{ backgroundColor: '#2aa275', borderRadius: 5 }}
                    textStyle={{ fontFamily: 'Prompt-Medium' }}
                    containerStyle={{ margin: 2 }}
                  />
                </View>
                <View style={{ flexDirection: 'row', padding: 3 }}>
                  <Icon
                    type="ionicon"
                    name="location-outline"
                    size={20}
                    color="#00bae5"
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#696969',
                      fontFamily: 'Prompt-Regular',
                      marginLeft: 3,
                    }}
                  >
                    {'Bangkok Hospital'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 3 }}>
                  <Icon
                    type="ionicon"
                    name="school-outline"
                    size={20}
                    color="#00bae5"
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#696969',
                      fontFamily: 'Prompt-Regular',
                      marginLeft: 3,
                    }}
                  >
                    {'Burapha University'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Icon type="ionicon" name="star" size={20} color="#ffcd3c" />
                  <Text
                    style={{
                      fontSize: 24,
                      color: '#696969',
                      fontFamily: 'Prompt-Regular',
                      marginLeft: 3,
                    }}
                  >
                    {'4.5'}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#696969',
                      fontFamily: 'Prompt-Light',
                      marginLeft: 3,
                    }}
                  >
                    {'9,555'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#696969',
                      fontFamily: 'Prompt-Light',
                      marginLeft: 3,
                    }}
                  >
                    {'Reviews'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TeleDoctor;
