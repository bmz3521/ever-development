import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from '@components';
import { useSelector } from 'react-redux';
import {
  Text,
  Icon,
  Avatar,
  Divider,
  Badge,
  Button,
} from 'react-native-elements';
import { Header } from '@components';
import Loading from '@components/Loading';
import _, { size } from 'lodash';
import { BaseStyle, BaseColor } from '@config';
import { Container, TopCard, Card, Row } from './style';
import { ScrollView } from 'react-native-gesture-handler';

const PackageConsult = ({ route, navigation }) => {
  const telemedicine = useSelector(state => state.telemedicine);
  const { doctor } = route.params;
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(false);
  });
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text="รายละเอียดการนัดหมาย"
        subText="เลขที่การนัดหมาย - 14SKMB878SNFK"
        onPressLeft={() => navigation.goBack()}
        // placement="left"
        // backgroundColor="#2aa275"
        // leftComponent={{
        //   icon: 'chevron-left',
        //   color: '#fff',
        //   onPress: () => navigation.goBack(),
        // }}
        // leftContainerStyle={{
        //   justifyContent: 'center',
        // }}
        // centerComponent={
        //   <View
        //     style={{
        //       justifyContent: 'center',
        //     }}
        //   >
        //     <Text
        //       style={{
        //         fontSize: 22,
        //         color: 'white',
        //         fontFamily: 'Prompt-Regular',
        //       }}
        //     >
        //       {`รายละเอียดการนัดหมาย`}
        //     </Text>
        //     <Text
        //       style={{
        //         fontSize: 12,
        //         color: '#dcdcdc',
        //         fontFamily: 'Prompt-LightItalic',
        //       }}
        //     >
        //       {`เลขที่การนัดหมาย - 14SKMB878SNFK`}
        //     </Text>
        //   </View>
        // }
      />
      {/* <Loading isVisible={loading} /> */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 20,
            paddingTop: 10,
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: '#2aa275',
                  fontFamily: 'Prompt-Bold',
                }}
              >
                {'ข้อมูลแพทย์'}
              </Text>
            </View>
            <View>
              <Divider orientation="horizontal" width={1} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#f5f5f5',
                marginVertical: 5,
                borderRadius: 5,
              }}
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
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                color: '#2aa275',
                fontFamily: 'Prompt-Bold',
              }}
            >
              {'ข้อมูลการนัดหมาย'}
            </Text>
          </View>
          <View>
            <Divider orientation="horizontal" width={1} />
          </View>
          <View style={{ marginVertical: 5, marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00bae5',
                    fontFamily: 'Prompt-Bold',
                  }}
                >
                  {'Date & Time'}
                </Text>
              </View>
              <View
                style={{
                  flex: 7,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#696969',
                    fontFamily: 'Prompt-Regular',
                  }}
                >
                  {'26 June 2021 - 16:00 PM'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00bae5',
                    fontFamily: 'Prompt-Bold',
                  }}
                >
                  {'Name'}
                </Text>
              </View>
              <View
                style={{
                  flex: 7,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#696969',
                    fontFamily: 'Prompt-Regular',
                  }}
                >
                  {'Tony Stark'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00bae5',
                    fontFamily: 'Prompt-Bold',
                  }}
                >
                  {'Email'}
                </Text>
              </View>
              <View
                style={{
                  flex: 7,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#696969',
                    fontFamily: 'Prompt-Regular',
                  }}
                >
                  {'ts_mail@gmail.com'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00bae5',
                    fontFamily: 'Prompt-Bold',
                  }}
                >
                  {'Phone'}
                </Text>
              </View>
              <View
                style={{
                  flex: 7,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#696969',
                    fontFamily: 'Prompt-Regular',
                  }}
                >
                  {'095-882-3344'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00bae5',
                    fontFamily: 'Prompt-Bold',
                  }}
                >
                  {'Line ID'}
                </Text>
              </View>
              <View
                style={{
                  flex: 7,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#696969',
                    fontFamily: 'Prompt-Regular',
                  }}
                >
                  {'leiissc'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopColor: '#f5f5f5',
          borderTopWidth: 3,
        }}
      >
        <Button
          type="solid"
          title="PAYMENT"
          buttonStyle={{
            backgroundColor: '#00bae5',
            borderColor: '#fff',
            borderWidth: 1,
          }}
          titleStyle={{ fontFamily: 'Prompt-Regular' }}
          onPress={() => console.log('GO TO PAYMENT')}
        />
      </View>
    </SafeAreaView>
  );
};

export default PackageConsult;
