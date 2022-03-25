import React from 'react';
import { BaseColor } from '@config';
import * as Utils from '@utils';
import { makeStyles } from 'react-native-elements';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 20,
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
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    borderRadius: 5,
    padding: 10,
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
    contentButtonBottom: {
    borderTopColor: BaseColor.textSecondaryColor,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockView: {
    paddingVertical: 20,
    borderBottomColor: BaseColor.textSecondaryColor,
    backgroundColor: BaseColor.whiteColor,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    margin: 5,
  },
  leftView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Utils.scaleWithPixel(128),
    height: Utils.scaleWithPixel(96),
    borderRadius: 0,
  },
  resultContainer: {
    paddingVertical: 15,
  },
}));
