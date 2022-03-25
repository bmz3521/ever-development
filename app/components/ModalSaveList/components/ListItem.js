import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles';
import { useTheme } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListItem = ({ item, actions, clinicId }) => {
  const { theme } = useTheme();

  const onPressHandler = async item => {
    try {
      if (item.clinics.find(clinic => clinic.id === clinicId)) {
        await actions.onDeleteItem(item);
      } else {
        await actions.onAddItem(item);
      }
    } catch (err) {
      console.log('error click on save icon');
    }
  };

  return (
    <Animated.View style={styles(theme).listContainer}>
      <Animated.View style={styles(theme).listRowWrapper}>
        <Text style={styles(theme).listName}>{item.name}</Text>
        <TouchableOpacity onPress={() => onPressHandler(item)}>
          {item.clinics.find(clinic => clinic.id === clinicId) ? (
            <Ionicons name="heart" size={20} color={'red'} />
          ) : (
            <Ionicons name="heart-outline" size={20} />
          )}
        </TouchableOpacity>
      </Animated.View>
      <View style={styles(theme).divider} />
    </Animated.View>
  );
};

export default ListItem;
