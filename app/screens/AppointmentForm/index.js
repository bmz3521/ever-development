import React, { useRef } from 'react';
import i18next from 'i18next';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Button, useTheme, Icon } from 'react-native-elements';
import RNTextArea from '@freakycoder/react-native-text-area';
import { BaseStyle } from '@config';
import {
  Header,
  BottomSheetPicker,
  Loading,
  ImageViewerModal,
} from '@components';
import moment from 'moment';
import DoctorCard from 'app/components/DoctorCard';
import { useHooks } from './hooks';
import styles from './styles';

export default function AppointmentForm(props) {
  const { actions, loading, imageUrl, practitioner, bookingData } = useHooks(
    props,
  );
  const { navigation } = props;
  const { theme } = useTheme();
  const imagePickerRef = useRef();

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <BottomSheetPicker
        file={false}
        onPress={actions.uploadImage}
        ref={imagePickerRef}
      />
      <Loading isVisible={loading} />
      <Header
        text={i18next.t('APPOINTMENT_FORM_SUMMARY')}
        onPressLeft={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignContent: 'space-between',
          backgroundColor: theme.colors.grey5,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ margin: 10 }}>
            <DoctorCard
              practitioner={practitioner}
              bookingCategory={bookingData.bookingCategory}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              backgroundColor: theme.colors.white,
              padding: 10,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: theme.fontFamilyDefault,
                  fontSize: theme.fontSizeSmaller,
                  color: theme.colors.primary,
                }}
              >
                {`${i18next.t('APPOINTMENT_FORM_DATE')} : `}
              </Text>
              <Text
                style={{
                  fontFamily: theme.fontFamilyDefault,
                  fontSize: theme.fontSizeSmaller,
                  color: theme.colors.grey3,
                }}
                numberOfLines={2}
              >
                {moment(bookingData.admitTime)
                  .locale(i18next.language)
                  .format('dddd, Do MMMM YYYY')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: theme.fontFamilyDefault,
                  fontSize: theme.fontSizeSmaller,
                  color: theme.colors.primary,
                }}
              >
                {`${i18next.t('APPOINTMENT_FORM_TIME')} : `}
              </Text>
              <Text
                style={{
                  fontFamily: theme.fontFamilyDefault,
                  fontSize: theme.fontSizeSmaller,
                  color: theme.colors.grey3,
                }}
                numberOfLines={2}
              >
                {`${moment(bookingData.admitTime).format('HH:mm')} ${
                  i18next.language == 'th' ? 'น.' : ''
                }`}
              </Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <RNTextArea
              style={{
                justifyContent: 'flex-start',
                textAlignVertical: 'top',
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              maxCharLimit={500}
              placeholderTextColor={theme.colors.grey3}
              exceedCharCountColor={theme.colors.grey2}
              placeholder={i18next.t('APPOINTMENT_FORM_SYMPTOMS')}
              textInputStyle={{
                fontFamily: theme.fontFamilyDefault,
              }}
              onChangeText={actions.setNote}
              textAlignVertical="top"
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                margin: 5,
                fontFamily: theme.fontFamilyDefault,
                fontSize: theme.fontSizeSmaller,
              }}
            >
              {i18next.t('APPOINTMENT_FORM_UPLOAD')}{' '}
              <Text style={{ color: theme.colors.grey2, fontSize: 12 }}>
                {`(${i18next.t('APPOINTMENT_FORM_RESTRICT')})`}
              </Text>
            </Text>
            {imageUrl ? (
              <ImageViewerModal
                images={imageUrl}
                onLongPress={actions.onLoongPress}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.imageStyles}
                  />
                </View>
              </ImageViewerModal>
            ) : (
              <TouchableOpacity
                onPress={() => imagePickerRef.current.show()}
                style={styles.addImageBtn}
              >
                <Icon
                  name="plus"
                  color={theme.colors.primary}
                  type="entypo"
                  size={40}
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopColor: '#f5f5f5',
            borderTopWidth: 3,
            backgroundColor: theme.colors.white,
          }}
        >
          <Button
            type="solid"
            title={i18next.t('APPOINTMENT_FORM_NEXT')}
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              borderColor: '#fff',
              borderWidth: 1,
            }}
            titleStyle={{
              fontSize: theme.fontSizeDefault,
              fontFamily: theme.fontFamilyBold,
              color: theme.colors.white,
            }}
            onPress={actions.submit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
