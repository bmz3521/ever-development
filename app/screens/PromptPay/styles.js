import { StyleSheet } from 'react-native';
import { BaseColor, Typography, FontWeight } from '@config';

const styles = theme =>
  StyleSheet.create({
    titleText: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeSmall,
      color: theme.colors.secondary,
      marginHorizontal: 10,
    },
    SettingSection: {
      marginTop: 15,
      backgroundColor: '#FFFFFF',
    },
    category: {
      padding: 15,
    },
    RowInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cText: {
      fontSize: theme.fontSizeDefault,
      fontWeight: 'bold',
      color: 'black',
      paddingBottom: 0,
      fontFamily: theme.fontFamilyDefault,
    },
    chevronRight: {
      position: 'absolute',
      right: 0,
      top: -7,
    },
    RowInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    textSide: {
      paddingTop: 5,
      fontSize: 12,
      color: '#c5c5c5',
      paddingBottom: 20,
      textAlign: 'right',
    },
    cText2: {
      fontSize: theme.fontSizeSmall,
      color: theme.colors.grey1,
      paddingVertical: 10,
      fontFamily: theme.fontFamilyDefault,
    },
    secondCText2: {
      fontSize: theme.fontSizeSmall,
      color: theme.colors.secondary,
      paddingVertical: 10,
      fontFamily: theme.fontFamilyDefault,
    },
    cText3: {
      fontSize: theme.fontSizeSmall,
      color: theme.colors.grey1,
      paddingVertical: 10,
      fontFamily: theme.fontFamilyDefault,
    },
    RowText: {
      flexDirection: 'row',
    },
    iconPromptPay: {
      color: 'black',
      width: 200,
      height: 100,
    },
  });

export default styles;
