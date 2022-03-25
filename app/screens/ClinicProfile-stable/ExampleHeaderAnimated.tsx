
import React, { useState, useMemo, useEffect } from 'react';
import {
    View,
    Dimensions,
    Text,
    Image,
} from 'react-native';
import { RefreshControlProps } from 'react-native-head-tab-view'
import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, interpolate, Extrapolate } from 'react-native-reanimated'
import { styles } from './styles'
import { CustomRefreshControl } from './component'
import { ScrollableTabViewContainer, TabViewContainer } from './component/TabViewBase'
import { useHomeConfig } from './hook'
import { Header, SafeAreaView, Icon } from '@components';
import { useNavigation } from '@react-navigation/native';
import { TabBar } from 'react-native-tab-view'
import { DefaultTabBar } from 'react-native-scrollable-tab-view'
import staticData from './config/staticData'
import { TabViewType } from './types'
import ClinicProfileComponent from "./ClinicProfileComponent";
import Swiper from 'react-native-swiper'

const G_WIN_WIDTH = Dimensions.get('window').width
const G_WIN_HEIGHT = Dimensions.get('window').height
const HEAD_HEIGHT = G_WIN_HEIGHT * 0.5

const IMG_WH = 100
const MARGIN_H = 15
const MARGIN_V = 20
const FROZE_TOP = IMG_WH
const LINE_HEIGHT = 20
const LINE_COUNT = 3
const moveDistance = HEAD_HEIGHT - FROZE_TOP
const title_h = LINE_HEIGHT
const detail_h = LINE_HEIGHT * LINE_COUNT
const marginTop = (HEAD_HEIGHT - IMG_WH - title_h - MARGIN_V * 2 - detail_h) * 0.5

const TIMECOUNT = 2000


const ExampleHeaderAnimated: React.FC<any> = ({
    props,
    clinic, 
    navigation, 
    route,     
    ready,
    aboutList,
    aboutMoreCondition,
    locationList,
    locationMoreCondition,
    loadingDone,
    events,
}) => {
    // const { tabviewType, enableSnap } = useHomeConfig(props)
    const [scrollTrans, setScrollTrans] = useState(useSharedValue(0))
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [clinics, setClinics] = useState('')
    const [headerImage, setHeaderImage] = useState(staticData.DetailImg)
    const [detail, setDetail] = useState("It's hard to stay mad when there's so much beauty in the world.")
    let enableSnap = false;

    const renderPagination = (index, total, context) => {
        return (
          <View style={{position: 'absolute', right: 15, bottom: 35, backgroundColor: 'grey', width: 45, alignItems: 'center', borderRadius: 30}}>
            <Text style={{ color: 'white' }}>
              <Text style={{color: 'white'}}>{index + 1}</Text>/{total}
            </Text>
          </View>
        )
      }

    // if (clinic.error) return <Text>Fetch error: {clinic.error.message}</Text>;

    // if (loadingDone) return <Swiper
    // style={{height: 300}}
    //   renderPagination={renderPagination}
    //   loop={false}
    // >
    //  <View style={{height: 350}}>
    //       <Image
    //         style={{  
    //             flex: 1,
    //             justifyContent: 'center',
    //             backgroundColor: 'red'
    //         }}
    //         // source={{ uri: photo.photo }}
    //         resizeMode={'cover'} // cover or contain its upto you view look
    //         />
    //   </View>    </Swiper>
    // ;
    
    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
            fetchClinics();
            console.log('clinics');
            console.log(clinics);
      }, []);

    const fetchClinics = async() => {
      const filterevergonor = `https://30fde358b3.ever.healthcare/api/Clinics?filter[limit]=8`;
      fetch(filterevergonor)
        .then(response => response.json())
        .then(data =>
            setClinics(data)
          )
        .catch(error => console.log(error));
    }

    const transXValue = useDerivedValue(() => {
        const left = (G_WIN_WIDTH - IMG_WH) / 2
        return interpolate(scrollTrans.value,
            [0, moveDistance],
            [0, -left],
            Extrapolate.CLAMP)
    })
    const transYValue = useDerivedValue(() => {
        const moveDistance = HEAD_HEIGHT - FROZE_TOP
        const Img_one_move = marginTop + title_h + detail_h + MARGIN_V * 2
        return interpolate(scrollTrans.value,
            [0, moveDistance],
            [0, Img_one_move],
            Extrapolate.CLAMP)
    })
    const scaleValue = useDerivedValue(() => {
        const moveDistance = HEAD_HEIGHT - FROZE_TOP
        return interpolate(scrollTrans.value,
            [0, moveDistance],
            [1, 0.7],
            Extrapolate.CLAMP)
    })

    const headerTransStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: transXValue.value
                },
                {
                    translateY: transYValue.value
                },
                {
                    scale: scaleValue.value
                }
            ]
        }
    })

    const titleOpacity = useDerivedValue(() => {
        return interpolate(scrollTrans.value,
            [0, 10, 20],
            [1, 0.8, 0],
            Extrapolate.CLAMP)
    })
    const titleStyle = useAnimatedStyle(() => {
        return { opacity: titleOpacity.value }
    })

    const detailTransX = useDerivedValue(() => {
        return interpolate(scrollTrans.value,
            [0, moveDistance],
            [0, IMG_WH - (MARGIN_H + IMG_WH) * 0.5],
            Extrapolate.CLAMP)
    })
    const detailTransY = useDerivedValue(() => {
        return interpolate(scrollTrans.value,
            [0, moveDistance],
            [0, marginTop - (IMG_WH - detail_h) * 0.5],
            Extrapolate.CLAMP)
    })
    const detailStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: detailTransX.value
                },
                {
                    translateY: detailTransY.value
                }
            ]
        }
    })

    const renderScrollHeaderComponent = () => {
        return <ClinicProfileComponent
        clinic={clinic}
        navigation={navigation}
        route={route}
        ready={ready}
        events={events}
        aboutList={aboutList}
        aboutMoreCondition={aboutMoreCondition}
        locationList={locationList}
        locationMoreCondition={locationMoreCondition}
      />
    }

    const makeScrollTrans = (scrollTrans: Animated.SharedValue<number>) => {
        setScrollTrans(scrollTrans)
    }

    const onStartRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setDetail('Nobody gets to live life backwards. Look ahead, that’s where your future lies.')
            setHeaderImage(staticData.HeaderImg)
            setIsRefreshing(false)
        }, TIMECOUNT);
    }

    const renderRefreshControl = (refreshProps: RefreshControlProps) => {
        return <CustomRefreshControl {...refreshProps} />
    }

    const _renderTabBar = (props: any) => {
        return <TabBar {...props} inactiveColor={'#333'} activeColor={'#FFD321'} style={styles.tabbarStyle} />
    }

    const Props = {
        renderScrollHeaderComponent,
        // makeScrollTrans,
        // frozeTop: FROZE_TOP,
        onStartRefresh: onStartRefresh,
        renderRefreshControl,
        isRefreshing,
        enableSnap
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            {
                    <TabViewContainer
                        {...Props} 
                        renderTabBar={_renderTabBar}
                        /> 
                
            }
        </View>
    )
}

export default ExampleHeaderAnimated


