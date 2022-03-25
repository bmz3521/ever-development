import { makeStyles } from 'react-native-elements';
import { BaseColor } from '@config';
import { StyleSheet } from 'react-native';
import * as Utils from '@utils';

export default makeStyles(theme => ({
  doctorCardWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  avatarWrapper: {
    paddingVertical: 10,
  },
  doctorDetailWrapper: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  specialtyListWrapper: {
    flexDirection: 'row',
    marginTop: 5,
  },
  specialtyBadge: {
    backgroundColor: BaseColor.textSecondaryColor,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  container: {
    flex: 1,
  },
  textColorDefault: {
    color: theme.colors.fontDefault,
  },
  textColorGrey: {
    color: theme.colors.grey1,
  },
  reviewText: {
    color: theme.colors.grey3,
    marginLeft: 5,
  },
  dividerWrapper: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  nameLocationWrapper: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  swipeImage: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  bottomBox: {
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: theme.colors.shadows,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 6,
  },
  bottomBtnText: {
    color: theme.colors.white,
    alignSelf: 'center',
  },
  bottomBtn: {
    width: '95%',
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
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
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor,
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
  verifiedText: {
    lineHeight: 20,
    marginTop: 10,
    fontSize: 13,
  },
  verifiedTitle: {
    fontSize: 15,
  },
  aboutWrapper: {
    paddingBottom: 15,
    marginHorizontal: 20,
  },
  showWrapper: {
    alignItems: 'center',
    marginTop: 5,
  },
  showBtn: {
    color: theme.colors.primary,
  },
  lineHeightDefault: {
    lineHeight: 25,
  },
  accreditationWrapper: {
    marginTop: 15,
  },
  accreditationImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 15,
  },
  svgWrapper: {
    marginRight: 15,
  },
  amenityText: {
    marginRight: 25,
  },
  amenityBtn: {
    alignItems: 'center',
    marginTop: -10,
  },
  staffVerifyWrapper: {
    marginTop: 5,
  },
  staffVerifyTitle: {
    paddingLeft: 10,
    fontSize: 13,
  },
  careTeamText: {
    lineHeight: 25,
    marginTop: 15,
  },
  lngWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  lngListWrapper: {
    flex: 1,
    marginLeft: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  careTeamBtnWrapper: {
    alignItems: 'center',
    marginTop: 5,
  },
  doctorListWrapper: {
    marginTop: 10,
  },
  seeAll: {
    borderRadius: 8,
    paddingTop: 3,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listDividerWrapper: {
    marginVertical: 10,
  },
  textHeight: {
    marginTop: 10,
    lineHeight: 25,
  },
  locationDesc: {
    marginBottom: 10,
    marginTop: 10,
    fontFamily: theme.fontFamilyDefault,
  },
  mapWrapper: {
    height: 240,
    width: '100%',
    marginTop: 10,
  },
  locationShowBtn: {
    color: theme.colors.primary,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: theme.fontFamilyDefault,
  },
  bottomText: {
    marginTop: 10,
    marginBottom: 5,
  },
  policyWrapper: {
    marginHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 0,
  },
  policyBtn: {
    alignItems: 'center',
    marginTop: 5,
  },
  divider: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  footer: {
    padding: 10,
    paddingBottom: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: theme.colors.shadows,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 1,
  },
}));
