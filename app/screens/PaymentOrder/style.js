import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images, Button, Text } from '@components';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

export const Container = styled.View`
  padding-bottom: 0;
`;

export const Image = styled(Images)`
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;

export const Selete = styled(Images)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const ButtonAdd = styled(Button)`
  border-radius: 10px;
  margin-top: 20px;
  border-color: grey;
  border-width: 1px;
  background-color: transparent;
`;

export const Total = styled(Text)`
  position: absolute;
  left: 0;
  top: 8px;
`;
export const ViewBox = styled.View`
  border-radius: 10px;
  border-width: 1px;
  border-color: #dedede;
  margin-top: 10px;
  padding: 10px;
  background-color: white;
`;
export const ViewSections = styled.View`
  margin-top: 10px;
  padding: 10px;
  background-color: white;
`;

export const ItemRow = styled.View`
  border-bottom-color: ${BaseColor.lightGrayColor};
  border-bottom-width: 1px;
  flex-direction: row;
  padding-vertical: 12px;
  align-items: center;
`;
export const TextPress = styled(TouchableOpacity)`
  border-radius: 10px;
  border-width: 1px;
  border-color: #dedede;
  margin-top: 10px;
  padding: 10px;
  background-color: white;
`;

export const BoxSet = styled.View`
  border-radius: 10px;
  border-color: #dedede;
  margin-top: 10px;
  background-color: #f6f6f6;
  padding: 10px;
`;
export const ListData = styled.View`
  padding: 10px;
`;
export const HeaderView = styled.View`
  padding: 20px;
`;

const styles = theme =>
  StyleSheet.create({
    iConMoney: {
      borderColor: '#00000060',
      borderWidth: 0.5,
      borderRadius: 5,
      justifyContent: 'center',
      paddingHorizontal: 10,
      padding: 2,
    },
    iconCredit: {
      color: 'black',
      width: 20,
      height: 20,
    },
    linearGradient: {
      backgroundColor: '#00bae5',
      borderBottomLeftRadius: 19,
      borderBottomRightRadius: 19,
      paddingBottom: 8,
      paddingTop: 8,
      marginBottom: 10,
    },
    lineContainer: {
      marginVertical: 15,
      flexDirection: 'row',
    },
    line: {
      backgroundColor: '#E5E5E5',
      height: 1,
      flex: 1,
      alignSelf: 'center',
    },
    makeRow: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
    callContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    callIcon: {
      fontSize: 18,
      marginRight: 8,
      color: '#fff',
    },
    callText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '700',
    },
    timeIcon: {
      fontSize: 18,
      marginRight: 8,
      color: '#535353',
    },
    timeText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#535353',
    },
    confirmText: {
      color: '#0DB779',
      fontWeight: 'bold',
    },
    confirmTextContainer: {
      display: 'flex',
      flex: 1,
      alignItems: 'flex-end',
    },
    appointmentContainer: {
      marginLeft: 25,
      color: '#0DB779',
      marginBottom: 10,
    },
    appoitnmentText: {
      color: '#535353',
      fontSize: 16,
    },
    patientContainer: {
      paddingHorizontal: 20,
    },
    serviceContainer: {
      backgroundColor: 'white',
    },
    serviceIcon: {
      fontSize: 20,
      marginRight: 8,
      color: '#535353',
    },
    serviceText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#535353',
    },
    options: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#C4C4C4',
      padding: 20,
      marginVertical: 10,
      backgroundColor: 'white',
    },
    selectOptions: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#095C3E',
      padding: 20,
      marginVertical: 10,
      backgroundColor: 'white',
    },
    optionText: {
      fontSize: 18,
      color: '#535353',
    },
    selectOptionText: {
      fontSize: 18,
      color: '#ffffff',
    },
    readyToCallContainer: {
      padding: 20,
      shadowRadius: 2,
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowColor: '#000000',
      elevation: 4,
    },
    readyToCallRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    status: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    statusIcon: {
      width: 10,
      height: 10,
      marginRight: 2,
      borderRadius: 50,
    },
    statusText: {
      fontSize: 11,
    },
    sectionContainer: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      marginTop: 10,
      borderRadius: 10,
      shadowColor: Platform.OS === 'android' ? '#000' : '#B2ADAD',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 6,
      padding: 10,
    },
    sectionContentContainer: {
      backgroundColor: 'white',
      marginTop: 10,
      marginHorizontal: 10,
      borderRadius: 10,
      flexDirection: 'row',
      shadowColor: Platform.OS === 'android' ? '#000' : '#B2ADAD',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 6,
      padding: 15,
      paddingBottom: 20,
      alignItems: 'center',
    },
    rowSection: {
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    textPayment: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: 16,
      marginHorizontal: 10,
      lineHeight: 30,
    },
    iconPromptPay: {
      color: 'black',
      width: 40,
      height: 30,
    },
    iconPromptPayCollumn: {
      justifyContent: 'center',
      paddingHorizontal: 0,
      marginTop: 0,
    },
    titleText: {
      lineHeight: 25,
      fontSize: theme.fontSizeSmall,
      fontFamily: theme.fontFamilyBold,
    },
    titleTextSuggest: {
      lineHeight: 25,
      fontSize: theme.fontSizeSmall,
      fontFamily: theme.fontFamilyBold,
      color: '#A9A9A9',
      marginBottom: 0,
      marginVertical: 15,
      marginHorizontal: 10,
      position: 'absolute',
      bottom: 120,
      left: 10,
    },
    Quantity: {
      backgroundColor: '#00BAE510',
      height: 20,
      width: 20,
      alignItems: 'center',
      borderRadius: 5,
      marginVertical: 10,
      marginLeft: 10,
    },
    listName: {
      marginHorizontal: 35,
      marginVertical: 7,
      marginLeft: 15,
    },
    priceList: {
      position: 'absolute',
      right: 20,
      top: 10,
    },
    OrderList: {
      flexDirection: 'row',
      padding: 10,
    },
    sectionOrder: {
      borderColor: '#eeeeee',
      borderWidth: 1,
      borderRadius: 8,
    },
    ViewRow: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ShadowShade: {
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: Platform.OS === 'android' ? '#000' : '#B2ADAD',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.7,
      shadowRadius: 8,

      elevation: 18,
      backgroundColor: '#ffffff',
      position: 'absolute',
      bottom: 60,
      width: '100%',
    },
    DrugListCarousel: {
      backgroundColor: 'white',
      marginHorizontal: 5,
      marginRight: 5,
      borderRadius: 10,
      flexDirection: 'row',
      shadowColor: Platform.OS === 'android' ? '#00000070' : '#B2ADAD',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
      padding: 7,
      alignItems: 'center',
    },
    ExtendRow: {
      marginVertical: 20,
      marginBottom: 20,
    },
    bottomButton: {
      width: '100%',
      borderRadius: 10,
      backgroundColor: '#00bae5',
      padding: 15,
      marginVertical: 10,
    },
    iconBankCollumn: {
      justifyContent: 'center',
      paddingHorizontal: 5,
    },
    iconBanking: {
      color: 'black',
      width: 30,
      height: 30,
    },
    userSymptomWrapper: {
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
      margin: 10,
    },
    userSymptomDescriptionContainer: {
      padding: 10,
      borderWidth: 1,
      marginHorizontal: 10,
      borderRadius: 10,
      marginBottom: 10,
      borderColor: theme.colors.grey5,
    },
    userSymptomImageWrapper: { paddingHorizontal: 10, marginBottom: 10 },
    userSymptomImageContainer: {
      marginVertical: 5,
      overflow: 'hidden',
      borderRadius: 10,
      alignSelf: 'flex-start',
    },
    userSymptomImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 135 / 76,
      resizeMode: 'center',
    },
  });
export default styles;
