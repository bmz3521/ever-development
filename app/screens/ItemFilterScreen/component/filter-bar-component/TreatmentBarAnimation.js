import React from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
  SectionList,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  PanResponder,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import TreatmentFilterOptions from './TreatmentFilterOptions.js';

function TreatmentBarAnimation() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  // const onTap = (boolean) => {
  //   onTapFilter(boolean);
  // }

  return (
    <>
      {/* <TreatmentFilterOptions onTapFilter={onTapFilter} /> */}
      <Animated.View style={[styles.box, animatedStyles]}>
        <ScrollView
          horizontal
          nestedScrollEnabled
          contentContainerStyle={{ justifyContent: 'center' }}
          style={{
            height: 60,
            width: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            top: 132,
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            style={styles.filterPills}
            onPress={() => onTap(true)}
          >
            <Text style={{ fontSize: 12, color: 'black', lineHeight: 26 }}>
              Length of stay
            </Text>
            <Icon
              name="chevron-down"
              style={[styles.titleIcon, { color: '#000', marginLeft: 10 }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterPills}
            // onPress={() => this.openModal(true)}
          >
            <Text style={{ fontSize: 12, color: 'black', lineHeight: 26 }}>
              Length of stay
            </Text>
            <Icon
              name="chevron-down"
              style={[styles.titleIcon, { color: '#000', marginLeft: 10 }]}
            />
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterPills: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 20,
    height: 30,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#333',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#4D4D4D',
    fontSize: 15,
  },
  sectionItem: {
    height: 50,
    justifyContent: 'center',
    // paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.14,
    shadowRadius: 11.95,

    elevation: 18,
  },
  titleIcon: {},
});

export default TreatmentBarAnimation;
