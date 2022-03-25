/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  AppState,
  RefreshControl,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  LogBox,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Intercom, { IntercomEvents } from '@intercom/intercom-react-native';
import {
  NetworkError,
  Text,
  IntercomButton,
  ModalFirstTimeLanguage,
} from '@components';
import { getfirstTimeInstallLanguageSelect } from '@utils/asyncStorage';
import * as Utils from '@utils';
import { Images } from '@config';
import moment from 'moment';
import { useTheme, Avatar, Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getTwoLastestContent } from 'app/services/contentFeedService';
import _ from 'lodash';
import NetInfo from '@react-native-community/netinfo';
import i18next from 'i18next';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  cancelAnimation,
  FadeOutDown,
  FadeInUp,
  FadeInDown,
} from 'react-native-reanimated';
import config from '@_config';
import { SafeAreaView } from '@components';
import useHooks from './hooks';

export default function MedicalSearchPage({ navigation }) {
  const {
    filteredDataSource,
    filteredDataSourceCountry,
    countrySelected,
    procedureSelected,
    search,
    search2,
    showData,
    showData2,
    showNextStep,
    searchReducer,
    offset,
    width,
    borderValue,
    offset2,
    width2,
    borderValue2,
    actions,
  } = useHooks({ navigation });

  // const heightImageBanner = Utils.scaleWithPixel(140);
  // const [heightHeader, setHeightHeader] = React.useState(null);

  const { theme } = useTheme();

  const popularFilter = [
    { selectedCountry: 'Thailand', selectedProcedure: 'Knee Replacement', image: '' },
    { selectedCountry: 'Paris', selectedProcedure: 'Dental Crown', image: '' },
    { selectedCountry: 'Paris', selectedProcedure: 'Dental Crown', image: '' },
    { selectedCountry: 'Paris', selectedProcedure: 'Dental Crown', image: '' },
  ];

  const configAnimation = {
    duration: 30,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, {
        configAnimation,
      }),
      transform: [{ translateY: offset.value }],
      borderBottomLeftRadius: withSpring(borderValue.value, { duration: 5 }),
      borderBottomRightRadius: withSpring(borderValue.value, { duration: 5 }),
    };
  });

  const animatedStylesBottom = useAnimatedStyle(() => {
    return {
      width: withTiming(width2.value, {
        configAnimation,
      }),
      transform: [{ translateY: offset2.value }],
      borderTopLeftRadius: withSpring(borderValue2.value, { duration: 5 }),
      borderTopRightRadius: withSpring(borderValue2.value, { duration: 5 }),
    };
  });

  const ItemRecentSearch = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
        onPress={() => actions.setPreMadeOption(item)}
        style={{
          // flex: 1,
          height: 65,
          alignItems: 'center',
          marginHorizontal: 30,
          alignSelf: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <View
            style={{
              borderRadius: 8,
              height: 40,
              width: 40,
              backgroundColor: '#F2F2F2',
              marginRight: 16,
            }}
          ></View>
          <Text style={styles(theme).itemStyleTitle}>
            {item.selectedProcedure}
          </Text>
          <Text style={styles(theme).itemStyle}>
            {' - '} in {item.selectedCountry}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemViewPopular = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
        onPress={() => actions.setPreMadeOption(item)}
        style={{
          // flex: 1,
          height: 65,
          alignItems: 'center',
          marginHorizontal: 30,
          alignSelf: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <View
            style={{
              borderRadius: 8,
              height: 40,
              width: 40,
              backgroundColor: '#F2F2F2',
              marginRight: 16,
            }}
          ></View>
          <Text style={styles(theme).itemStyleTitle}>{item.selectedProcedure}</Text>
          <Text style={styles(theme).itemStyle}>
            {' - '} in {item.selectedCountry}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const CountryItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
        onPress={() => actions.setItemCountry(item)}
        style={{
          height: 75,
          alignItems: 'center',
          marginHorizontal: 30,
          alignSelf: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              borderRadius: 8,
              height: 40,
              width: 40,
              backgroundColor: '#F2F2F2',
              marginRight: 16,
            }}
          ></View>
          <Text style={styles.itemStyle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ProcedureItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
        onPress={() => actions.setItemProcedure(item)}
        style={{
          // flex: 1,
          height: 75,
          alignItems: 'center',
          marginHorizontal: 30,
          alignSelf: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            // flex: 1,
          }}
        >
          <View
            style={{
              borderRadius: 8,
              height: 40,
              width: 40,
              backgroundColor: '#F2F2F2',
              marginRight: 16,
            }}
          ></View>
          <Text style={styles.itemStyle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          alignSelf: 'center',
          height: 0.5,
          width: '85%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <React.Fragment>
      <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
        {/* header */}
        <View style={styles(theme).imageContainer}>
          <Image
            source={require('@assets/images/topsplash.jpg')}
            style={styles(theme).headerImage}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              borderRadius: 50,
              height: 50,
              width: 50,
              backgroundColor: 'white',
              marginTop: 15,
              marginLeft: 15,
              justifyContent: 'center',
              position: 'absolute',
            }}
          >
            <Icon
              name="chevron-left"
              size={20}
              style={{
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* top search */}
        <Animated.View style={[styles(theme).searchSection, animatedStyles]}>
          <Icon
            style={styles(theme).searchIcon}
            name="search"
            size={20}
            color="#000"
          />
          <TextInput
            style={styles(theme).textInputStyle}
            onChangeText={text => actions.searchFilterCountry(text)}
            value={countrySelected === '' ? search : countrySelected}
            underlineColorAndroid="transparent"
            placeholder={
              countrySelected !== ''
                ? countrySelected
                : 'Where would you like to go?'
            }
          />
          {showData && (
            <TouchableOpacity
              style={styles(theme).closeIcon}
              onPress={() => actions.clearCountry()}
            >
              <Icon name="times" size={15} color="#000" />
            </TouchableOpacity>
          )}
        </Animated.View>
        {showData && (
          <Animated.View entering={FadeInUp.duration(500).delay(100)}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ marginTop: -30, flexGrow: 1 }}
              data={filteredDataSourceCountry}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={CountryItemView}
            />
          </Animated.View>
        )}

        {/* bottom search */}
        <Animated.View
          style={[styles(theme).searchSectionBottom, animatedStylesBottom]}
        >
          <Icon
            style={styles(theme).searchIcon}
            name="search"
            size={20}
            color="#000"
          />
          <TextInput
            // onFocus={actions.checkHadSelectedCountry}
            style={styles(theme).textInputStyle}
            onChangeText={text => actions.searchFilterProcedure(text)}
            //   value={search}
            value={procedureSelected === '' ? search2 : procedureSelected}
            underlineColorAndroid="transparent"
            placeholder={
              procedureSelected !== ''
                ? procedureSelected
                : 'Which condition, or procedure?'
            }
          />
          {showData2 && (
            <TouchableOpacity
              style={styles(theme).closeIcon}
              onPress={() => actions.clearProcedure()}
            >
              <Icon name="times" size={15} color="#000" />
            </TouchableOpacity>
          )}
        </Animated.View>
        {showData2 && (
          <Animated.View
            entering={FadeInUp.duration(500).delay(100)}
            style={{
              width: '100%',
              height: '60%',
            }}
          >
            <FlatList
              contentContainerStyle={{ marginBottom: 50 }}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: -30, flexGrow: 1 }}
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ProcedureItemView}
            />
          </Animated.View>
        )}

        {/* bottom section */}
        {showNextStep ? (
          <Animated.ScrollView
            bounces={false}
            style={{ flex: 1 }}
            entering={FadeInDown.duration(400)}
            exiting={FadeOutDown.duration(400)}
          >
            {showData2 !== true && showData !== true && (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    paddingLeft: 20,
                    paddingTop: 30,
                    paddingBottom: 15,
                  }}
                >
                  <Text type="h6" style={{ fontSize: 12 }}>
                    RECENT SEARCHES
                  </Text>
                </View>
                {searchReducer &&
                  searchReducer.data.slice(0, 3).map((item, index) => (
                    <View key={index.toString()}>
                      <ItemRecentSearch item={item} />
                    </View>
                  ))}

                <View
                  style={{
                    paddingLeft: 20,
                    paddingTop: 30,
                    paddingBottom: 15,
                  }}
                >
                  <Text type="h6" style={{ fontSize: 12 }}>
                    POPULAR DESTINATIONS
                  </Text>
                </View>

                {popularFilter.map((item, index) => (
                  <View key={index.toString()}>
                    <ItemViewPopular item={item} />
                  </View>
                ))}
              </View>
            )}
          </Animated.ScrollView>
        ) : (
          <TouchableOpacity
            onPress={actions.goToListingPage}
            style={{
              width: 310,
              marginTop: 30,
              height: 60,
              backgroundColor: '#00bae5',
              alignSelf: 'center',
              borderRadius: 8,
            }}
          >
            <Text
              style={{ color: 'white', textAlign: 'center', lineHeight: 60 }}
            >
              Search
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
}
