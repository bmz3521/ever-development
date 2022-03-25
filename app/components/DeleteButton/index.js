import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from '@components';
import { Images } from '@config';
function DeleteButton({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.iconDelete} source={Images.Trash} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BB362C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    right: 0,
  },
  iconDelete: {
    width: 30,
    height: 30,
  },
});

export default DeleteButton;
