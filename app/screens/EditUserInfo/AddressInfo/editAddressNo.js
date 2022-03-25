import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { ModalUI } from '@components';
import ErrorMessage from '../ErrorMessage';
import styles, { Container, TextBox, BoxSet, BoxLabel } from '../styles';
import { useHooks } from '../hook';
import i18next from 'i18next';

const EditAddressNo = ({ navigation, route }) => {
  const {
    failModal,
    successModal,
    theme,
    Icon,
    formRef,
    Formik,
    setSuccessModal,
    setFailModal,
    handleSubmitFormAnddress,
  } = useHooks({ navigation });
  const { userAddress } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles(theme).titleAddressContainer}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.goBack()}
        >
          <View>
            <Icon name="chevron-left" color={theme.colors.grey3} size={30} />
          </View>
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles(theme).titleText}>
          {i18next.t('PROFILE_EDIT_INFO_HOUSEINFO')}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Formik
            initialValues={{
              no: userAddress?.no,
              road: userAddress?.road,
              soi: userAddress?.soi,
              village: userAddress?.village,
            }}
            onSubmit={data => {
              route.params.callBack(data);
              navigation.goBack();
            }}
            innerRef={formRef}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              handleBlur,
              touched,
              setFieldValue,
              setFieldTouched,
            }) => (
              <>
                <BoxSet style={{ backgroundColor: 'white' }}>
                  <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                    {i18next.t('PROFILE_EDIT_INFO_ADDRESS')}
                  </BoxLabel>
                  <TextBox
                    customStyle={true}
                    maxLength={30}
                    theme={{ theme: theme.fontFamilyDefault }}
                    keyboardType="default"
                    placeholderTextColor="#cfcfcf"
                    placeholder={i18next.t('PROFILE_EDIT_INFO_BUILDER')}
                    onBlur={handleBlur('no')}
                    onChangeText={handleChange('no')}
                    value={values.no}
                    width="100%"
                  />
                </BoxSet>
                {
                  <ErrorMessage
                    error={errors.noRoadBuild}
                    visible={touched.noRoadBuild}
                  />
                }
                <BoxSet style={{ backgroundColor: 'white' }}>
                  <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                    {i18next.t('PROFILE_EDIT_INFO_VILLAGE')}
                  </BoxLabel>
                  <TextBox
                    customStyle={true}
                    maxLength={30}
                    theme={{ theme: theme.fontFamilyDefault }}
                    keyboardType="default"
                    placeholder={i18next.t('PROFILE_EDIT_INFO_VILLAGE_OPT')}
                    onBlur={handleBlur('village')}
                    onChangeText={handleChange('village')}
                    value={values.village}
                    width="100%"
                  />
                </BoxSet>
                {
                  <ErrorMessage
                    error={errors.village}
                    visible={touched.village}
                  />
                }
                <BoxSet style={{ backgroundColor: 'white' }}>
                  <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                    {i18next.t('PROFILE_EDIT_INFO_ROAD')}
                  </BoxLabel>
                  <TextBox
                    customStyle={true}
                    maxLength={30}
                    theme={{ theme: theme.fontFamilyDefault }}
                    keyboardType="default"
                    placeholderTextColor="#cfcfcf"
                    placeholder={i18next.t('PROFILE_EDIT_INFO_ROAD_OPT')}
                    onBlur={handleBlur('road')}
                    onChangeText={handleChange('road')}
                    value={values.road}
                    width="100%"
                  />
                </BoxSet>
                {<ErrorMessage error={errors.road} visible={touched.road} />}
                <BoxSet style={{ backgroundColor: 'white' }}>
                  <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                    {i18next.t('PROFILE_EDIT_INFO_SOI')}
                  </BoxLabel>
                  <TextBox
                    customStyle={true}
                    maxLength={30}
                    theme={{ theme: theme.fontFamilyDefault }}
                    keyboardType="default"
                    placeholderTextColor="#cfcfcf"
                    placeholder={i18next.t('PROFILE_EDIT_INFO_SOI_OPT')}
                    onBlur={handleBlur('soi')}
                    onChangeText={handleChange('soi')}
                    value={values.soi}
                    width="100%"
                  />
                </BoxSet>
                {<ErrorMessage error={errors.soi} visible={touched.soi} />}
              </>
            )}
          </Formik>
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
          animated="slide"
        />
        <ModalUI
          title={i18next.t('PROFILE_EDIT_INFO_SAVEERR')}
          message={i18next.t('PROFILE_EDIT_INFO_SAVEERR_SUB')}
          buttonText={i18next.t('CONFIRM_BUTTON')}
          navigation={navigation}
          hideLogoModal={false}
          onOpenModal={failModal}
          setIsVisibleModal={modal => setFailModal(modal)}
          onCustomUI={false}
          successModal={false}
          onPress={() => navigation.goBack()}
          animated="slide"
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
          onPress={handleSubmitFormAnddress}
        >
          <Text
            style={{
              fontFamily: theme.fontFamilyDefault,
              fontSize: theme.fontSizeDefault,
              color: theme.colors.white,
              alignSelf: 'center',
            }}
          >
            {i18next.t('CONFIRM_BUTTON')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditAddressNo;
