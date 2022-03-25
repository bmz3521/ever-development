import { Platform, StyleSheet } from 'react-native';
import styled from '@emotion/native';

export const ViewSections = styled.View`
  margin-top: 10px;
  padding: 10px;
  background-color: white;
`;

const styles = theme =>
  StyleSheet.create({
    sectionContainer: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius: 10,
      shadowColor: Platform.OS === 'android' ? '#000' : '#B2ADAD',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 6,
    },
    viewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    iconMoney: {
      borderColor: '#00000060',
      borderWidth: 0.5,
      borderRadius: 5,
      justifyContent: 'center',
      paddingHorizontal: 8,
      padding: 2,
      marginRight: 5,
    },
    iconCredit: {
      color: 'black',
      width: 15,
      height: 15,
    },
    iconBankColumn: {
      justifyContent: 'center',
      paddingHorizontal: 5,
    },
    iconBanking: {
      color: 'black',
      width: 20,
      height: 20,
    },
    iconPromptPay: {
      color: 'black',
      width: 20,
      height: 15,
    },
    iconPromptPayColumn: {
      justifyContent: 'center',
      paddingHorizontal: 0,
      marginTop: 0,
    },
  });

export default styles;
