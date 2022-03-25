import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView, Header, Text } from '@components';
import { Icon } from 'react-native-elements';
import selfieWithCard from '../assets/withIDcard.png';
import useBaseStyles from '../styles';
import ProgressCircle from '../components/ProgressCircle';
import i18next from 'i18next';

const PlaceHolderImage = ({ navigation }) => {
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
              <Text type="body2">{i18next.t('USERREG_PIC_WIDCARD')}</Text>
            </View>
            <ProgressCircle percent={75} label={'3/4'} />
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
                  source={selfieWithCard}
                  style={baseStyles.placeHolderImage}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: baseStyles.whiteColor,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View style={baseStyles.fieldSet}>
              <Text
                type="h6"
                style={{
                  position: 'absolute',
                  textAlign: 'center',
                  top: -10,
                  backgroundColor: baseStyles.whiteColor,
                }}
              >
                {i18next.t('USERREG_RULE_WIDCARD')}
              </Text>
              <View style={{ padding: 15, paddingTop: 35 }}>
                <Text type="subTitle3" style={baseStyles.textDescription}>
                  {i18next.t('USERREG_EVER_REVIEW')}
                </Text>
              </View>
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

export default PlaceHolderImage;
