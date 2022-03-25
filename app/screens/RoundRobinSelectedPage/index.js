/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
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
} from 'react-native-reanimated';
import { SearchActions } from '@actions';
import config from '@_config';
import Carousel from 'react-native-snap-carousel';
import stylesSLider from './SliderEntry.style';
import stylesCard from './NoticeCard.style';

import { sliderWidth, itemWidth } from './SliderEntry.style';

import useHooks from './hooks';

const RECOMMEND_DATA = [
  {
    id: 1,
    title: 'Consult with doctors online from anywhere',
  },
  {
    id: 2,
    title: 'Recieve recommendation on medication and suggestions',
  },
  {
    id: 3,
    title: 'Order drug through our e-telepharmacy system',
  },
];

const CIRCLE_RADIUS = 25;

export default function RoundRobinSelectedPage({ route, navigation }) {
  const searchReducer = useSelector(state => state.search);

  const heightImageBanner = Utils.scaleWithPixel(140);
  const [heightHeader, setHeightHeader] = React.useState(null);

  const { theme } = useTheme();

  const {
    price = null,
    title = null,
    subtitle = null,
    illustration = null,
    bookingCategory = null,
    bookingType = null,
    symptomGroupId = null,
  } = route.params;

  const { actions } = useHooks({
    navigation,
    bookingCategory,
    bookingType,
    price,
    title,
    subtitle,
    illustration,
    symptomGroupId,
  });

  return (
    <React.Fragment>
      <ScrollView
        style={styles(theme).scrollView}
        showsVerticalScrollIndicator={false}
        // onScroll={Animated.event([
        //   {
        //     nativeEvent: {
        //       contentOffset: { y: new Animated.Value(0) },
        //     },
        //   },
        // ])}
        onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
        scrollEventThrottle={8}
      >
        <Image
          source={require('@assets/images/topsplash.jpg')}
          style={[{ height: 90, width: '100%', position: 'absolute' }]}
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

        <View style={{ marginTop: 20 }} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity
            activeOpacity={1}
            style={stylesSLider.slideInnerContainer}
            // onPress={() => {
            //   alert(`You've clicked '${title}'`);
            // }}
          >
            <View style={stylesSLider.shadow} />
            <View style={stylesSLider.topBox}>
              <View style={stylesSLider.textContainerTop}>
                <Text style={stylesSLider.priceTitle}>
                  {price ? `B${price}` : ''}
                </Text>
                <Text style={stylesSLider.title}>{title}</Text>
              </View>
              <View style={[stylesSLider.imageContainer]}>
                <Image source={illustration} style={stylesSLider.image} />
              </View>
            </View>
            <View style={stylesSLider.textContainer}>
              <Text style={stylesSLider.subtitle} numberOfLines={2}>
                {subtitle}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={stylesCard.slideInnerContainer}
            // onPress={() => {
            //   alert(`You've clicked '${title}'`);
            // }}
          >
            <View style={stylesCard.shadow} />
            <View style={stylesCard.topBox}>
              <View style={stylesCard.textContainerTop}>
                <Text style={stylesCard.title}>
                  Insert some cautionary or notice here
                </Text>
              </View>
              <View style={[stylesCard.imageContainer]}>
                <Image source={illustration} style={stylesCard.image} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 40 + CIRCLE_RADIUS / 2,
            marginRight: 20,
            marginTop: 50,
            marginBottom: 60,
            paddingBottom: 70,
          }}
        >
          <View
            style={{
              backgroundColor: 'black',
              position: 'absolute',
              width: 1,
              height: '100%',
            }}
          />
          {RECOMMEND_DATA.map((item, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: index != RECOMMEND_DATA.length - 1 ? 40 : 0,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderColor: 'black',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: -CIRCLE_RADIUS + 2,
                    zIndex: 10,
                  }}
                >
                  <Text>{index + 1}</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    marginLeft: CIRCLE_RADIUS + 20,
                    marginRight: 20,
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{item.title}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          paddingTop: 12,
          position: 'absolute',
          bottom: 0,
          height: 80,
          width: '100%',
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            justifyContent: 'center',
            marginHorizontal: 20,
            backgroundColor: '#00bae5',
            height: 45,
            borderRadius: 10,
          }}
          onPress={async () => {
            // await analytics().logAddToCart({
            //   value: parseInt(price),
            //   currency: 'thb',
            //   items: [
            //     {
            //       item_brand: 'EVER',
            //       item_id: 'EVER_CONSULT_01',
            //       item_name: `B${price}-${title}`,
            //       item_category: 'consulting services',
            //     },
            //   ],
            // });
            actions.onNext();
          }}
        >
          <Text
            style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}
          >
            Book a Consultation
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
