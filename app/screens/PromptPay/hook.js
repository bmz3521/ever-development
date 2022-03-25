import React from 'react';
import { useState, useRef, useMemo, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { UserActions } from '@actions';
import { uploadProfileImage } from '@services/userInfoService';
import moment from 'moment';
import { ImagePickerManager } from '@utils/imagePickerManager';
import { useTheme, Icon } from 'react-native-elements';
import { getListOrganiztion } from '@services/organizationService';
import Ionics from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import i18next from 'i18next';
i18next.language === 'th' ? moment.locale('th') : moment.locale('en');
const Gender = {
  MALE: 'ชาย',
  FEMALE: 'หญิง',
};
const useHooks = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [listOrg, setListOrg] = useState([]);

  useEffect(() => {
    getOrganizations();
  }, []);
  const getOrganizations = async () => {
    try {
      const response = await getListOrganiztion();
      if (response) {
        const finalData = response.flatMap(val => {
          if (!`${val.name}`.toLocaleLowerCase('en').match(/ever/g)) {
            return {
              label: val.name,
              value: val.id,
            };
          } else {
            return [];
          }
        });
        setListOrg(finalData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const RightHeader = () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListingData', {
          callBack: data => console.log('data callback ====', listOrg[data]),
          title: i18next.t('USERREG_SELECT_SIGNIN'),
          selected: true,
          data: listOrg,
          pageCallback: 'SettingProvider',
        });
      }}
    >
      <Text style={styles(theme).titleText}>เพิ่ม</Text>
    </TouchableOpacity>
  );
  return {
    loading,
    theme,
    RightHeader,
    Ionics,
  };
};

export { useHooks };
