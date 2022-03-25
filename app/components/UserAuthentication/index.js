import React from 'react';
import { View, TouchableOpacity, StatusBar, Alert, Text } from 'react-native';

const UserAuthentication = props => {
  const { navigation, title, message, buttonText } = props;
  return (
    <View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{title}</Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc',
            marginHorizontal: 0,
            marginTop: 50,
            marginBottom: 20,
          }}
        />
        <Text style={{ fontSize: 16, marginTop: 5 }}>{message}</Text>
      </View>

      <TouchableOpacity
        full
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          borderRadius: 5,
          backgroundColor: '#00bae5',
          width: '50%',
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text
          bold
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: '#FFFFFF',
          }}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserAuthentication;
