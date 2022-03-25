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
    modalButtonContainer: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      padding: 12,
      borderRadius: 15,
    },
    buttonTextAdd: {
      color: 'white',
      fontFamily: theme.fontFamilyBold,
      fontSize: theme.fontSizeDefault,
    },
    modalTitle: {
      fontWeight: '600',
      color: 'black',
      marginBottom: 10,
      textAlign: 'center',
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 10,
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeDefault,
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
  });

export default styles;
