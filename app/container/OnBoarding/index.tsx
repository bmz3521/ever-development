import React, { memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Theme from 'app/style/Theme';
import LinearColors from 'app/elements/LinearColors';
import { Colors, Constants, Routes } from 'app/configs';
import OnboardingPage from 'app/patient-components/OnBoarding/OnBoardingPage';
import Animated from 'react-native-reanimated';
import DotProgress from 'app/patient-components/OnBoarding/DotProgress';
import ButtonText from 'app/elements/Buttons/ButtonText';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
const ONBOARDING = [
  {
    id: 1,
    image: '',
    description:
      'เนื่องจากบุคลากรทางการแพทย์และจำนวนยามีจำกัดระบบเราจึงได้จัดสรรค์มาให้ผู้ที่ป่วยโควิด-19เท่านั้น กรุณากดเพื่อยืนยันตัวตนว่าคุณป่วยเป็นโรคโควิด-19จริง',
  },
  {
    id: 2,
    image: '',
    description: '1. ฟรี ปรึกษาแพทย์ออนไลน์และรับใบสั่งยา',
  },
  {
    id: 3,
    image: '',
    description:
      '2. ฟรี ใช้ใบสั่งยาในการรับยาออนไลน์ผ่านเภสัช และส่งยาไปทีี่บ้าน',
  },
  {
    id: 4,
    image: '',
    description:
      '3. ฟรี ติดตามอาการผ่านการคุยกับแพทย์และผู้เชี่ยวชาญทุกวันจนหายดี',
  },
];
interface OnBoardingProps {}

const { Value, event, set } = Animated;

const OnBoarding = memo(({ route }, props: OnBoardingProps) => {
  const scrollX = new Value(0);
  const { navigate } = useNavigation();
  const onLogin = useCallback(() => {
    navigate(Routes.Login);
  }, [navigate]);
  const onSignUp = useCallback(() => {
    const { image, covidFormData } = route.params;
    navigate('TelePayment', { covidFormData, image, roundRobin: true });
  }, [navigate]);
  const onGetHere = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <LinearColors
        style={StyleSheet.absoluteFillObject}
        colors={['#fff', '#fff']}
      >
        <Animated.ScrollView
          horizontal
          snapToInterval={Constants.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={true}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={event([
            {
              nativeEvent: {
                contentOffset: {
                  x: (x: number) => set(scrollX, x),
                },
              },
            },
          ])}
        >
          {ONBOARDING.map((i, index) => (
            <OnboardingPage
              {...i}
              key={i.id.toString()}
              isFirstItem={index === 0}
              isLastItem={index === ONBOARDING.length - 1}
            />
          ))}
        </Animated.ScrollView>
        <DotProgress numberOfDots={ONBOARDING.length} scrollX={scrollX} />

        <ButtonText
          title={'เริ่มการใช้บริการ'}
          style={[
            styles.signUpButton,
            {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,

              elevation: 12,
              color: '#00bae5'
            },
          ]}
          titleColor={'#00bae5'}
          textProps={{ bold: true }}
          onPress={onSignUp}
        />
      </LinearColors>
    </View>
  );
});

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  loginButton: {
    width: (Constants.width - 88) / 2,
    height: 50,
    position: 'absolute',
    bottom: (Constants.height / 812) * 77 + getBottomSpace(),
    left: 32,
  },
  signUpButton: {
    width: (Constants.width - 88) / 2,
    height: 50,
    position: 'absolute',
    bottom: (Constants.height / 812) * 77 + getBottomSpace(),
    right: 32,
    backgroundColor: Colors.White,
  },
  changeApp: {
    position: 'absolute',
    bottom: 16 + getBottomSpace(),
    alignSelf: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    position: 'absolute',
    backgroundColor: '#00bae5',
  },
});
