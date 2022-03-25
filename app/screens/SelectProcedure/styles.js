import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';
import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
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
  bottomBtnText: {
    color: theme.colors.white,
    alignSelf: 'center',
  },
  bottomBtnTextDis: {
    color: theme.colors.grey3,
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
  resultContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    marginTop: 5,
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  procedureCard: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey5,
  },
  procedureLastCard: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey5,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
  },
  nextIcon: {
    fontSize: 22,
    color: theme.colors.grey4,
  },
  titleContainer: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: BaseColor.BlackColor,
    shadowOpacity: 0.2,
    elevation: 5,
    backgroundColor: BaseColor.fieldColor,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  whiteText: {
    color: theme.colors.white,
  },
  titleBlock: {
    flexDirection: 'column',
    padding: 10,
    flex: 1,
  },
  iconBlock: {
    alignSelf: 'center',
  },
  icon: {
    marginTop: 3,
    marginHorizontal: 10,
    padding: 5,
    color: BaseColor.blueColor,
  },
  bodyContainer: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: BaseColor.BlackColor,
    shadowOpacity: 0.2,
    elevation: 4,
    backgroundColor: BaseColor.fieldColor,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  contentTitle: {
    padding: 5,
    flex: 2,
    justifyContent: 'flex-start',
  },
  contentPrice: {
    padding: 5,
    justifyContent: 'flex-end',
  },
  contain: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E8E8E8',
    shadowColor: '#E8E8E8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width: '100%',
  },
  search: {
    borderColor: theme.colors.grey5,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 25,
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: theme.colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    padding: 2,
  },
  procedureTitle: {
    marginBottom: 5,
  },
}));
