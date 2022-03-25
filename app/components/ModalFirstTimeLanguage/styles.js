import { StyleSheet } from 'react-native';

export default styles = theme => {
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    innerContainer: {
      flex: 1,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bodyContainer: {
      width: '100%',
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingVertical: 22,
      borderRadius: 20,
      maxWidth: 450,
    },
    titleStyles: {
      fontFamily: theme.fontFamilyBold,
      flex: 4,
      marginBottom: 5,
      fontSize: 16,
      lineHeight: 22,
    },
    subTitleText: {
      fontFamily: theme.fontFamilyDefault,
      marginVertical: 5,
    },
    ctaContainer: {
      borderRadius: 15,
      backgroundColor: theme.colors.primary,
      width: '100%',
      paddingHorizontal: 0,
      paddingVertical: 13,
    },
    ctaText: {
      fontFamily: theme.fontFamilyBold,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
      lineHeight: 30,
      color: '#FFFFFF',
    },
    dropDownContainer: {
      borderWidth: 1,
      borderColor: theme.colors.greyOutline,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    listItemContainer: {
      borderWidth: 1,
      borderColor: theme.colors.greyOutline,
      paddingVertical: 10,
    },
    listItemStyle: {
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    },
    labelDeopDown: {
      fontFamily: theme.fontFamilyBold,
      textAlign: 'left',
      fontSize: 14,
    },
    containerDDBox: {
      width: '100%',
      marginTop: 15,
      marginBottom: 20,
    },
    listItemRow: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    seperatePadding: {
      paddingHorizontal: 15,
      paddingVertical: 12,
    },
    listText: {
      fontFamily: theme.fontFamilyBold,
      fontSize: 14,
    },
  });
};
