
import React, {memo, useLayoutEffect} from 'react';
import {
    Image,
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { HFlatList } from 'react-native-head-tab-view'
import staticData from '../config/staticData'
import MyQuestion from '../MyQuestion';

import Text from 'app/elements/Text';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ButtonIconHeader from 'app/elements/Buttons/ButtonIconHeader';
import Theme from 'app/style/Theme';
import {Colors, Routes} from 'app/configs';
import ButtonLinear from 'app/elements/Buttons/ButtonLinear';
import keyExtractor from 'app/utils/keyExtractor';
import QuestionAnswerItem from 'app/patient-components/QuestionAnswerItem';
import {MY_QUESTION_DETAILS} from 'app/configs/Data';
// import {useTheme} from 'app/configs/ChangeTheme'
import Container from 'app/elements/Layout/Container';
import Layout from 'app/elements/Layout/Layout';
import Question from 'app/patient-components/MyPlus/Question';
import OtherQuestion from 'app/patient-components/MyPlus/OtherQuestion';

// import { AVATAR } from "app/images/Avatar";
import { IMAGE } from "app/images/Image";
import { Tasks } from "app/type/tasks";
import { condition } from "app/type/condition";
import { ICON } from "app/images/Icon";

const G_WIN_WIDTH = Dimensions.get('window').width
const G_WIN_HEIGHT = Dimensions.get('window').height
const AVATAR: any = {
    doctor1: require("app/images/Avatar/doctor-1.png"),
    doctor2: require("app/images/Avatar/doctor-2.png"),
    doctor3: require("app/images/Avatar/doctor-3.png"),
    doctor4: require("app/images/Avatar/doctor-4.png"),
    doctor5: require("app/images/Avatar/doctor-5.png"),
    doctor6: require("app/images/Avatar/doctor-6.png"),
    doctor7: require("app/images/Avatar/doctor-7.png"),
    avatar1: require("app/images/Avatar/avatar-1.png"),
    avatar2: require("app/images/Avatar/avatar-2.png"),
    avatar3: require("app/images/Avatar/avatar-3.png"),
    avatar4: require("app/images/Avatar/avatar-4.png"),
    avatar5: require("app/images/Avatar/avatar-5.png"),
    avatar6: require("app/images/Avatar/avatar-6.png"),
    avatar7: require("app/images/Avatar/avatar-7.png"),
    avatar8: require("app/images/Avatar/avatar-8.png"),
    avatar9: require("app/images/Avatar/avatar_myra_douglas.png"),
    avatar10: require("app/images/Avatar/avatar_nancy_beck.png"),
    avatar11: require("app/images/Avatar/avatar_11.png"),
    avatar12: require("app/images/Avatar/avatar_12.png"),
    avatar13: require("app/images/Avatar/avatar_13.png"),
    bradley: require("app/images/Avatar/bradley.png"),
    sarah: require("app/images/Avatar/sarah.png"),
    wallace: require("app/images/Avatar/wallace.png"),
    joanna: require("app/images/Avatar/joanna.png"),
  };
const dataFeed = [
    {
      id: 0,
      doctor: {
        name: "Sandra Klevins",
        faculty: "Medical Genetics",
        rate: 4.8,
        numberOfReviews: 753,
        avatar: AVATAR.avatar11,
      },
      image: IMAGE.img7,
      answer: `Always use your own pen at the doctor's office and not the pen 100's of infected patients touched.`,
      doctorsAgreed: [AVATAR.avatar1, , AVATAR.avatar2, AVATAR.avatar3],
      numberAgreed: 125,
      numberThanks: 125,
      thanked: true,
    },
    {
      id: 1,
      doctor: {
        name: "Sandra Klevins",
        faculty: "Internal Medicine",
        rate: 4.8,
        numberOfReviews: 753,
        avatar: AVATAR.avatar3,
      },
      answer: `If you're sick, limit touching of other people's work environments (phones, keyboards, mouses).`,
      doctorsAgreed: [AVATAR.avatar1, , AVATAR.avatar2],
      numberAgreed: 4,
      numberThanks: 24,
      thanked: false,
    },
  ];
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
            data: [
                {
                  id: 0,
                  doctor: {
                    name: "Sandra Klevins",
                    faculty: "Medical Genetics",
                    rate: 4.8,
                    numberOfReviews: 753,
                    avatar: AVATAR.avatar11,
                  },
                  image: IMAGE.img7,
                  answer: `Always use your own pen at the doctor's office and not the pen 100's of infected patients touched.`,
                  doctorsAgreed: [AVATAR.avatar1, , AVATAR.avatar2, AVATAR.avatar3],
                  numberAgreed: 125,
                  numberThanks: 125,
                  thanked: true,
                },
                {
                  id: 1,
                  doctor: {
                    name: "Sandra Klevins",
                    faculty: "Internal Medicine",
                    rate: 4.8,
                    numberOfReviews: 753,
                    avatar: AVATAR.avatar3,
                  },
                  answer: `If you're sick, limit touching of other people's work environments (phones, keyboards, mouses).`,
                  doctorsAgreed: [AVATAR.avatar1, , AVATAR.avatar2],
                  numberAgreed: 4,
                  numberThanks: 24,
                  thanked: false,
                },
              ],
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

     handlePressItem = (item: any) => {
        // navigate(Routes.MyQuestionDetail, item);
      }

      
     listHeaderComponent = () => {
        return (
          <Layout style={styles.box}>
            <Text center bold size={17} lineHeight={22}>
              Have a health question?
            </Text>
            <ButtonLinear white  style={styles.button} title={'Ask a free now!'} />
          </Layout>
        );
     }
    
    //    renderItem = (item) => {
    //        console.log(item);
    //     return (
    //       <QuestionAnswerItem
    //         onPress={() => this.handlePressItem(item)}
    //         style={styles.item}
    //         {...item}
    //       />
    //     );
    //   }

    
      renderItem = (item) => {
        console.log('item');

        //   console.log(item);
        // if (item.item.myAnswer) {
        //     return <Question {...item.item} />;
        //   }
          return <OtherQuestion {...item.item} />;
        
   }

    // renderItem = (itemInfo: { item: FlatListItemInfo, index: number }) => {
    //     const { item, index } = itemInfo
    //     return (
    //         <View style={styles.flatItem}>
    //             {item.image ? <Image style={{ width: '100%', height: 180, borderRadius: 5 }} source={item.image} /> : null}
    //             <View style={{ paddingHorizontal: 10, padding: 7, width: '100%', flexDirection: 'column', alignItems: 'flex-start'}}>
    //             <Text style={{ marginVertical: 2, fontWeight: 'bold'}}>{`${item.text}${item.text}${index}`}</Text>
    //             <Text style={{ marginVertical: 2, fontSize: 10}}>{`${item.text}${index}`}</Text>
    //             <Text style={{ marginVertical: 2, fontSize: 16, color: 'orange', fontWeight: 'bold'}}>$399</Text>
    //             <Text style={{ marginVertical: 2, fontSize: 12, color: 'grey'}}>{`${item.text}${index}`}</Text>
    //             </View>
    //         </View>
    //     )
    // }

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
                numColumns={1}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={this.renderItem}
                ref={this._ref}
                keyExtractor={this.keyExtractor}
                // ListHeaderComponent={this.listHeaderComponent}
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
        // flexDirection: 'row',
        // flexWrap: 'wrap',
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
    box: {
        paddingVertical: 32,
        marginHorizontal: 24,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowColor: Colors.boxShadow,
        borderRadius: 16,
      },
      button: {
        marginHorizontal: 76,
        marginTop: 24,
      },
      contentContainerStyle: {
        paddingTop: 32,
      },
      item: {
        marginHorizontal: 24,
        marginTop: 16,
      },

});
