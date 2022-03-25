import styled from '@emotion/native';
import { StyleSheet } from 'react-native';

export const styles = theme =>
  StyleSheet.create({
    titleText: {
      fontFamily: theme.fontFamilyBold,
      fontSize: theme.fontSizeDefault,
      textAlign: 'center',
    },
    backIcon: {
      position: 'absolute',
      left: 10,
    },
    modalTitle: {
      color: 'black',
      marginBottom: 10,
      textAlign: 'center',
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 10,
      fontFamily: theme.fontFamilyBold,
      fontSize: theme.fontSizeSmall,
    },
    buttonTextAdd: {
      color: 'white',
      fontFamily: theme.fontFamilyBold,
      fontSize: theme.fontSizeDefault,
    },
    modalButtonContainer: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      padding: 12,
      borderRadius: 15,
    },
    contentText: {
      lineHeight: 24,
      fontFamily: theme.fontFamilyDefault,
      fontSize: 16,
    },
    emptyContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeDefault,
      textAlign: 'center',
    },
  });

export const Container = styled.View`
  background-color: #fff;
  padding-left: 25px;
  padding-right: 25px;
`;

export const ListData = styled.View`
  padding: 10px;
  border-bottom-color: #dedede;
  border-bottom-width: 1px;
`;
