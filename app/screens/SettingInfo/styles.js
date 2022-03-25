import { StyleSheet } from 'react-native';
import { BaseColor, Typography, FontWeight } from '@config';

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#E5E5E545',
    },
    profileItem: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: BaseColor.textSecondaryColor,
      borderBottomWidth: 1,
      paddingBottom: 10,
      paddingTop: 10,
    },
    profile: {
      width: 80,
      height: 80,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    btnProfile: {
      marginBottom: 20,
      marginTop: 20,
    },
    iconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: '#E1E1E1',
      padding: 6,
      borderRadius: 30,
    },
    topCard: {
      paddingVertical: 20,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
    },
    bottomCard: {
      paddingLeft: 25,
      paddingRight: 25,
      backgroundColor: '#fff',
    },
    name: {
      textAlign: 'center',
      color: '#00bae5',
      fontSize: 16,
      fontWeight: 'bold',
    },
    category: {
      padding: 15,
    },
    cText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      paddingBottom: 0,
      fontFamily: theme.fontFamilyDefault,
    },
    textSide: {
      paddingTop: 5,
      fontSize: 12,
      color: '#c5c5c5',
      paddingBottom: 20,
      textAlign: 'right',
    },
    textSide2: {
      paddingTop: 5,
      fontSize: 12,
      color: '#c5c5c5',
    },
    cText2: {
      fontSize: 14,
      color: '#a9a9a9',
      paddingBottom: 10,
      fontFamily: theme.fontFamilyDefault,
    },
    cText3: {
      marginLeft: 5,
      flexShrink: 1,
      fontSize: 14,
      color: '#545454',
      textAlign: 'right',
      fontFamily: theme.fontFamilyDefault,
    },
    dataContainer: {
      marginTop: 10,
      marginBottom: 20,
    },
    formLabel: {
      marginTop: 15,
    },
    add: {
      flex: 1,
      width: '100%',
      height: 50,
      marginTop: 10,
      padding: 12,
      borderRadius: 20,
      alignSelf: 'center',
    },
    buttonTextAdd: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(173, 173, 173, .6)',
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
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
      flexDirection: 'column',
      marginVertical: 20,
    },
    okIcon: {
      color: '#0AB678',
      textAlign: 'center',
      marginBottom: 10,
    },
    errorIcon: {
      textAlign: 'center',
      marginBottom: 10,
      color: '#CC4344',
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: '#CC4343',
      marginBottom: 10,
      textAlign: 'center',
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 10,
    },
    modalText: {
      fontSize: 18,
      color: '#CC4343',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    add: {
      width: '100%',
      height: 50,
      marginTop: 10,
      marginRight: 10,
      marginBottom: 100,
      padding: 12,
      borderRadius: 20,
      alignSelf: 'center',
    },
    SettingSection: {
      marginTop: 15,
      backgroundColor: '#FFFFFF',
    },

    // -----------------------------------

    fieldSet: {
      margin: 10,
      borderRadius: 5,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#dedede',
    },
    legend: {
      position: 'absolute',
      top: -10,
      left: 10,
      fontWeight: 'bold',
      backgroundColor: '#FFFFFF',
    },
    backStepButton: {
      alignSelf: 'center',
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: 'white',
      top: 10,
      left: 10,
      position: 'absolute',
      justifyContent: 'center',
    },
    takePhotoButton: {
      alignSelf: 'center',
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: 'white',
      bottom: 20,
      position: 'absolute',
      justifyContent: 'center',
    },
    addShadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,

      elevation: 11,
    },
    addShadowButton: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,

      elevation: 11,
      borderRadius: 100,
      width: 100,
      height: 100,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    textInput: {
      height: 40,
      backgroundColor: 'white',
      borderRadius: 5,
      marginTop: 10,
      padding: 10,
      width: '100%',
      marginHorizontal: 10,
    },
    contain: {
      flex: 1,
      padding: 0,
      paddingTop: 10,
      width: '100%',
      backgroundColor: '#F5F5F5',
    },
    default: {
      height: 56,
      borderRadius: 28,
      backgroundColor: '#5c9cff',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    selectButton: {
      borderRadius: 100,
      width: 80,
      height: 80,
      backgroundColor: 'white',
      borderColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      alignSelf: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '400',
      textAlign: 'center',
    },
    textDefault: {
      ...Typography.headline,
      color: BaseColor.whiteColor,
      fontWeight: FontWeight.semibold,
    },
    outline: {
      backgroundColor: BaseColor.whiteColor,
      borderWidth: 1,
      borderColor: BaseColor.primaryColor,
    },
    textOuline: {
      color: BaseColor.primaryColor,
    },
    full: {
      width: '100%',
    },
    round: {
      borderRadius: 28,
    },
    progressBarContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    linearGradient: {
      backgroundColor: '#00bae5',
      borderBottomLeftRadius: 19,
      borderBottomRightRadius: 19,
      paddingBottom: 8,
      paddingTop: 8,
    },
    signInGradient: {
      borderRadius: 18,
    },
    container: {
      marginBottom: 35,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    radioText: {
      marginRight: 35,
      fontSize: 16,
      color: '#000',
      fontWeight: '700',
    },
    radioCircle: {
      height: 20,
      width: 20,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: '#3740ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRb: {
      width: 15,
      height: 15,
      borderRadius: 50,
      backgroundColor: '#3740ff',
    },
    result: {
      marginTop: 20,
      color: 'white',
      fontWeight: '600',
      backgroundColor: '#F3FBFE',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    modalView: {
      flex: 1,
      paddingTop: 50,
      backgroundColor: 'white',
      padding: 20,
      alignItems: 'center',
    },
    modalViewSuccess: {
      flex: 1,
      margin: 0,
      backgroundColor: 'white',
    },
    openButton: {
      backgroundColor: '#CC4344',
      marginTop: 15,
      borderRadius: 22,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalComplianceTitle: {
      marginBottom: 20,
      color: '#00bae5',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
    },
    modalSubtitle: {
      marginBottom: 15,
      color: '#00bae5',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
    },
    modalSuccessTitle: {
      marginBottom: 10,
      color: '#00bae5',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 26,
    },
    modalFailureTitle: {
      marginBottom: 15,
      color: '#CC4344',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 26,
    },
    modalText: {
      marginBottom: 3,
      textAlign: 'center',
    },
    congratsContainer: {
      padding: 20,
      alignItems: 'center',
    },
    thankyouContainer: {
      flex: 1,
      backgroundColor: '#f7f7f7',
      marginTop: 20,
      paddingTop: 20,
    },
    RowInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    chevronRight: {
      position: 'absolute',
      right: 0,
      top: -7,
    },
  });

export default styles;