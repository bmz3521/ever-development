import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, ImageBackground } from 'react-native'
import staticData from '../config/staticData'
import { CollapsibleHeaderTabView as ZHeaderTabView, ZTabViewProps } from 'react-native-tab-view-collapsible-header'
import { CollapsibleHeaderTabView, ZTabViewProps as TabViewProps } from 'react-native-scrollable-tab-view-collapsible-header'
import { DoctorPage, TreatmentPage, ClinicPage } from './index'
import { styles } from '../styles'
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
        // renderScrollHeader={_renderScrollHeader}
        {...props}
    >
        <DoctorPage key={'PackageList'} tabLabel={'ScrollView'} index={0} refreshEnabled={props.sceneRefreshEnabled} 
 />
        <DoctorPage key={'FlatListPage'} tabLabel={'FlatList'} index={1} refreshEnabled={props.sceneRefreshEnabled} />
        <DoctorPage key={'SectionListPage'} tabLabel={'SectionList'} index={2} refreshEnabled={props.sceneRefreshEnabled} />
    </CollapsibleHeaderTabView>
}


const TabViewContainer: React.FC<ScrollableTabViewContainerProps & Partial<ZTabViewProps<any>>> = (props) => {
    const [index, setIndex] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const mTimer = useRef<number | null>(null)
    const [routes, setRoutes] = useState([
        { key: 'Treatment', title: 'Treatment' },
        { key: 'FlatList', title: 'Clinic' },
        { key: 'SectionList', title: 'Doctor' },
    ])
    console.log('props', props);

    const onStartRefresh = () => {
        setIsRefreshing(true)
        mTimer.current = setTimeout(() => {
            setIsRefreshing(false)
        }, TIMECOUNT);
    }

    useEffect(() => {
        return mTimer.current ? clearTimeout(mTimer.current) : () => { }
    }, [])


    const _renderScene = (e: any) => {
        const { route } = e

        if (route.key == 'Treatment') {
            return <TreatmentPage index={0} refreshEnabled={props.sceneRefreshEnabled} {...props}
            />
        } else if (route.key == 'FlatList') {
            return <ClinicPage index={1} refreshEnabled={props.sceneRefreshEnabled} />
        } else if (route.key == 'SectionList') {
            return <DoctorPage index={2} refreshEnabled={props.sceneRefreshEnabled} />
        }
        return null;
    }

    const _renderScrollHeader = () => {
        return (
            <ImageBackground source={staticData.HeaderImg} resizeMode={'stretch'} style={[styles.headerStyle, { height: HEAD_HEIGHT }]} />
        )
    }

    return <ZHeaderTabView
        // onStartRefresh={props.tabsRefreshEnabled ? onStartRefresh : undefined}
        // isRefreshing={isRefreshing}
        navigationState={{ index, routes }}
        renderScene={_renderScene}
        onIndexChange={setIndex}
        initialLayout={styles.tabviewLayout}
        lazy={true}
        // renderScrollHeader={_renderScrollHeader}
        {...props}
    />

}


export { ScrollableTabViewContainer, TabViewContainer }
