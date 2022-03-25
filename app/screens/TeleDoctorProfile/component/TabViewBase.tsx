import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View } from 'react-native'
import staticData from '../config/staticData'
import { CollapsibleHeaderTabView as ZHeaderTabView, ZTabViewProps } from 'react-native-tab-view-collapsible-header'
import { CollapsibleHeaderTabView, ZTabViewProps as TabViewProps } from 'react-native-scrollable-tab-view-collapsible-header'
import { ScrollViewPage, FlatListPage, SectionListPage, PackageList } from './index'
import { styles } from '../styles'
import MyQuestion from '../MyQuestion';

const G_WIN_WIDTH = Dimensions.get('window').width
const TIMECOUNT = 3000
const HEAD_HEIGHT = 180


interface ScrollableTabViewContainerProps {
    renderScrollHeader?: () => React.ComponentType<any> | React.ReactElement | null;
    sceneRefreshEnabled?: boolean
    tabsRefreshEnabled?: boolean
}

const ScrollableTabViewContainer: React.FC<ScrollableTabViewContainerProps & Partial<TabViewProps>> = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false)
    const mTimer = useRef<number | null>(null)
    const onStartRefresh = () => {

        setIsRefreshing(true)
        mTimer.current = setTimeout(() => {
            setIsRefreshing(false)
        }, TIMECOUNT);
    }

    const _renderScrollHeader = () => {
        return (
            <ImageBackground source={staticData.HeaderImg} resizeMode={'stretch'} style={[styles.headerStyle, { height: HEAD_HEIGHT }]} />
        )
    }

    useEffect(() => {
        return mTimer.current ? clearTimeout(mTimer.current) : () => { }
    }, [])

    return <CollapsibleHeaderTabView
        onStartRefresh={props.tabsRefreshEnabled ? onStartRefresh : undefined}
        isRefreshing={isRefreshing}
        renderScrollHeader={_renderScrollHeader}
        {...props}
    >
        <PackageList key={'PackageList'} tabLabel={'ScrollView'} index={0} refreshEnabled={props.sceneRefreshEnabled} />
        <FlatListPage key={'FlatListPage'} tabLabel={'FlatList'} index={1} refreshEnabled={props.sceneRefreshEnabled} />
        <SectionListPage key={'SectionListPage'} tabLabel={'SectionList'} index={2} refreshEnabled={props.sceneRefreshEnabled} />
    </CollapsibleHeaderTabView>
}


const TabViewContainer: React.FC<ScrollableTabViewContainerProps & Partial<ZTabViewProps<any>>> = (props) => {
    const [index, setIndex] = useState(0)
    const [enableSnapLogic, setSnapLogic] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const mTimer = useRef<number | null>(null)
    const [routes, setRoutes] = useState([
        { key: 'ScrollView', title: 'ScrollView' },
        { key: 'FlatList', title: 'FlatList' },
        { key: 'SectionList', title: 'SectionList' },
    ])
    let routeNumber = 0;
    // if (index > 0) { enableSnapLogic = true}
    
    const onStartRefresh = () => {
        setIsRefreshing(true)
        mTimer.current = setTimeout(() => {
            setIsRefreshing(false)
        }, TIMECOUNT);
    }

    useEffect(() => {
        console.log('index');
        console.log(index);
        if (index == 0){return setSnapLogic(false)} 
        if (index > 0){return setSnapLogic(true)}
    }, [index])


    useEffect(() => {
        return mTimer.current ? clearTimeout(mTimer.current) : () => { }
    }, [])


    const _renderScene = (e: any) => {
        const { route } = e

        if (route.key == 'ScrollView') {
            console.log('ScrollView')
            console.log(enableSnapLogic)
            routeNumber = 0;
            return <PackageList index={0} refreshEnabled={props.sceneRefreshEnabled} />
        } else if (route.key == 'FlatList') {
            console.log('FlatList')

            console.log(enableSnapLogic);

             routeNumber = 1;
            return <FlatListPage index={1} refreshEnabled={props.sceneRefreshEnabled} />
        } else if (route.key == 'SectionList') {
            console.log('SectionList')
            console.log(enableSnapLogic);

            routeNumber = 2;
            return <SectionListPage index={2} refreshEnabled={props.sceneRefreshEnabled} />
        }
        return null;
    }

    const ScrollHeaderComponent = props.renderScrollHeaderComponent;

    const _renderScrollHeader = () => {
            return <ScrollHeaderComponent/>
    }
    // const _renderScrollHeader = () => {
    //     return (
    //         <ImageBackground source={staticData.HeaderImg} resizeMode={'stretch'} style={[styles.headerStyle, { height: HEAD_HEIGHT }]} />
    //     )
    // }

    console.log('enableSnapLogic');

    console.log(enableSnapLogic);

    return <ZHeaderTabView
          tabbarHeight={20}
        onStartRefresh={props.tabsRefreshEnabled ? onStartRefresh : undefined}
        isRefreshing={isRefreshing}
        navigationState={{ index, routes }}
        renderScene={_renderScene}
        onIndexChange={setIndex}
        initialLayout={styles.tabviewLayout}
        lazy={true}
        {...props}
        enableSnap={enableSnapLogic}

        renderScrollHeader={_renderScrollHeader}
    />

}


export { ScrollableTabViewContainer, TabViewContainer }
