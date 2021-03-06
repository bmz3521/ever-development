import { StyleSheet } from 'react-native';

const styles = theme =>
  StyleSheet.create({
    linearGradient: {
      backgroundColor: '#00bae5',
      borderBottomLeftRadius: 19,
      borderBottomRightRadius: 19,
      paddingBottom: 8,
      paddingTop: 8,
      marginBottom: 10,
    },
    headerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      marginBottom: 80,
    },
    row: {
      flexDirection: 'row',
    },
    card: {
      backgroundColor: '#fff',
      paddingLeft: 25,
      paddingRight: 25,
      marginBottom: 25,
      paddingTop: 10,
      alignItems: 'center',
    },
    imageContainer: {
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 1, height: 7 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
      marginBottom: 15,
    },
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 5,
      borderColor: '#fff',
    },
    name: {
      textAlign: 'center',
      marginRight: 20,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#00bae5',
    },
    ageContainer: {
      paddingBottom: 20,
    },
    age: {
      textAlign: 'center',
      marginTop: 2,
      fontSize: 14,
      color: '#A2A2A2',
    },
    icon: {
      fontSize: 18,
      width: 25,
      color: '#00bae5',
    },
    mainContainer: {
      marginLeft: 5,
      marginRight: 5,
      flex: 1,
    },
    resultContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 15,
      flexWrap: 'wrap',
    },
    walkContainer: {
      marginLeft: 8,
      marginRight: 8,
      flex: 1,
      marginTop: 10,
      marginBottom: 25,
    },
    resultBox: {
      height: 120,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 20,
      padding: 10,
      borderRadius: 14,
      backgroundColor: '#fff',
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 1, height: 7 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    walkBox: {
      padding: 10,
      borderRadius: 14,
      backgroundColor: '#fff',
      // shadowColor: theme.colors.shadows,
      // shadowOffset: { width: 1, height: 1 },
      // shadowOpacity: 0.3,
      // elevation: 6,
    },
    valueContainer: {
      alignItems: 'center',
    },
    progress: {
      backgroundColor: '#fff',
    },
    bar: {
      marginHorizontal: 10,
    },
    image: {
      width: 25,
      height: 25,
      resizeMode: 'cover',
      marginRight: 10,
    },
    boxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      flexWrap: 'wrap',
    },
    drugBox: {
      alignItems: 'flex-start',
      height: 100,
      width: '27%',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20,
      padding: 10,
      borderRadius: 14,
      backgroundColor: '#fff',
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 1, height: 7 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    innerBox: {
      width: '100%',
      flex: 1,
    },
    topInner: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    imageDrug: {
      height: 40,
      width: 40,
      resizeMode: 'contain',
    },
    smallText: {
      fontSize: 9,
      fontFamily: 'Prompt-Regular',
    },
    mediumText: {
      fontSize: 12,
      fontFamily: 'Prompt-Regular',
    },
    IconFit: {
      width: 45,
      height: 45,
    },
    cardFitWrapper: {
      overflow: 'hidden',
      backgroundColor: '#fff',
      marginVertical: 10,
      elevation: 2,
      borderRadius: 15,
      padding: 15,
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerTextFit: {
      flex: 1,
      marginLeft: 7,
    },
    textFit: {
      fontFamily: 'Prompt-Regular',
      color: '#222',
      fontSize: 13,
    },
  });

export default styles;
