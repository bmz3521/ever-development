import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ModalUI } from '@components';
import {
  Container,
  TextBox,
  BoxSet,
  BoxLabel,
  TextPress,
  TextBoxValue,
} from '../styles';
import { useHooks } from '../hook';
import i18next from 'i18next';
const AddressInfo = ({
  navigation,
  updateAddressNo,
  updateUserProvince,
  userAddress,
  userProvince,
}) => {
  const {
    failModal,
    successModal,
    theme,
    newPostalCode,
    ChevronRight,
    setSuccessModal,
    setFailModal,
    setUserAddress,
    updateAdressInfo,
    setNewPostalCode,
  } = useHooks({ navigation });

  const addressNo = `${userAddress?.no || ''}  ${userAddress?.village ||
    ''}  ${userAddress?.road || ''}  ซอย ${userAddress?.soi || '-'} `;

  useEffect(() => {
    setNewPostalCode(false);
  }, [userProvince]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <>
            <TextPress
              style={{
                justifyContent: 'flex-start',
                textAlignVertical: 'top',
                height: 120,
                backgroundColor: 'transparent',
              }}
              onPress={() =>
                navigation.navigate('EditAddressNo', {
                  callBack: data => updateAddressNo(data),
                  userAddress,
                })
              }
            >
              <ChevronRight height={45} />
              <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                {i18next.t('PROFILE_EDIT_INFO_HOUSEINFO')}
              </BoxLabel>
              <TextBoxValue theme={{ theme: theme.fontFamilyDefault }}>
                {addressNo}
              </TextBoxValue>
            </TextPress>
            <TextPress
              style={{ backgroundColor: 'transparent' }}
              onPress={() =>
                navigation.navigate('ActiveDataProvince', {
                  callBack: data => updateUserProvince(data),
                  pageCallback: 'EditUserInfo',
                  editType: 'address',
                })
              }
            >
              <ChevronRight height={35} />
              <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                {i18next.t('PROFILE_EDIT_INFO_PDS')}
              </BoxLabel>
              <TextBoxValue
                style={{ height: 80 }}
                theme={{ theme: theme.fontFamilyDefault }}
              >
                {`${userProvince?.province || ''},  ${userProvince?.district ||
                  ''},  ${userProvince?.subDistrict || ''} `}
              </TextBoxValue>
            </TextPress>
            <BoxSet style={{ backgroundColor: 'transparent' }}>
              <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                {i18next.t('PROFILE_EDIT_INFO_POSTAL')}
              </BoxLabel>
              <TextBox
                customStyle={true}
                maxLength={5}
                theme={{ theme: theme.fontFamilyDefault }}
                keyboardType={'numeric'}
                placeholderTextColor="#cfcfcf"
                placeholder={i18next.t('PROFILE_EDIT_INFO_POSTAL')}
                onChangeText={e => setNewPostalCode(e)}
                value={newPostalCode}
                defaultValue={userProvince?.postalCode?.toString()}
                width="100%"
              />
            </BoxSet>
          </>
        </Container>

        <ModalUI
          title={i18next.t('PROFILE_EDIT_INFO_SAVECOMP')}
          message={``}
          buttonText={i18next.t('CONFIRM_BUTTON')}
          navigation={navigation}
          hideLogoModal={false}
          onOpenModal={successModal}
          setIsVisibleModal={modal => setSuccessModal(modal)}
          onCustomUI={false}
          successModal={true}
          animated="fade"
        />
        <ModalUI
          title={i18next.t('PROFILE_EDIT_INFO_SAVEERR')}
          message={i18next.t('PROFILE_EDIT_INFO_SAVEERR_SUB')}
          buttonText={i18next.t('CONFIRM_BUTTON')}
          hideLogoModal={false}
          onOpenModal={failModal}
          setIsVisibleModal={modal => setFailModal(modal)}
          onCustomUI={false}
          successModal={false}
          onPress={() => goBack()}
          animated="fade"
        />
      </ScrollView>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={{
            width: '100%',
            borderRadius: 15,
            backgroundColor: '#00bae5',
            padding: 15,
          }}
          onPress={() => updateAdressInfo(userAddress, userProvince)}
        >
          <Text
            style={{
              fontFamily: theme.fontFamilyDefault,
              fontSize: theme.fontSizeDefault,
              color: theme.colors.white,
              textTransform: 'uppercase',
              alignSelf: 'center',
            }}
          >
            {i18next.t('PROFILE_EDIT_INFO_SAVE')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddressInfo;
