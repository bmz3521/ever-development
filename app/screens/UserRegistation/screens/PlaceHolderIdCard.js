import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import pictureOfCard from '../assets/IDcard.png';
import { Icon } from 'react-native-elements';
import useBaseStyles from '../styles';
import ProgressCircle from '../components/ProgressCircle';
import { SafeAreaView, Header, Text } from '@components';
import i18next from 'i18next';

const PlaceHolderIdCard = ({ navigation }) => {
  const baseStyles = useBaseStyles();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        text={i18next.t('USERREG_REGISTER')}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={baseStyles.contain}>
          <View style={baseStyles.formTitleContainer}>
            <View style={{ flex: 2, padding: 10 }}>
              <Text type="body2">{i18next.t('USERREG_PIC_WIDCARD3')}</Text>
            </View>
            <ProgressCircle percent={100} label={'4/4'} />
          </View>
          <View>
            <View
              style={{
                flexGrow: 1,
              }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  marginHorizontal: 10,
                }}
              >
                <Image
                  resizeMode="contain"
                  source={pictureOfCard}
                  style={baseStyles.placeHolderImage}
                />
              </View>
            </View>
          </View>
          <View style={baseStyles.textInputContainer}>
            <View style={{ ...baseStyles.fieldSet, borderWidth: 0 }}>
              <Text
                type="h6"
                style={{
                  textAlign: 'center',
                  backgroundColor: baseStyles.whiteColor,
                }}
              >
                {i18next.t('USERREG_RULE_WIDCARD2')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              baseStyles.selectButton,
              baseStyles.addShadow,
              { backgroundColor: baseStyles.primaryColor, marginTop: 20 },
            ]}
            onPress={() =>
              navigation.navigate('AuthStack', {
                screen: 'CameraIdCard',
                params: { takeIdCard: true },
              })
            }
          >
            <Icon
              name="camera"
              size={30}
              style={{ color: baseStyles.whiteColor }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceHolderIdCard;
