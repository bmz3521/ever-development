import { StyleSheet } from 'react-native';

export default styles = theme => {
  return StyleSheet.create({
    container: {
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: 30,
    },
    imageIcon: {
      width: 29,
      height: 29,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    progressLineActive: {
      flex: 1,
      height: 5,
      backgroundColor: theme.colors.secondary,
      alignSelf: 'center',
    },
    progressLineInactive: {
      flex: 1,
      height: 5,
      backgroundColor: theme.colors.grey4,
      alignSelf: 'center',
    },
  });
};
