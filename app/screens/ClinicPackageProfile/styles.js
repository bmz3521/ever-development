import { makeStyles } from 'react-native-elements';
import { BaseColor } from '@config';
import { Dimensions, StyleSheet, Platform } from 'react-native';
import * as Utils from '@utils';

const CARD_WIDTH = Dimensions.get('window').width * 0.7;
const CARD_HEIGHT = Dimensions.get('window').height * 0.3;

export default makeStyles(theme => ({
  container: {
    flex: 1,
  },
  contentContainer: { paddingHorizontal: 15 },
  blockView: {
    paddingVertical: 20,
  },
  titleContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  textGrey: {
    color: theme.colors.grey2,
  },
  renderPagination: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    backgroundColor: 'grey',
    width: 50,
    alignItems: 'center',
    padding: 3,
    borderRadius: 30,
  },
  paginationText: {
    color: '#ffffff',
  },
  swipeImage: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  detailTitle: {
    marginTop: 15,
  },
  detailsBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    marginTop: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column1: {
    width: '75%',
    paddingLeft: 10,
    paddingVertical: 15,
    paddingRight: 5,
  },
  column2: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5,
  },
  amountBadge: {
    backgroundColor: '#E5F8FC',
    borderRadius: 10,
    flex: 1,
    width: '100%',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContentWrapper: {
    marginTop: 15,
  },
  lineHeight: {
    lineHeight: 20,
  },
  bottomBtn: {
    width: '95%',
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  footer: {
    padding: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: theme.colors.shadows,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 1,
  },
  bottomBtnText: {
    color: theme.colors.white,
    alignSelf: 'center',
  },
  modalBackDrop: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    paddingVertical: 30,
    marginTop: Platform.OS == 'ios' ? -10 : 10,
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: 10,
    top: 30,
  },
  sheetWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    overflow: 'hidden',
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    height: 90,
  },
  sheetCol1: { width: '10%', alignItems: 'center' },
  sheetCol2: { width: '65%' },
  sheetCol3: { width: '25%', paddingRight: 5 },
  bottomSpace: { height: 20 },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: { width: 50, height: 50, marginRight: 6 },
  reviewTitle: {
    flex: 1,
    marginHorizontal: 5,
  },
  starWrapper: { width: 100, marginTop: 3 },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  reviewCard: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: theme.colors.grey5,
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  comment: { marginTop: 10 },
  showMoreBtn: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 10,
    paddingRight: 10,
  },
}));
