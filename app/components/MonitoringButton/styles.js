import { StyleSheet, Platform } from 'react-native';

const styles = theme =>
  StyleSheet.create({
    resultBox: {
      height: 160,
      width: '47%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 12,
      borderRadius: 14,
      backgroundColor: '#fff',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 0 },
      shadowOpacity: 0.1,
      elevation: 6,
      justifyContent: 'space-around',
      // borderLeftWidth: 2,
      padding: 0,
      paddingBottom: 15,
      paddingTop: 10,
    },
    valueContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5,
      marginBottom: 5,
    },
  });

export default styles;
