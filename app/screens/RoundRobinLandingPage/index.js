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
import { sliderWidth, itemWidth } from './SliderEntry.style';
import useHooks from './hooks';
import { Loading } from '@components';

export default function RoundRobinLandingPage({ navigation }) {
  const dispatch = useDispatch();
  const searchReducer = useSelector(state => state.search);
  const { loading, symptomGroup, actions } = useHooks({ navigation });

  const [activeIndex, setActiveIndex] = React.useState(0);

  const [refreshing, setRefreshing] = React.useState(false);
  const [showData, setShowData] = React.useState(false);
  const [showData2, setShowData2] = React.useState(false);
  const [showNextStep, setShowNextStep] = React.useState(true);

  const [countryList, setCountryList] = React.useState([]);

  const [countrySelected, setCountry] = React.useState('');
  const [procedureSelected, setProcedure] = React.useState('');

  const heightImageBanner = Utils.scaleWithPixel(140);
  const [heightHeader, setHeightHeader] = React.useState(null);

  const { theme } = useTheme();

  const [search, setSearch] = useState('');
  const [search2, setSearch2] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [filteredDataSourceCountry, setFilteredDataSourceCountry] = useState(
    [],
  );
  const [masterDataSourceCountry, setMasterDataSourceCountry] = useState([]);

  const popularFilter = [
    { location: 'Paris', procedure: 'Dental Crown', image: '' },
    { location: 'Paris', procedure: 'Dental Crown', image: '' },
    { location: 'Paris', procedure: 'Dental Crown', image: '' },
    { location: 'Paris', procedure: 'Dental Crown', image: '' },
  ];
  const ENTRIES1 = [
    {
      title: '15 - 30 Minutes Consultation with General Practitioner',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: Images.DoctorPlaceholder,
      price: 300,
    },
    {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
      price: 500,
    },
  ];
  const ENTRIES2 = [
    {
      title: '5-7 Days Home Isolation with General Practitioner',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: Images.DoctorPlaceholder,
      price: 1500,
    },
    {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
      price: 500,
    },
  ];

  const _renderItem = ({ item, index }) => {
    const title = item.title;
    const price = item.price;
    const subtitle = item.subtitle;

    const even = false;

    const uppercaseTitle = title ? (
      <Text
        style={[stylesSLider.title, even ? stylesSLider.titleEven : {}]}
        numberOfLines={2}
      >
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={stylesSLider.slideInnerContainer}
        onPress={async () => {
          await analytics().logSelectItem({
            item_list_id: 'round_robin_flow',
            item_list_name: 'Consultation Item',
            items: [
              {
                item_brand: 'EVER',
                item_id: 'EVER_CONSULT_01',
                item_name: `B${price}-${title}`,
                item_category: 'consulting services',
              },
            ],
          });
          navigation.navigate('MainStack', {
            screen: 'RoundRobinSelectedPage',
            params: {
              ...item,
              bookingCategory: 'general',
            },
          });
        }}
      >
        <View style={stylesSLider.shadow} />
        <View style={stylesSLider.topBox}>
          <View style={stylesSLider.textContainerTop}>
            <Text style={stylesSLider.priceTitle}>B{price}</Text>
            <Text style={stylesSLider.title}>{title}</Text>
          </View>
          <View style={[stylesSLider.imageContainer]}>
            <Image source={item.illustration} style={stylesSLider.image} />
          </View>
        </View>
        <View style={stylesSLider.textContainer}>
          <Text style={stylesSLider.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderSymptomGroup = ({ item, index }) => {
    const { name, nameTh, id } = item;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={stylesSLider.slideInnerContainer}
        onPress={() => {
          navigation.navigate('MainStack', {
            screen: 'RoundRobinSelectedPage',
            params: {
              ...item,
              bookingCategory: 'general',
              bookingType: 'Telepharmacy',
              symptomGroupId: id,
              title: i18next.language == 'en' ? name : nameTh,
            },
          });
        }}
      >
        <View style={stylesSLider.shadow} />
        <View style={stylesSLider.topBox}>
          <View style={stylesSLider.textContainerTop}>
            <Text style={stylesSLider.symptomGroupTitle}>
              {i18next.language == 'en' ? name : nameTh}
            </Text>
            {/* <Text style={stylesSLider.title}>{name}</Text> */}
          </View>
          <View style={[stylesSLider.imageContainer]}>
            <Image
              source={Images.DoctorPlaceholder}
              style={stylesSLider.image}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
        {/* <Loading isVisible={loading} /> */}
        <Image
          source={require('@assets/images/topsplash.jpg')}
          style={[{ height: 140, width: '100%', position: 'absolute' }]}
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

        <View style={{ marginTop: 100 }} />

        <Text style={{ marginLeft: 25, marginBottom: 20 }}>
          General Consultation
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 50,
          }}
        >
          <Carousel
            layout={'default'}
            data={ENTRIES1}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            renderItem={_renderItem}
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>

        {/* <Text style={{ marginLeft: 25, marginBottom: 20 }}>Care at Home</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 50,
          }}
        >
          <Carousel
            layout={'default'}
            data={ENTRIES2}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            renderItem={_renderItem}
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View> */}

        <Text style={{ marginLeft: 25, marginBottom: 20 }}>Symptom Group</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 50,
          }}
        >
          <Carousel
            layout={'default'}
            data={symptomGroup}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            renderItem={_renderSymptomGroup}
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
}
