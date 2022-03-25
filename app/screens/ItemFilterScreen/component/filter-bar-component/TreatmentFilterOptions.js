import React, { useState, useMemo, useEffect } from 'react';
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

const TreatmentFilterOptions = ({
  childFunc,
  handleCheckedAccommodation,
  baconIsReadyAccommodation,
  openModal,
  filterApplied,
  clinics,
  filteredPackage,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // const onTapFilter = (boolean) => {
  //   setModalVisible(boolean);
  // }

  React.useEffect(() => {
    childFunc.current = alertUser;
  }, []);

  return (
    <>
      <Modal
        // onBackdropPress={()=> this.openModal(false)}
        isVisible={modalVisible}
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={1}
        animationIn="fadeIn"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={{ backgroundColor: 'white', borderRadius: 15 }}>
          <Text style={{ alignSelf: 'center', paddingVertical: 20 }}>
            Type of Places
          </Text>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: 'grey',
              width: '100%',
              marginBottom: 20,
            }}
          />
          <TouchableOpacity
            onPress={handleCheckedAccommodation}
            style={{
              flexDirection: 'row',
              height: 55,
              marginVertical: 8,
              paddingHorizontal: 30,
              paddingVertical: 5,
            }}
          >
            <View style={{ flex: 0.9, flexDirection: 'column' }}>
              <Text>Accommodation Included</Text>
              <Text style={{ color: 'grey', fontSize: 12 }}>
                Treatment plans with accommodations.
              </Text>
            </View>
            <View style={{ flex: 0.1 }}>
              <CheckBox
                onPress={handleCheckedAccommodation}
                isCheck={baconIsReadyAccommodation}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.handleCheckedAccommodation}
            style={{
              flexDirection: 'row',
              height: 55,
              marginVertical: 8,
              paddingHorizontal: 30,
              paddingVertical: 5,
            }}
          >
            <View style={{ flex: 0.9, flexDirection: 'column' }}>
              <Text>Post-care services</Text>
              <Text style={{ color: 'grey', fontSize: 12 }}>
                Treatment have ongoing post-treatment services on-site and at
                home
              </Text>
            </View>
            <View style={{ flex: 0.1 }}>
              <CheckBox
                onPress={this.handleCheckedAccommodation}
                isCheck={this.state.baconIsReadyAccommodation}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.handleCheckedAccommodation}
            style={{
              flexDirection: 'row',
              height: 55,
              marginVertical: 8,
              paddingHorizontal: 30,
              paddingVertical: 5,
            }}
          >
            <View style={{ flex: 0.9, flexDirection: 'column' }}>
              <Text>Include transportation</Text>
              <Text style={{ color: 'grey', fontSize: 12 }}>
                Treatment plans that include airport or pickup services
              </Text>
            </View>
            <View style={{ flex: 0.1 }}>
              <CheckBox
                onPress={this.handleCheckedAccommodation}
                isCheck={this.state.baconIsReadyAccommodation}
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: 'grey',
              width: '100%',
              marginTop: 10,
              marginBottom: 15,
            }}
          />

          <TouchableOpacity
            onPress={this.showPackage}
            style={{
              backgroundColor: '#00bae5',
              height: 42,
              width: 150,
              borderRadius: 8,
              alignSelf: 'flex-end',
              bottom: 0,
              marginBottom: 15,
              marginRight: 15,
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                color: 'white',
                lineHeight: 42,
              }}
            >
              {filterApplied <= 0
                ? `Show ${clinics}`
                : `Show ${filteredPackage}`}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

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

export default TreatmentFilterOptions;
