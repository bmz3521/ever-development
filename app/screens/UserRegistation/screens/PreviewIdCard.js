import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from '@components';
import useBaseStyles from '../styles';
import { useSelector } from 'react-redux';

const PreviewIdCard = ({ navigation }) => {
  const baseStyles = useBaseStyles();
  const register = useSelector(state => state.register);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{ uri: register.photoIdCard?.uri }}
      >
        <View
          style={{
            width: '92%',
            height: 10,
            backgroundColor: baseStyles.primaryColor,
          }}
        />

        <TouchableOpacity
          style={[baseStyles.addShadow, baseStyles.backStepButton]}
          onPress={() =>
            navigation.navigate('AuthStack', {
              screen: 'CameraIdCard',
              params: { takeIdCard: true },
            })
          }
        >
          <Icon size={30} name="chevron-left" style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AuthStack', { screen: 'SendRegsiterForm' })
          }
          style={[
            baseStyles.addShadow,
            baseStyles.takePhotoButton,
            { backgroundColor: baseStyles.primaryColor },
          ]}
        >
          <Icon
            name="check-circle"
            size={30}
            style={{ color: baseStyles.whiteColor, alignSelf: 'center' }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PreviewIdCard;
