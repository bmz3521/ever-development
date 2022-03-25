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
import ClinicProfileComponent from './ClinicProfileComponent';
import ExampleHeaderAnimated from './ExampleHeaderAnimated';

import ImgCarousel from '../../minimal-components/ImgCarousel';
import * as ButtonUI from '../../minimal-components/Button';
import * as IconLabel from '../../minimal-components/IconLabel';
import DoctorHorizontalCard from '../../minimal-components/DoctorHorizontalCard';

import { ClinicActions } from '@actions';
import * as Utils from '@utils';
import UserAvatar from 'react-native-user-avatar';
import { useHooks } from './hooks';

import * as Typography from '../../config/Typography';
import colors from '../../config/colors';
import styled from 'styled-components';

const { width, height } = Dimensions.get('window');

function ClinicProfile(props) {
  const { clinic, navigation, route } = props;
  const {
    ready,
    aboutList,
    aboutMoreCondition,
    locationList,
    locationMoreCondition,
    events,
  } = useHooks(props);

  const deltaY = new Animated.Value(0);
  const [heightHeader, setHeightHeader] = React.useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader;

  let loadingDone = false;

  !ready || clinic.loading ? (loadingDone = false) : (loadingDone = true);

  // console.log(reviewList.map(r => r));

  // const { avatar } = this.props;
  //  if (clinic.error) return <Text>Fetch error: {clinic.error.message}</Text>;

  //  console.log(ready);
  //  console.log(clinic.loading);

  //   if (!ready || clinic.loading) return <View style={{flex: 1}}><View style={styles.fullView}>
  //   <View
  //   />
  //   <View style={styles.blockView}>
  //     <Text style={{ marginBottom: 10 }}>
  //       Test
  //     </Text>
  //     </View>
  //     </View>
  //   </View>
  //   ;
  // console.log(props);

  return (
    <ExampleHeaderAnimated
      navigation={navigation}
      clinic={clinic}
      navigation={navigation}
      route={route}
      ready={ready}
      events={events}
      aboutList={aboutList}
      aboutMoreCondition={aboutMoreCondition}
      locationList={locationList}
      locationMoreCondition={locationMoreCondition}
    />
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicProfile);
