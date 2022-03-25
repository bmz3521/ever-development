import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from '@config';

export default function NetworkError({ onPress }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Images.networkerror} />
      <View style={{ padding: 10 }}>
        <Text>เกิดข้อผิดพลาด!</Text>
        <Text>โปรดลองใหม่อีกครั้ง</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>ลองอีกครั้ง</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: { width: 120, height: 120, borderRadius: 8 },
  button: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
});
