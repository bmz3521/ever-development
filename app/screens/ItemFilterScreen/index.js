import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { HScrollView } from 'react-native-head-tab-view';
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header';
import ItemFilterScreenHeader from './ItemFilterScreenHeader';
import { useSelector, useDispatch } from 'react-redux';

const FirstRoute = () => (
  <HScrollView index={0}>
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
  </HScrollView>
);

const SecondRoute = () => (
  <HScrollView index={1}>
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  </HScrollView>
);

const initialLayout = { width: Dimensions.get('window').width };

export default function ItemFilterScreen(navigation) {
  const searchReducer = useSelector(state => state.search);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <ItemFilterScreenHeader
      navigation={navigation}
      searchReducer={searchReducer}
    />
    // <CollapsibleHeaderTabView
    //     renderScrollHeader={() => <View style={{ height: 200, backgroundColor: 'red' }} />}
    //     navigationState={{ index, routes }}
    //     renderScene={renderScene}
    //     onIndexChange={setIndex}
    //     initialLayout={initialLayout}
    // />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
