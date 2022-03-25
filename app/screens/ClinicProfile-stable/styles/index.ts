
import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';
const G_WIN_WIDTH = Dimensions.get('window').width;
const G_WIN_HEIGHT = Dimensions.get('window').height;
const HEAD_HEIGHT = G_WIN_HEIGHT * 0.7

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tabbarStyle: {
        height: 60,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: '#fff'
    },
    tabbarBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabbarImage: {
        width: 15,
        height: 15
    },
    tabviewLayout: {
        width: G_WIN_WIDTH
    },
    headerStyle: {
        backgroundColor: '#fff',
        width: '100%',
        height: HEAD_HEIGHT
    },
    titleStyle: {
        color: '#333',
        fontSize: 15
    },
    detailStyle: {
        color: '#888',
        fontSize: 12
    },
    sectionTitle: {
        color: '#4D4D4D',
        fontSize: 15,
    },
    flatItem: {
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionItem: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide: {
        flex: 1
    },
    carouselImage: {
        width: '100%',
        height: 200
    },
    headerTitle: {
        fontSize: 18,
        ...Platform.select({
            android: {
                fontFamily: '',
            }
        })
    },
    addHeaderTitle: {
        color: 'red',
        fontSize: 18
    },
    subTitle: {
        color: '#848484',
        fontSize: 15,
        marginTop: 20,
        paddingHorizontal: 30,
        textAlign: 'center',
        ...Platform.select({
            android: {
                fontFamily: '',
            }
        })
    },
    imgBanner: {
        width: '100%',
        height: 250,
        position: 'absolute',
      },
      topBlockView: {
        paddingTop: 5,
        paddingBottom: 10,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
      },
      fullView: {
        paddingHorizontal: 20,
      },
      blockView: {
        marginTop: 15,
        paddingVertical: 0,
        backgroundColor: BaseColor.whiteColor,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
      },
      blockVerifiedView: {
        paddingBottom: 20,
      },
      verified: {
        marginTop: 20,
        flexDirection: 'row',
      },
      verifiedImage: {
        width: Utils.scaleWithPixel(30),
        height: Utils.scaleWithPixel(30),
        margin: 5,
      },
      verifiedItem: {
        width: '90%',
        paddingHorizontal: 10,
        marginTop: 5,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
      accreditationImage: {
        width: Utils.scaleWithPixel(30),
        height: Utils.scaleWithPixel(30),
        margin: 10,
      },
      amenityImage: {
        width: Utils.scaleWithPixel(32),
        height: Utils.scaleWithPixel(32),
        margin: 10,
        backgroundColor: Utils.BlackColor,
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      reviewView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      reviewCount: {
        paddingHorizontal: 5,
      },
      reviewBlockView: {
        flexDirection: 'column',
        paddingVertical: 20,
      },
      reviewHeaderView: {
        flexDirection: 'row',
        paddingVertical: 10,
      },
      reviewTitleView: {
        flexDirection: 'column',
        paddingHorizontal: 10,
      },
      contentButtonBottom: {
        marginTop: 10,
      },
      textHeight: {
        marginTop: 10,
        lineHeight: 25,
      },
      subtitleMargin: {
        marginTop: 25,
        marginBottom: 25,
      },
      showOrReadMoreMP: {
        color: '#284F30',
        marginBottom: 15,
        paddingRight: 10,
      },
});