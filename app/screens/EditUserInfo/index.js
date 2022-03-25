import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { BaseStyle } from '@config';
import { SafeAreaView, ModalUI } from '@components';
import { useHooks } from './hook';
import PersonalInfo from './personalInfo';
import AddressInfo from './AddressInfo/anddressInfo';
import i18next from 'i18next';

function EditUserInfo(props) {
  const {
    userAddress,
    userProvince,
    Icon,
    theme,
    formRef,
    checkAddressSave,
    setUserAddress,
    setUserProvince,
    setCheckAddressSave,
  } = useHooks(props);
  const { navigation, route } = props;
  const { editType } = route.params;
  const checkFormSave = userAddress === userProvince;
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.white,
        }}
      >
        <View style={{ paddingVertical: 10 }}>
          <View>
            <Text
              style={{
                fontFamily: theme.fontFamilyBold,
                fontSize: theme.fontSizeDefault,
                textAlign: 'center',
              }}
            >
              {i18next.t('PROFILE_EDIT_INFO_HEADER')}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              padding: 5,
              borderRadius: 15,
              marginVertical: 5,
              backgroundColor: theme.colors.grey4,
            }}
            onPress={() => {
              if (userAddress === userProvince) {
                navigation.goBack();
              } else {
                setCheckAddressSave(true);
              }
            }}
          >
            <View>
              <Icon
                type="material-community"
                name="close"
                color={theme.colors.white}
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {editType === 'personalInfo' ? (
            <PersonalInfo navigation={navigation} />
          ) : editType === 'address' ? (
            <AddressInfo
              updateAddressNo={data => setUserAddress(data)}
              updateUserProvince={data => setUserProvince(data)}
              formRef={formRef}
              navigation={navigation}
              userAddress={userAddress}
              userProvince={userProvince}
              checkFormSave={checkFormSave}
            />
          ) : (
            <View>
              <Text>NOTHING</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <ModalUI
        title={i18next.t('PROFILE_EDIT_INFO_TITLE')}
        message={i18next.t('PROFILE_EDIT_INFO_SUBTITLE')}
        buttonText=""
        navigation={navigation}
        hideLogoModal={true}
        onOpenModal={checkAddressSave}
        setIsVisibleModal={modal => setCheckAddressSave(modal)}
        onCustomUI={false}
        successModal={false}
        onPress={() => navigation.goBack()}
        animated="slide"
        cancelButton={true}
      />
    </SafeAreaView>
  );
}

export default EditUserInfo;
