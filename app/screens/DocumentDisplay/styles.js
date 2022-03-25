import { StyleSheet } from 'react-native';

export default theme => {
  return StyleSheet.create({
    labCardTitle: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      backgroundColor: 'white',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    labCardBody: {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: 'white',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    cardContainer: {
      marginVertical: 8,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    dividerCard: {
      marginTop: 15,
      color: theme.colors.grey5,
    },
    container: {
      flex: 1,
      marginHorizontal: 16,
    },
    presListTitle: {
      marginTop: 10,
      flexDirection: 'row',
      paddingBottom: 10,
      paddingHorizontal: 10,
    },
    presListHead: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginBottom: 10,
    },
    presName: {
      fontFamily: theme.fontFamilyBold,
      flex: 1,
      marginRight: 3,
    },
    despText: {
      fontFamily: theme.fontFamilyDefault,
    },
    labelText: {
      color: theme.colors.grey2,
      fontSize: 12,
      marginBottom: 5,
      fontFamily: theme.fontFamilyDefault,
    },
    labelDrug: { flexDirection: 'row', alignItems: 'flex-start' },
    drugUsageContainer: {
      backgroundColor: '#f3f3f3',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 20,
      marginVertical: 10,
    },
    presDes: {
      fontFamily: theme.fontFamilyDefault,
      flex: 1,
      marginRight: 3,
    },
    titleText: {
      fontFamily: theme.fontFamilyBold,
      fontSize: 16,
    },
  });
};
