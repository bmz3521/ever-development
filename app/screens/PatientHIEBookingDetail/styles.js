import { StyleSheet, PixelRatio } from 'react-native';

export default theme => {
  return StyleSheet.create({
    mainContainer: {
      marginHorizontal: 16,
      marginBottom: 16,
    },
    titleContainer: {
      paddingHorizontal: 10,
    },
    titleLabelContainer: {
      margin: 16,
      flexDirection: 'row',
    },
    titleLabel: {
      fontFamily: theme.fontFamilyBold,
      fontSize: 24,
      flex: 4,
    },
    textShowTotal: {
      color: theme.colors.primary,
      fontFamily: theme.fontFamilyBold,
      fontSize: 14,
    },
    timeStampContainer: {
      marginHorizontal: 16,
    },
    textStamp: {
      fontFamily: theme.fontFamilyDefault,
    },
    doctorDetailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
    },
    labelCard: { fontFamily: theme.fontFamilyBold, marginBottom: 10 },
    innerContentContainer: {
      flex: 1,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.grey5,
      padding: 15,
      alignItems: 'center',
    },
    innerScrollView: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.grey5,
      paddingHorizontal: 20,
    },
    doctorLabelContainer: { marginLeft: 13 },
    doctorNoteText: {
      fontSize: 10,
      fontFamily: theme.fontFamilyDefault,
      marginHorizontal: 10,
      marginBottom: 15,
    },
    hospName: { flex: 1, fontFamily: theme.fontFamilyDefault },
    centralContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginHorizontal: 5,
      alignItems: 'center',
    },
    centralText: {
      marginRight: 5,
      color: theme.colors.grey3,
      fontFamily: theme.fontFamilyDefault,
    },
    labelCardContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    labelIcon: { width: 20, height: 20 },
    cardLabelText: {
      fontFamily: theme.fontFamilyBold,
      marginBottom: 10,
      flex: 1,
      marginLeft: 10,
    },
    drugListContainert: { flex: 1, flexDirection: 'row', marginVertical: 16 },
    drugNumber: { fontFamily: theme.fontFamilyDefault, flex: 1 },
    drugName: {
      fontFamily: theme.fontFamilyDefault,
      flex: 4,
      marginHorizontal: 5,
    },
    labContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
    },
    labIcon: { flex: 1, justifyContent: 'center' },
    labType: {
      fontFamily: theme.fontFamilyDefault,
      flex: 3,
      marginHorizontal: 5,
    },
    cardContainer: {
      padding: 10,
      marginVertical: 8,
      margin: 1,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
  });
};
