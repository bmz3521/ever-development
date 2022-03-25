import { StyleSheet, TouchableOpacity } from 'react-native';
import { BaseColor, Typography, FontWeight } from '@config';
import styled from '@emotion/native';

export const Container = styled.View`
  background-color: #fff;
  padding-left: 25px;
  padding-right: 25px;
`;
export const Content = styled.View`
  background-color: #fff;
  padding: 10px;
`;

export const Header = styled.View``;

export const Page = styled.SafeAreaView`
  flex: 1;
`;

export const TextPress = styled(TouchableOpacity)``;

export const ListData = styled.View`
  padding: 10px;
  border-bottom-color: #dedede;
  border-bottom-width: 1px;
`;
