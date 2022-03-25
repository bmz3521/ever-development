import { Dimensions, StyleSheet } from 'react-native';

const styles = theme =>
  StyleSheet.create({
    listContainer: {
      margin: 20,
      padding: 10,
      borderRadius: 14,
      backgroundColor: '#fff',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    left: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    right: {
      justifyContent: 'center',
    },
    image: {
      width: 25,
      height: 25,
      resizeMode: 'cover',
      marginRight: 10,
    },
    leftText: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Prompt-Regular',
    },
    rightText: {
      color: '#00bae5',
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    leftValue: {
      fontFamily: 'Prompt-Regular',
      fontSize: 19,
      fontWeight: 'bold',
      color: '#535353',
    },
    leftMeasurement: {
      fontFamily: 'Prompt-Regular',
      fontSize: 14,
      fontWeight: 'normal',
      color: '#535353',
    },
    result: {
      fontFamily: 'Prompt-Regular',
      fontSize: 16,
      fontWeight: 'bold',
    },
    lineContainer: {
      marginVertical: 3,
      flexDirection: 'row',
    },
    line: {
      backgroundColor: '#E5E5E5',
      height: 1,
      flex: 1,
      alignSelf: 'center',
    },
    addContainer: {
      flex: 1,
    },
    add: {
      width: 60,
      backgroundColor: '#00bae5',
      alignItems: 'center',
      alignSelf: 'flex-end',
      marginVertical: 10,
      padding: 5,
      borderRadius: 10,
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 1, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 6,
    },
    buttonText: {
      fontFamily: 'Prompt-Regular',
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
    dateAndActivity: {
      flex: 1,
      marginRight: 10,
    },
    resultAndDelete: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 186, 229, .2)',
    },
    modalView: {
      alignItems: 'center',
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    okIcon: {
      color: '#0AB678',
      textAlign: 'center',
      marginBottom: 10,
    },
    addModal: {
      marginTop: 10,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 15,
      borderRadius: 20,
      marginHorizontal: 10,
    },
    buttonTextAdd: {
      color: 'white',
      fontSize: 20,
      paddingHorizontal: 15,
      fontWeight: 'bold',
      fontFamily: 'Prompt-Regular',
    },
    buttonTextDelete: {
      color: 'white',
      fontSize: 20,
      paddingHorizontal: 2,
      fontWeight: 'bold',
      fontFamily: 'Prompt-Regular',
    },
    modalTitle: {
      fontSize: 20,
      fontFamily: 'Prompt-Regular',
      fontWeight: '600',
      color: '#CC4343',
      marginBottom: 10,
      textAlign: 'center',
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    modalText: {
      fontFamily: 'Prompt-Regular',
      fontSize: 14,
      color: '#CC4343',
      textAlign: 'center',
    },
  });

export default styles;
