
import React from 'react';
import {
    Image,
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { HFlatList } from 'react-native-head-tab-view'
import staticData from '../config/staticData'

const G_WIN_WIDTH = Dimensions.get('window').width
const G_WIN_HEIGHT = Dimensions.get('window').height

interface Props {
    index: number
    refreshEnabled?: boolean
    timecount?: number
    tabLabel?: string
}

const defaultProps = {
    refreshEnabled: false,
    timecount: 2000,
}

interface State {
    isRefreshing: boolean
    signOfRefresh?: boolean
    data: Array<any>

}
interface FlatListItemInfo {
    image: any;
    height: number;
    text: string;
    directory: string;
    imgSize: number;
}

export default class PackageList extends React.PureComponent<Props & typeof defaultProps, State> {
    static defaultProps = defaultProps
    private mTimer?: NodeJS.Timeout
    mFlatlist: any;

    constructor(props: any) {
        super(props);
        this.state = {
            isRefreshing: false,
            signOfRefresh: true,
            data: staticData.Page2Data
        }
    }

    componentWillUnmount() {
        if (this.mTimer) {
            clearInterval(this.mTimer)
        }
    }

    onStartRefresh = () => {
        this.setState({ isRefreshing: true })

        this.mTimer = setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, this.props.timecount);
    }

    renderItem = (itemInfo: { item: FlatListItemInfo, index: number }) => {
        const { item, index } = itemInfo
        return (
            <View style={styles.flatItem}>
                {item.image ? <Image style={{ width: '100%', height: 180, borderRadius: 5 }} source={item.image} /> : null}
                <View style={{ paddingHorizontal: 10, padding: 7, width: '100%', flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={{ marginVertical: 2, fontWeight: 'bold'}}>{`${item.text}${item.text}${index}`}</Text>
                <Text style={{ marginVertical: 2, fontSize: 10}}>{`${item.text}${index}`}</Text>
                <Text style={{ marginVertical: 2, fontSize: 16, color: 'orange', fontWeight: 'bold'}}>$399</Text>
                <Text style={{ marginVertical: 2, fontSize: 12, color: 'grey'}}>{`${item.text}${index}`}</Text>
                </View>
            </View>
        )
    }

    renderFooterComponent = () => {
        return (
            <TouchableOpacity style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                if (this.mFlatlist) {
                    this.mFlatlist.scrollToOffset({ offset: 0, animated: true })
                }
            }}>
                <Text style={styles.titleStyle}>scrollTo Top</Text>
            </TouchableOpacity>
        )
    }
    keyExtractor = (item: any, index: number) => index.toString()

    _ref = (_ref: any) => this.mFlatlist = _ref
    render() {
        const props = this.props.refreshEnabled ? {
            isRefreshing: this.state.isRefreshing,
            onStartRefresh: this.onStartRefresh,
        } : {}
        const { data } = this.state;
        return (
            <HFlatList
                style={styles.container}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                data={data}
                renderItem={this.renderItem}
                ref={this._ref}
                keyExtractor={this.keyExtractor}
                ListHeaderComponent={this.renderFooterComponent}
                ListFooterComponent={this.renderFooterComponent}
                index={this.props.index}
                {...props}
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        zIndex: -100,
        marginHorizontal: 5,
        // width: '100%',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    sectionTitle: {
        color: '#4D4D4D',
        fontSize: 15,
    },
    imageStyle: {
        width: '100%',
        height: 300
    },
    flatItem: {
        marginBottom: 5,
        width: G_WIN_WIDTH / 2.1,
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        alignItems: 'center',
        marginHorizontal: 2,
    },

});