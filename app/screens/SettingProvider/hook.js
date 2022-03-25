import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { alertThirdPartyVerify, checkCIdVerify } from '@utils/alertVerifyUser';
import { useSelector } from 'react-redux';
import { useTheme, Icon } from 'react-native-elements';
import { createSubmissionOrg } from '@services/submissionService';
import {
  getListOrganiztion,
  getRequestStatus,
} from '@services/organizationService';
import i18next from 'i18next';
import moment from 'moment';
import styles from './styles';
import _ from 'lodash';

i18next.language === 'th' ? moment.locale('th') : moment.locale('en');

const useHooks = ({ navigation }) => {
  const { theme } = useTheme();
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const bottomSheetRef = useRef();
  const [listOrg, setListOrg] = useState([]);
  const [listUserOrg, setListUserOrg] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  useEffect(() => {
    getListOrgFromUserData();
  }, []);

  const onSelectOrganization = index => {
    bottomSheetRef?.current?.show();
    setSelectedIndex(index);
  };

  const onDeleteBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsModalVisible(true);
  };

  const cacelOrganizationSub = () => {
    setIsModalVisible(false);
  };

  const getListOrgFromUserData = async () => {
    try {
      const response = await Promise.all([
        getListOrganiztion(),
        getRequestStatus(user.data.userId),
      ]);

      const requestList = Array.isArray(response[1])
        ? response[1].filter(item => !!item.organizationId)
        : [];

      const nameOrgList = _.keyBy(response[0], 'id');
      /** NOTE all of ongoing("approved") list */
      const approvedList = requestList
        .filter(item => item.status === 'approved')
        .map(ele => ({
          header:
            i18next.language === 'th'
              ? nameOrgList[ele.organizationId]?.nameTh ??
                nameOrgList[ele.organizationId]?.name
              : nameOrgList[ele.organizationId]?.name ??
                nameOrgList[ele.organizationId]?.nameTh,
          id: ele.organizationId,
          updatedAt: moment(ele.updatedAt).format('DD/MM/YYYY'),
          message: 'Full Health Record - All Departments',
          status: 'Ongoing connection',
          statusCode: ele.status,
        }));
      const userOrgList = Array.isArray(user.data?.organizations)
        ? user.data?.organizations
        : [];
      const ongoingList = _.uniqBy(
        userOrgList
          .map(ele => ({
            header:
              i18next.language === 'th'
                ? nameOrgList[ele.id]?.nameTh ?? nameOrgList[ele.id]?.name
                : nameOrgList[ele.id]?.name ?? nameOrgList[ele.id]?.nameTh,
            id: ele.id,
            updatedAt: '',
            message: 'Full Health Record - All Departments',
            status: 'Ongoing connection',
            statusCode: 'approved',
          }))
          .concat(approvedList),
        'id',
      );

      /** NOTE all of pending list */
      const pendingList = requestList
        .filter(item => item.status === 'pending')
        .map(ele => ({
          header:
            i18next.language === 'th'
              ? nameOrgList[ele.organizationId]?.nameTh ??
                nameOrgList[ele.organizationId]?.name
              : nameOrgList[ele.organizationId]?.name ??
                nameOrgList[ele.organizationId]?.nameTh,
          id: ele.organizationId,
          updatedAt: moment(ele.updatedAt).format('DD/MM/YYYY'),
          message: 'Full Health Record - All Departments',
          status: 'Pending request',
          statusCode: ele.status,
        }));

      /** NOTE all of rejected list */
      const reserevedRejectedList = _.filter(
        requestList,
        e =>
          e.status === 'rejected' &&
          !pendingList.find(e_pending => e.organizationId === e_pending.id) &&
          !ongoingList.find(e_ongo => e.organizationId === e_ongo.id),
      ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      const rejectedList = _.uniqBy(
        reserevedRejectedList,
        'organizationId',
      ).map(ele => ({
        header:
          i18next.language === 'th'
            ? nameOrgList[ele.organizationId]?.nameTh ??
              nameOrgList[ele.organizationId]?.name
            : nameOrgList[ele.organizationId]?.name ??
              nameOrgList[ele.organizationId]?.nameTh,
        id: ele.organizationId,
        updatedAt: ele.updatedAt,
        message: 'Full Health Record - All Departments',
        status: 'Rejected request',
        statusCode: ele.status,
      }));

      setListUserOrg(_.concat(ongoingList, pendingList, rejectedList));

      /** NOTE List Data to show in add org screen */
      const listData = response[0]
        .filter(
          item =>
            !ongoingList.find(ele => ele.id === item.id) &&
            !pendingList.find(ele => ele.id === item.id) &&
            !`${item.name}`.toLocaleLowerCase('en').match(/ever/g),
        )
        .map(item => ({
          label:
            i18next.language === 'th'
              ? item?.nameTh ?? item?.name
              : item?.name ?? item?.nameTh,
          value: item.id,
          check: false,
        }));

      setListOrg(listData);
    } catch (e) {
      console.log(e);
    }
  };

  const requestOrgFromUser = async (listOrg = []) => {
    try {
      const reqList = listOrg.map(id => createSubmissionOrg(id));
      await Promise.all(reqList);
      getListOrgFromUserData();
    } catch (e) {
      console.log('error', e);
    }
  };

  const RightHeader = () => (
    <TouchableOpacity
      onPress={() => {
        if (!checkCIdVerify(user.data.cId)) {
          alertThirdPartyVerify(() => {
            navigation.navigate('AuthStack', {
              screen: 'InformationForm',
            });
          });
        } else {
          navigation.navigate('ListingData', {
            callBack: data => requestOrgFromUser(data),
            title: i18next.t('PROFILE_EDIT_ORGANIZATIONTITLE'),
            selected: true,
            data: listOrg.map(item => ({ ...item })),
            multiple: true,
            pageCallback: 'SettingProvider',
          });
        }
      }}
    >
      <Text style={styles(theme).titleText}>
        {i18next.t('PROFILE_EDIT_ADD')}
      </Text>
    </TouchableOpacity>
  );
  return {
    isModalVisible,
    theme,
    RightHeader,
    listUserOrg,
    Icon,
    selectedIndex,
    bottomSheetRef,
    actions: {
      cacelOrganizationSub,
      setIsModalVisible,
      onSelectOrganization,
      onDeleteBottomSheet,
    },
  };
};

export { useHooks };
