import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { BaseStyle, Images } from '@config';
import {
  Header,
  SafeAreaView,
  Image,
  BottomSheetPicker,
  Loading,
  ModalUI,
  ImageViewerModal,
} from '@components';
import styles from './styles';
import { useHooks } from './hook';
import SettingSection from './SettingSection';
import i18next from 'i18next';
function SettingInfo({ navigation }) {
  const {
    userInfo,
    labelInfo,
    theme,
    pickerImageHandler,
    imagePickerRef,
    loading,
    modal,
  } = useHooks();
  const labelInfoText = labelInfo();
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <View style={styles(theme).contentContainer}>
        <Loading isVisible={loading} />

        <Header
          text={i18next.t('SETTINGINFO_PERSONAL_INFO')}
          onPressLeft={() => {
            navigation.pop();
          }}
        />
        <TopContentView
          image={userInfo.img}
          imagePickerRef={imagePickerRef}
          theme={theme}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          bounces={false}
        >
          {labelInfoText.map((value, index) => (
            <SettingSection
              key={index}
              navigation={navigation}
              labelData={value}
            />
          ))}
          <BottomSheetPicker
            file={false}
            onPress={pickerImageHandler}
            ref={imagePickerRef}
          />
        </ScrollView>
        <ModalUI
          title={modal.title}
          message={``}
          buttonText="ตกลง"
          navigation={navigation}
          hideLogoModal={false}
          onOpenModal={modal.visibleModal}
          setIsVisibleModal={modal.setVisibleModal}
          onCustomUI={false}
          successModal={modal.isSuccessModal}
          animated="slide"
        />
      </View>
    </SafeAreaView>
  );
}

const TopContentView = ({ image, imagePickerRef, theme }) => {
  const ViewContent = image ? ImageViewerModal : View;
  return (
    <View style={styles(theme).topCard}>
      <ViewContent images={image}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => imagePickerRef.current?.show()}
          style={styles(theme).iconContainer}
        >
          <Icon
            name="camera"
            size={14}
            type="font-awesome"
            color={'rgba(0,0,0,.54)'}
          />
        </TouchableOpacity>
        {image ? (
          <Image
            style={styles(theme).profile}
            source={{
              uri: image,
            }}
          />
        ) : (
          <Image style={styles(theme).profile} source={Images.avata2} />
        )}
      </ViewContent>
    </View>
  );
};

export default SettingInfo;
