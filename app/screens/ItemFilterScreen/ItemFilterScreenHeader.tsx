import React, { useState, useMemo, useEffect } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { RefreshControlProps } from 'react-native-head-tab-view';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
  FadeInDown,
} from 'react-native-reanimated';
import { styles } from './styles';
import { CustomRefreshControl } from './component';
import {
  ScrollableTabViewContainer,
  TabViewContainer,
} from './component/TabViewBase';
import { useHomeConfig } from './hook';
import { Header, SafeAreaView, Icon } from '@components';
import { useNavigation } from '@react-navigation/native';
import { TabBar } from 'react-native-tab-view';
import { DefaultTabBar } from 'react-native-scrollable-tab-view';
import staticData from './config/staticData';
import { TabViewType } from './types';
import { useSelector, useDispatch } from 'react-redux';

const G_WIN_WIDTH = Dimensions.get('window').width;
const G_WIN_HEIGHT = Dimensions.get('window').height;
const HEAD_HEIGHT = G_WIN_HEIGHT * 0.1;

const IMG_WH = 100;
const MARGIN_H = 15;
const MARGIN_V = 20;
const FROZE_TOP = IMG_WH;
const LINE_HEIGHT = 20;
const LINE_COUNT = 3;
const moveDistance = HEAD_HEIGHT - FROZE_TOP;
const title_h = LINE_HEIGHT;
const detail_h = LINE_HEIGHT * LINE_COUNT;
const marginTop =
  (HEAD_HEIGHT - IMG_WH - title_h - MARGIN_V * 2 - detail_h) * 0.5;

const TIMECOUNT = 2000;

const ItemFilterScreenHeader: React.FC<any> = props => {
  // const { tabviewType, enableSnap } = useHomeConfig(props)
  const [scrollTrans, setScrollTrans] = useState(useSharedValue(0));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [clinics, setClinics] = useState('');
  const [headerImage, setHeaderImage] = useState(staticData.DetailImg);
  const searchReducer = useSelector(state => state.search);
  const [procedure, setProcedure] = useState("Not Selected");
  const [country, setCountry] = useState("Not Selected");

  const [detail, setDetail] = useState(
    "It's hard to stay mad when there's so much beauty in the world.",
  );
  const navigation = useNavigation();
  let enableSnap = true;

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    // console.log('clinics');
    // console.log(clinics);
  }, []);



  const transXValue = useDerivedValue(() => {
    const left = (G_WIN_WIDTH - IMG_WH) / 2;
    return interpolate(
      scrollTrans.value,
      [0, moveDistance],
      [0, -left],
      Extrapolate.CLAMP,
    );
  });
  const transYValue = useDerivedValue(() => {
    const moveDistance = HEAD_HEIGHT - FROZE_TOP;
    const Img_one_move = marginTop + title_h + detail_h + MARGIN_V * 2;
    return interpolate(
      scrollTrans.value,
      [0, moveDistance],
      [0, Img_one_move],
      Extrapolate.CLAMP,
    );
  });
  const scaleValue = useDerivedValue(() => {
    const moveDistance = HEAD_HEIGHT - FROZE_TOP;
    return interpolate(
      scrollTrans.value,
      [0, moveDistance],
      [1, 0.7],
      Extrapolate.CLAMP,
    );
  });

  const headerTransStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: transXValue.value,
        },
        {
          translateY: transYValue.value,
        },
        {
          scale: scaleValue.value,
        },
      ],
    };
  });

  const titleOpacity = useDerivedValue(() => {
    return interpolate(
      scrollTrans.value,
      [0, 10, 20],
      [1, 0.8, 0],
      Extrapolate.CLAMP,
    );
  });
  const titleStyle = useAnimatedStyle(() => {
    return { opacity: titleOpacity.value };
  });

  const detailTransX = useDerivedValue(() => {
    return interpolate(
      scrollTrans.value,
      [0, moveDistance],
      [0, IMG_WH - (MARGIN_H + IMG_WH) * 0.5],
      Extrapolate.CLAMP,
    );
  });
  const detailTransY = useDerivedValue(() => {
    return interpolate(
      scrollTrans.value,
      [0, moveDistance],
      [0, marginTop - (IMG_WH - detail_h) * 0.5],
      Extrapolate.CLAMP,
    );
  });
  const detailStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: detailTransX.value,
        },
        {
          translateY: detailTransY.value,
        },
      ],
    };
  });

  const renderScrollHeader = () => {
    return (
      <Animated.View
      entering={FadeInDown}
        style={{
          backgroundColor: '#e6e6e6',
          width: '100%',
          height: HEAD_HEIGHT,
          alignItems: 'center',
        }}
      >
        <View style={{flexDirection: 'row', width: '100%', flex: 1, alignContent: 'center', backgroundColor:'white', height: 60}}>
          <TouchableOpacity
          style={{alignSelf: 'center', flex:0.2}}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} style={{ paddingLeft: 30}}/>
          </TouchableOpacity>
          <View style={{
            flex: 0.6,
            backgroundColor: '#f1f1f1', width: 100, height: 40, borderRadius: 30, alignSelf: 'center'}}>
              <Text style={{alignSelf: 'center', lineHeight: 40}}>{searchReducer.selectedProcedure} - {searchReducer.selectedCountry}</Text>
          </View>

          <View/>
        </View>
        {/* <Animated.Image
          source={headerImage}
          style={[
            {
              backgroundColor: '#f1f1f1',
              width: IMG_WH,
              height: IMG_WH,
              marginTop,
              borderRadius: IMG_WH * 0.5,
            },
            headerTransStyle,
          ]}
        />
        <Animated.Text
          style={[
            {
              fontSize: 18,
              color: '#26323F',
              marginTop: MARGIN_V,
              lineHeight: LINE_HEIGHT,
            },
            titleStyle,
          ]}
        >
          Good luck!
        </Animated.Text>
        <Animated.View
          style={[
            {
              height: detail_h,
              justifyContent: 'center',
              alignItems: 'center',
              width: G_WIN_WIDTH - MARGIN_H - IMG_WH,
              marginTop: MARGIN_V,
            },
            detailStyle,
          ]}
        >
          <Text
            style={[
              {
                fontSize: 16,
                textAlign: 'center',
                color: '#596C80',
                lineHeight: LINE_HEIGHT,
              },
            ]}
          >
            {detail}
          </Text>
        </Animated.View> */}
      </Animated.View>
    );
  };

  const makeScrollTrans = (scrollTrans: Animated.SharedValue<number>) => {
    setScrollTrans(scrollTrans);
  };

  const onStartRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDetail(
        'Nobody gets to live life backwards. Look ahead, that’s where your future lies.',
      );
      setHeaderImage(staticData.HeaderImg);
      setIsRefreshing(false);
    }, TIMECOUNT);
  };

  const renderRefreshControl = (refreshProps: RefreshControlProps) => {
    return <CustomRefreshControl {...refreshProps} />;
  };

  const _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        inactiveColor={'#333'}
        activeColor={'#00bae5'}
        indicatorStyle={{ backgroundColor: '#00bae5' }}
        getLabelText={({ route }) => route.title}
        style={styles.tabbarStyle}
      />
    );
  };

  const Props = {
    ...props,
    renderScrollHeader,
    // makeScrollTrans,
    frozeTop: FROZE_TOP,
    // onStartRefresh: onStartRefresh,
    // renderRefreshControl,
    isRefreshing,
    enableSnap,
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      {<TabViewContainer {...Props} renderTabBar={_renderTabBar} />}
    </View>
  );
};

export default ItemFilterScreenHeader;
