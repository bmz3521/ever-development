import { StyleSheet } from 'react-native';

export default theme => {
  return StyleSheet.create({
    cardContainer: {
      marginVertical: 8,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    innerScrollView: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.grey5,
      paddingHorizontal: 20,
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
  });
};
