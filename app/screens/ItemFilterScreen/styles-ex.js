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

export default StyleSheet.create({
  imageBackground: {
    height: 40,
    width: '100%',
    position: 'absolute',
  },
  contentList: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10,
  },
  btnClearSearch: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: '100%',
  },
  eventCard: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
    shadowColor: '#000',
    backgroundColor: 'white',
  },
  searchForm: {
    flexDirection: 'row',
    paddingVertical: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    backgroundColor: BaseColor.whiteColor,
    width: '90%',
    shadowColor: 'black',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 30,

    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  boxForm: {
    marginTop: 20,
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    backgroundColor: BaseColor.whiteColor,
    width: '90%',
    shadowColor: 'black',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 8,
  },
  contentServiceIcon: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  contentFeaturedClinic: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  contentCartPromotion: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnPromotion: {
    height: 25,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contentHiking: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  promotionBanner: {
    width: '100%',
    borderRadius: 8,
  },
  line: {
    height: 1,
    backgroundColor: BaseColor.textSecondaryColor,
    marginTop: 10,
    marginBottom: 20,
  },
  iconParent: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  featuredClinic: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
    backgroundColor: 'white',
    shadowColor: '#9f9f9f',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    borderRadius: 5,
    paddingVertical: 10,
  },
  iconContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: BaseColor.fieldColor,
    marginBottom: 10,
  },
  promotionItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(200),
    height: Utils.scaleWithPixel(250),
  },
  clinicPackageItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(135),
    height: Utils.scaleWithPixel(160),
  },
  contentQuest: {
    height: 85,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconRight: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#284F30',
    backgroundColor: '#fff',
    borderWidth: 2,
    marginLeft: 2,
    marginTop: 3,
    marginBottom: 3,
  },
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
  }
});
