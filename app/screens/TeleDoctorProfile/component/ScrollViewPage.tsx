
import React from 'react';
import {
    Image,
    StyleSheet,
    ScrollView,
    View,
    Text,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import { HScrollView } from 'react-native-head-tab-view'
import staticData from '../config/staticData'

interface Props {
    index: number
    refreshEnabled?: boolean
    timecount?: number
    tabLabel?: string
    onPressItem?: () => void
}

const defaultProps = {
    refreshEnabled: false,
    timecount: 2000,
}

interface State {
    isRefreshing: boolean
    data?: Array<any>
}

export default class ScrollViewPage extends React.PureComponent<Props & typeof defaultProps, State> {
    static defaultProps = defaultProps
    private mTimer?: NodeJS.Timeout

    constructor(props: any) {
        super(props)
        this.state = {
            isRefreshing: false,
        }
    }
    private onStartRefresh = () => {
        this.setState({ isRefreshing: true })
        this.mTimer = setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, this.props.timecount);
    }



    componentWillUnmount() {
        if (this.mTimer) {
            clearInterval(this.mTimer)
        }
    }

    render() {
        const props = this.props.refreshEnabled ? {
            isRefreshing: this.state.isRefreshing,
            onStartRefresh: this.onStartRefresh,
        } : {}
        return (
            <HScrollView
                index={this.props.index}
                {...props}
                contentContainerStyle={styles.container}
            >
                {
                    staticData.Page1Data.map((item, index) => {
                        return (
                            <View style={{ flex: 0.5, alignItems: 'center' }} key={'Page1_' + index}>
                                <View style={styles.titleStyle}>
                                    <Text style={styles.sectionTitle}>eqeqeq</Text>
                                </View>
                                <Image style={styles.imageStyle} resizeMode={'cover'} source={item.image} />
                            </View>
                        )
                    })
                }
            </HScrollView >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    titleStyle: {
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    sectionTitle: {
        color: '#4D4D4D',
        fontSize: 15,
    },
    imageStyle: {
        width: '100%',
        height: 200
    }

});