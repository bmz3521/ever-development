import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images, Button, Text } from '@components';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

export const Container = styled.View`
  background-color: #fff;
  padding-left: 25px;
  padding-right: 25px;
`;
export const Content = styled.View`
  background-color: #fff;
`;

export const HeaderView = styled.View`
  padding: 20px;
`;

export const Page = styled.View``;

export const TextPress = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 10px;
`;
export const LineStraight = styled.View`
  border-bottom-color: #dedede;
  border-bottom-width: 1px;
  padding-top: 0px;
  margin-left: 20px;
  margin-right: 20px;
`;
export const ListData = styled.View`
  padding: 10px;
`;

export const ViewSections = styled.View`
  margin-top: 10px;
  padding: 10px;
  background-color: white;
`;

export default StyleSheet.create({
  iConMoney: {
    borderColor: '#00000060',
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    padding: 2,
  },
  buttonAddCredit: {
    // flex:1,
    width: '95%',
    borderRadius: 20,
    backgroundColor: '#00bae5',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    position: 'absolute',
    top: 0,
  },
  icon: {
    color: 'black',
    width: 20,
    height: 20,
  },
  iconCredit: {
    color: 'black',
    width: 20,
    height: 20,
  },
  iconBankCollumn: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  iconPromptPayCollumn: {
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginTop: 0,
  },
  iconBanking: {
    color: 'black',
    width: 30,
    height: 30,
  },
  iconPromptPay: {
    color: 'black',
    width: 40,
    height: 30,
  },
  containerBottom: {
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ? '#000' : '#B2ADAD',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 18,
  },
  container: {
    flex: 1,
  },
  panel: {
    // flex: 1,
    elevation: 18,
    backgroundColor: 'white',
  },
  panelHeader: {
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: Platform.OS === 'android' ? '#000' : '#B2ADAD',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 8,

    elevation: 18,
  },
  textHeader: {
    fontSize: 28,
    color: '#FFF',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#2b8a3e',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },
  ViewRow: {
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
  },
  titleText: {
    marginTop: 16,
  },
  outerOverlay: {
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  deleteButton: {
    backgroundColor: '#BB362C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    right: 0,
  },
  bottomButton: {
    width: '95%',
    borderRadius: 20,
    backgroundColor: '#00bae5',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  iconDelete: {
    width: 30,
    height: 30,
  },
});
