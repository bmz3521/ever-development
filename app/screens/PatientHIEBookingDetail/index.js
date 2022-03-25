import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon, Avatar, useTheme } from 'react-native-elements';
import { BaseStyle, Images } from '@config';
import { SafeAreaView, Header } from '@components';
import { useHooks } from './hooks';
import styles from './styles';
import moment from 'moment';
import i18next from 'i18next';

function PatientHIEBookingDetail({ navigation, route }) {
  moment.locale(i18next.language);
  const { data, actions } = useHooks({
    navigation,
    route,
  });
  const info = route.params.item;
  console.log('info', info);
  const { theme } = useTheme();
  const renderLab = (lab, index) => {
    const isAvailable = lab.data.length > 0;
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={isAvailable ? 0.2 : 1}
        style={styles(theme).labContainer}
        onPress={() => (isAvailable ? actions.onlabPress(lab) : null)}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.fontFamilyDefault }}>
            {lab.data.length ?? 0}
          </Text>
          <Text style={{ fontFamily: theme.fontFamilyDefault }}>items</Text>
        </View>
        <Text style={styles(theme).labType}>{lab.type}</Text>
        {isAvailable ? (
          <Icon style={styles(theme).labIcon} name="chevron-right" />
        ) : null}
      </TouchableOpacity>
    );
  };
  const renderDrug = (prescription, index) => {
    return (
      <TouchableOpacity
        onPress={actions.onDrugPress}
        key={index}
        style={styles(theme).drugListContainert}
      >
        <Text style={styles(theme).drugNumber}>{prescription.qty}x</Text>
        <Text style={styles(theme).drugName}>
          {prescription.drugNondugName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        iconLeftType={'entypo'}
        iconLeft={'chevron-down'}
        containerStyle={{ marginLeft: 8 }}
        onPressLeft={() => navigation.pop()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles(theme).mainContainer}>
          <View style={styles(theme).titleContainer}>
            <View style={styles(theme).titleLabelContainer}>
              <Text style={styles(theme).titleLabel}>
                {info.icd10ThaiName ? info.icd10ThaiName : info.icd10Name}
              </Text>
              <View style={{ flex: 1 }}></View>
            </View>
            <View style={styles(theme).timeStampContainer}>
              <Text style={styles(theme).textStamp}>
                <Text style={{ color: theme.colors.secondary }}>
                  {i18next.t('HISTORYDETAIL_DATE')} :
                </Text>{' '}
                {moment(info.visitDateTime).format('dddd, Do MMMM YYYY')}
              </Text>
              <Text style={styles(theme).textStamp}>
                <Text style={{ color: theme.colors.secondary }}>
                  {i18next.t('HISTORYDETAIL_TIME')} :
                </Text>{' '}
                {`${moment(info.visitDateTime).format('HH:mm')} ${
                  i18next.language === 'th' ? 'น.' : ''
                }`}
              </Text>
              <Text style={styles(theme).textStamp}>
                <Text style={{ color: theme.colors.secondary }}>
                  {i18next.t('HISTORYDETAIL_STATUS')} :
                </Text>{' '}
                {i18next.language === 'th'
                  ? 'การตรวจรักษาเสร็จสิ้น'
                  : 'Complete'}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 45 }}>
            <View style={styles(theme).cardContainer}>
              <View style={styles(theme).doctorDetailContainer}>
                <Avatar
                  source={Images.DoctorPlaceholder}
                  containerStyle={{ margin: 5 }}
                  size="medium"
                  rounded
                />
                <View style={styles(theme).doctorLabelContainer}>
                  <Text style={{ fontFamily: theme.fontFamilyBold }}>
                    {data.doctorName}
                  </Text>
                  <Text style={{ fontFamily: theme.fontFamilyDefault }}>
                    {data.hospName}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {!!data.hospName && (
            <View style={styles(theme).cardContainer}>
              <Text style={styles(theme).labelCard}>
                {' '}
                {i18next.t('HISTORYDETAIL_HOSPITAL_STATUS')}
              </Text>
              <View
                style={[
                  styles(theme).innerContentContainer,
                  { flexDirection: 'row' },
                ]}
              >
                <Image
                  source={Images.hospital}
                  style={{ width: 50, height: 50, marginRight: 16 }}
                />
                <Text style={styles(theme).hospName}>
                  {/* โรงพยาบาลพุธโสธร - สาขาบึงบ้าน 81-2 ซอย */}
                  {data.hospName}
                </Text>
              </View>
            </View>
          )}
          {data.labList.length > 0 ? (
            <View style={styles(theme).cardContainer}>
              <View style={styles(theme).labelCardContainer}>
                <Image
                  source={Images.labResult}
                  style={styles(theme).labelIcon}
                />
                <Text style={styles(theme).cardLabelText}>
                  {i18next.t('HISTORYDETAIL_LABRESULT')}
                </Text>
                {data.labList.length > 4 ? (
                  <TouchableOpacity onPress={actions.onTotalLabHandler}>
                    <Text style={styles(theme).textShowTotal}>
                      {i18next.t('MYBOOKINGUI_SHOW_ALL')}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <ScrollView
                style={[styles(theme).innerScrollView, { maxHeight: 250 }]}
              >
                {data.labList.slice(0, 4).map(renderLab)}
              </ScrollView>
            </View>
          ) : null}
          {data.drugList.length > 0 ? (
            <View style={styles(theme).cardContainer}>
              <View style={styles(theme).labelCardContainer}>
                <Image
                  source={Images.drugList}
                  style={styles(theme).labelIcon}
                />
                <Text style={styles(theme).cardLabelText}>
                  {i18next.t('HISTORYDETAIL_MEDLIST')}
                </Text>
                {data.drugList.length > 4 ? (
                  <TouchableOpacity onPress={actions.onDrugPress}>
                    <Text style={styles(theme).textShowTotal}>
                      {i18next.t('MYBOOKINGUI_SHOW_ALL')}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <ScrollView
                nestedScrollEnabled
                style={{ maxHeight: 250, ...styles(theme).innerScrollView }}
                contentContainerStyle={{ paddingVertical: 10 }}
              >
                {data.drugList.slice(0, 4).map(renderDrug)}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PatientHIEBookingDetail;
