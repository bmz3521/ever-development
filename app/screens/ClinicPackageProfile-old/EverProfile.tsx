import React, { useRef, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Image, FlatList} from "react-native";
import Animated from "react-native-reanimated";
import { onScrollEvent, useValue } from "react-native-redash/lib/module/v1";

import HeaderImage from "./HeaderImage";
import Content, { defaultTabs } from "./Content";
import Header from "./Header";

import { useHooks } from './hooks';
import { ClinicPackageActions } from '@actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ClinicPackageProfile = (props) => {
  const { clinic, navigation, route } = props;
  const {
    ready,
    aboutList,
    aboutMoreCondition,
    locationList,
    locationMoreCondition,
    events,
  } = useHooks(props);

  console.log('ClinicPackageProfile');
  console.log(clinic);

  const scrollView = useRef<Animated.ScrollView>(null);
  const [tabs, setTabs] = useState(defaultTabs);
  const y = useValue(0);
  const onScroll = onScrollEvent({ y });
  return (
    <View style={styles.container}>
      <HeaderImage {...{ y }} />
      <Animated.ScrollView
        ref={scrollView}
        scrollEventThrottle={1}
        {...{ onScroll }}
      >
        <Content
          info={clinic}
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
          {...{ y }}
        />
     
      </Animated.ScrollView>
      <Header {...{ y, tabs, scrollView }} info={clinic}/>
      {/* {clinic && clinic.data && clinic.data.ClinicPhotos.map(photo => <Image 
          style={{  
            zIndex: 99,
            height: 400,
            width: 400,
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'transparent'
          }}
      source={{uri: photo.photo}}/>)} */}

    </View>

  
  );
};

const mapStateToProps = state => {
  return {
    clinic: state.clinicPackage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ClinicPackageActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicPackageProfile);
