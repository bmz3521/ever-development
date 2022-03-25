import { StyleSheet, Platform } from 'react-native';

const styles = theme =>
  StyleSheet.create({
    scrollView: { backgroundColor: 'white', borderRadius: 30, flex: 1 },
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
    container: {
      backgroundColor: 'white',
    },
    itemStyleTitle: {
      fontSize: 14,
      alignItems: 'center',
      textAlignVertical: 'center',
    },
    itemStyle: {
      fontSize: 14,
      alignItems: 'center',
      textAlignVertical: 'center',
    },
    searchSectionBottom: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 5,
      elevation: 4,

      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,

      marginHorizontal: 30,
      height: 70,
      borderWidth: 1,

      borderColor: '#F2F2F2',
      backgroundColor: '#FFFFFF',
      marginBottom: 10,
      width: 300,

      alignSelf: 'center',

      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    searchSection: {
      marginTop: -30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 5,
      elevation: 4,

      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,

      height: 70,
      width: 300,

      alignSelf: 'center',

      borderWidth: 1,
      borderColor: '# F2F2F2',
      backgroundColor: '#FFFFFF',

      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    searchIcon: {
      padding: 10,
      paddingLeft: 20,
      flex: 0.1,
    },
    textInputStyle: {
      flex: 0.8,
    },
    closeIcon: {
      padding: 10,
      paddingRight: 0,
      flex: 0.05,
    },

    input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
    },
  });

export default styles;
