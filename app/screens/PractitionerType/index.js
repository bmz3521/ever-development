import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import Loading from '@components/Loading';
import { SafeAreaView, Icon, Text } from '@components';
import { Card, useTheme } from 'react-native-elements';
import { BaseStyle, BaseColor, Images } from '@config';
import _ from 'lodash';
import { Header } from '@components';
import i18next from 'i18next';
import { useHooks } from './hook';

const PractitionerType = ({ navigation }) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();
  const {
    doctorTypes,
    loading,
    isShowAll,
    isPractitionersLoading,
    handleShowAll,
  } = useHooks();

  const optionsFilter = _.filter(doctorTypes, o => {
    return _.includes(_.lowerCase(o.name), _.lowerCase(searchText));
  });

  const [iconsSpecialities, setIcon] = useState([
    {
      icon: Images.Dental,
      name: i18next.t('PRACTYPE_DENTAL'),
      route: 'HealthActivity',
      notAuthenticated: 'SignIn',
    },
    {
      icon: Images.Orthopedic,
      name: i18next.t('PRACTYPE_ORTHOPEDICS'),
      route: 'News',
      notAuthenticated: 'News',
    },
    {
      icon: Images.NCD,
      name: i18next.t('PRACTYPE_NCD'),
      route: 'ItemFilterScreen',
      notAuthenticated: 'SignIn',
    },
    {
      icon: Images.Pediatric,
      name: i18next.t('PRACTYPE_PEDIATRIC'),
      route: 'Profile',
      notAuthenticated: 'SignIn',
    },
    // { icon: Images.homeicon5, name: 'Allergy', route: 'Allergy' },
    {
      icon: Images.Reproductive,
      name: i18next.t('PRACTYPE_REPRODUCTIVE'),
      route: 'TelePharmacist',
      notAuthenticated: 'SignIn',
    },
    {
      icon: Images.Psychologist,
      name: i18next.t('PRACTYPE_PHYSCO'),
      route: 'TeleSymptom',
      notAuthenticated: 'TeleSymptom',
    },
    // {
    //   icon: Images.homeicon7,
    //   name: 'Clinic',
    //   route: 'ItemFilterScreen',
    //   notAuthenticated: 'ItemFilterScreen',
    // },
    // {
    //   icon: Images.homeicon7,
    //   name: 'ClinicPackageProfile',
    //   route: 'ClinicPackageProfile',
    //   notAuthenticated: 'ClinicPackageProfile',
    // },
    // {
    //   icon: Images.homeicon7,
    //   name: 'chatbot',
    //   route: 'Chatbot',
    //   notAuthenticated: 'SignIn',
    // },
  ]);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <StatusBar />
      <Header
        text={i18next.t('PRACTYPE_CONSULT_PHYS')}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        scrollEventThrottle={8}
      >
        <Loading isVisible={loading} />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: 10,
          }}
        >
          {iconsSpecialities.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              style={{
                width: '33%',
                alignItems: 'center',
                marginBottom: 14,
                marginTop: 14,
              }}
            >
              <View>
                <Image
                  source={item.icon}
                  resizeMode={'contain'}
                  style={{ height: 50, width: 50, marginBottom: 10 }}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'Prompt-Regular',
                  color: '#696969',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
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
              placeholder={i18next.t('PRACTYPE_DEPARTMENT_VIEW')}
              placeholderTextColor={BaseColor.grayColor}
              value={searchText}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: 'Prompt-Regular',
                fontSize: 22,
                fontWeight: '400',
              }}
            >
              {i18next.t('PRACTYPE_DEPARTMENT_SELECT')}
            </Text>
            {isPractitionersLoading ? (
              <View style={{ paddingRight: 10, alignSelf: 'baseline' }}>
                <BallIndicator color={theme.colors.primary} size={18} />
              </View>
            ) : (
              <TouchableOpacity onPress={handleShowAll}>
                <Text type="subTitle3" style={{ color: theme.colors.primary }}>
                  {isShowAll ? `Show less` : `Show all`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ padding: 15, paddingTop: 10 }}>
            {optionsFilter.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                // style={styles.iconTopParent3}
                onPress={() =>
                  navigation.navigate('FilterListing', { doctorType: item })
                }
                style={{
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginVertical: 5,
                  shadowColor: theme.colors.shadows,
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.3,
                  elevation: 6,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 70,
                  }}
                >
                  <View
                    style={{
                      flex: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      borderRadius: 200,
                    }}
                  >
                    <Image
                      resizeMode={'contain'}
                      style={{ width: 50, height: 50 }}
                      source={item.icon}
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: 10,
                      flex: 10,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        marginBottom: 0,
                        color: 'black',
                        fontFamily: 'Prompt-Bold',
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: 20,
                    }}
                  >
                    <Icon name="chevron-right" size={20} color="#00bae5" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PractitionerType;
