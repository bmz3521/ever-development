import { StyleSheet } from 'react-native';

const styles = theme =>
  StyleSheet.create({
    dataContainer: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    image: {
      width: 25,
      height: 25,
      resizeMode: 'cover',
      marginRight: 10,
    },
    leftText: {
      marginTop: 10,
      marginBottom: 5,
    },
    top: {
      marginTop: 20,
    },
    centerText: {
      textAlign: 'center',
    },
    add: {
      flex: 1,
      width: '30%',
      height: 55,
      marginTop: 20,
      padding: 12,
      paddingRight: 5,
      marginRight: 20,
      borderRadius: 12,
      alignSelf: 'flex-end',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    saveIcon: {
      fontSize: 30,
      marginLeft: 5,
      marginRight: 14,
      color: '#fff',
    },
    unsaveIcon: {
      fontSize: 30,
      marginLeft: 5,
      marginRight: 14,
      color: '#ccc',
    },
    save: {
      flex: 1,
      height: 50,
      marginTop: 10,
      padding: 12,
      borderRadius: 20,
      alignItems: 'center',
      backgroundColor: '#00bae5',
    },
    activityBox: {
      justifyContent: 'center',
      backgroundColor: '#9be6f7',
      borderRadius: 8,
      padding: 15,
      marginVertical: 10,
      margin: 5,
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    err: {
      color: 'red',
      marginBottom: 10,
    },
    valueInsert: {
      fontSize: 22,
      fontFamily: 'Prompt-Regular',
      color: '#0c0c0c',
      backgroundColor: '#fff',
      borderRadius: 8,
      borderColor: '#0ecaf4',
      borderWidth: 1,
      padding: 15,
      marginVertical: 10,
      marginRight: 20,
    },
    withBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
  });

export default styles;
