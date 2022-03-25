import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const CustomFallback = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 15,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontFamily: 'Prompt-Regular',
        }}
      >
        Oops!
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'Prompt-Bold',
        }}
      >
        There's and error
      </Text>
      <View style={{ marginTop: 15 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Prompt-Regular',
          }}
        >
          {props.error.toString()}
        </Text>
      </View>

      <TouchableOpacity onPress={props.resetError}>
        <View
          style={{
            width: '100%',
            borderRadius: 20,
            backgroundColor: '#00BAE5',
            paddingVertical: 10,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Prompt-Regular',
              color: '#ffffff',
            }}
          >
            TRY AGAIN
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFallback;
