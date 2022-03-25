import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SvgUri from 'react-native-fast-svg';
import { BaseStyle, BaseColor, Images } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Image,
  StarRating,
  ReviewItem,
  Button,
} from '@components';
import DoctorProfile from './DoctorProfile';
import ExampleHeaderAnimated from './ExampleHeaderAnimated';

import ImgCarousel from '../../minimal-components/ImgCarousel';
import * as ButtonUI from '../../minimal-components/Button';
import * as IconLabel from '../../minimal-components/IconLabel';
import DoctorHorizontalCard from '../../minimal-components/DoctorHorizontalCard';

import { ClinicActions } from '@actions';
import * as Utils from '@utils';
import UserAvatar from 'react-native-user-avatar';

import * as Typography from '../../config/Typography';
import colors from '../../config/colors';
import styled from 'styled-components';

const { width, height } = Dimensions.get('window');

function TeleDoctorProfile({ props, navigation }) {
  const deltaY = new Animated.Value(0);
  const [heightHeader, setHeightHeader] = React.useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(250, 1);

  return <ExampleHeaderAnimated navigation={navigation} />;
}

const mapStateToProps = state => {
  return {
    clinic: state.clinic,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ClinicActions, dispatch),
  };
};

const Reserve = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.faintgray};
  background-color: white;
`;

const BtnContainer = styled.View`
  width: 50%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(TeleDoctorProfile);
