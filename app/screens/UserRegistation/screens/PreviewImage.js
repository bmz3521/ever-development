import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import useBaseStyles from '../styles';
import { SafeAreaView } from '@components';
import { useSelector } from 'react-redux';

const PreviewImage = ({ navigation, route }) => {
  const { edit } = route.params;
  const baseStyles = useBaseStyles();
  const register = useSelector(state => state.register);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{ uri: register.photoImage?.uri }}
      >
        <View
          style={{
            width: '85%',
            height: 10,
            backgroundColor: baseStyles.primaryColor,
          }}
        />

        <TouchableOpacity
          style={[baseStyles.addShadow, baseStyles.backStepButton]}
          onPress={() =>
            navigation.navigate('AuthStack', { screen: 'CameraIdCard' })
          }
        >
          <Icon size={30} name="chevron-left" style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (edit) {
              navigation.navigate('AuthStack', { screen: 'SendRegsiterForm' });
            } else {
              navigation.navigate('AuthStack', { screen: 'PlaceHolderIdCard' });
            }
          }}
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

export default PreviewImage;
