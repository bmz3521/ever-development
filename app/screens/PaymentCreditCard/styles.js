import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseColor, Typography, FontWeight } from '@config';
import styled from '@emotion/native';
import RNTextArea from '@freakycoder/react-native-text-area';
import TextInputCustom from 'app/components/TextInput';

export const ReportErrMsg = styled.Text`
  margin: 10px;
  color: red;
  font-size: 14px;
`;
export const TextBoxValue = styled.Text`
  font-family: ${props => props.theme.theme};
  height: ${props => props.theme.height ?? '110px'};
  background-color: transparent;
  border-radius: 10px;
  margin-top: ${props => props.theme.marginTop ?? '15px'};
  width: 100%;
  font-size: 18px;
  padding-left: 15px;
  padding-right: 30px;
  padding-top: ${props => props.theme.paddingTop ?? '15px'};
  align-self: center;
  border-color: #cccccc;
  color: #545454;
`;
export const HeaderView = styled.View`
  padding: 20px;
`;

export const TextShow = styled.Text`
  font-family: ${props => props.theme.theme};
  height: ${props => props.theme.height ?? '50px'};
  background-color: transparent;
  border-radius: 10px;
  margin-top: ${props => props.theme.marginTop ?? '15px'};
  width: 100%;
  font-size: 18px;
  padding-left: 15px;
  padding-top: ${props => props.theme.paddingTop ?? '15px'};
  align-self: center;
  border-color: #cccccc;
  color: #545454;
`;

export const Container = styled.View`
  background-color: #fff;
  padding-left: 25px;
  padding-right: 25px;
`;

export const TextBox = styled(TextInputCustom)``;

export const TextPress = styled(TouchableOpacity)`
  border-radius: 15px;
  border-width: 1px;
  border-color: #dedede;
  margin-top: 25px;
  background-color: ${props => props.theme.backgroundColor ?? '#f6f6f6'};
`;

export const BoxSet = styled.View`
  border-radius: 10px;
  border-width: 0px;
  border-color: #dedede;
  margin-top: 25px;
  background-color: transparent;
`;

export const BoxLabel = styled.Text`
  font-family: ${props => props.theme.theme} ;
  position: absolute;
  top: 5px;
  left: 10px,
  color: #999999;
  background-color: transparent;
  padding-left: 15px;
  font-size : 14px;
`;
export const RowHalfBox = styled.View`
  flex-direction: row;
  margin-top: 20;
`;
export const HalfBox = styled.View`
  border-radius: 10px;
  border-width: 0px;
  border-color: #dedede;
  background-color: transparent;
  width: 48%;
`;
export const BoxSetCreditCard = styled.View`
  border-radius: 10px;
  border-width: 0px;
  border-color: #dedede;
  background-color: transparent;
`;

export default theme =>
  StyleSheet.create({
    textInputMask: {
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 10,
      width: '100%',
      fontSize: 18,
      paddingLeft: 15,
      alignSelf: 'center',
      borderColor: '#CCCCCC',
      color: '#545454',
      marginVertical: 5,
      fontFamilyDefault: theme.fontFamilyDefault,
    },
    cvvInput: {
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 10,
      width: '100%',
      fontSize: 18,
      paddingLeft: 15,
      paddingTop: Platform.OS === 'android' ? -7 : 15,
      bottom: Platform.OS === 'android' ? -10 : 0,
      borderColor: '#CCCCCC',
      color: '#545454',
      marginVertical: 5,
      fontFamilyDefault: theme.fontFamilyDefault,
    },
    setHalfBox: {
      justifyContent: 'space-between',
    },
    iconCredit: {
      color: 'black',
      width: 55,
      height: 25,
    },
    iConMoney: {
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 5,
    },
    container: {
      flex: 1,
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
      marginBottom: 20,
      marginTop: 20,
      width: 80,
      height: 80,
      borderRadius: 50,
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    topCard: {
      backgroundColor: '#f6f6f6',
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
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      paddingBottom: 20,
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
    },
    cText3: {
      fontSize: 14,
      color: '#545454',
      paddingBottom: 10,
      textAlign: 'right',
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
      backgroundColor: '#f6f6f6',
    },

    // --------------------------------

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
    bottomButton: {
      width: '95%',
      borderRadius: 20,
      backgroundColor: '#00bae5',
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 10,
    },
  });
