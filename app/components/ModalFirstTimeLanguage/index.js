import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { UserActions } from '@actions';
import { INITIAL_LANGUAGE } from '@_config/constants';
import * as AsyncStorage from '@utils/asyncStorage';
import { useTheme, Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import RNRestart from 'react-native-restart';
import styles from './styles';
import { Images } from '@config';
import i18next from 'i18next';

const items = [
  { label: 'ไทย', value: 'th', uri: Images.thailand },
  { label: 'ENGLISH', value: 'en', uri: Images.united_kingdom },
];

const CONFIRM_BUTTON = {
  th: 'ยืนยัน',
  en: 'CONFIRM',
};

const ModalFirstTimeLanguage = ({ setLaguageModal }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(i18next.language);

  const renderItem = useCallback(props => {
    return (
      <TouchableOpacity
        disabled={props.isSelected}
        onPress={() => props.onPress(props.item.value)}
        style={styles(theme).seperatePadding}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles(theme).listItemRow}>
            <Image source={props.item.uri} style={{ marginRight: 10 }} />
            <Text style={styles(theme).listText}>{props.item.label}</Text>
          </View>
          {props.isSelected && (
            <Icon name="check" color={theme.colors.secondary} />
          )}
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderArrowUpIcon = () => (
    <Icon
      type="font-awesome-5"
      name="chevron-up"
      color={theme.colors.greyOutline}
    />
  );

  const renderArrowDownIcon = () => (
    <Icon
      type="font-awesome-5"
      name="chevron-down"
      color={theme.colors.greyOutline}
    />
  );

  const changeLanguageHandler = useCallback(async () => {
    if (value === i18next.language) {
      dispatch(
        UserActions.updateUserSettingLocal({ language: i18next.language }),
      );
      await AsyncStorage.setItem(INITIAL_LANGUAGE, false);
      setLaguageModal(false);
      return;
    }
    dispatch(UserActions.updateUserSettingLocal({ language: value }));
    i18next.changeLanguage(value);
    await AsyncStorage.setItem(INITIAL_LANGUAGE, false);
    setTimeout(() => RNRestart.Restart(), 300);
  }, [value, i18next.language]);

  return (
    <Modal visible={true} transparent>
      <View style={styles(theme).modalContainer}>
        <SafeAreaView style={styles(theme).innerContainer}>
          <View style={styles(theme).bodyContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles(theme).titleStyles}>
                Please select a language before proceeding
              </Text>
              <View style={{ flex: 1 }} />
            </View>
            <Text style={styles(theme).subTitleText}>
              Language options: Thai, English
            </Text>
            <DropDownPicker
              dropDownStyle={styles(theme).listItemStyle}
              open={open}
              value={value}
              onSelectItem={setValue}
              items={items}
              setOpen={setOpen}
              containerStyle={styles(theme).containerDDBox}
              placeholder={value}
              showTickIcon
              ArrowDownIconComponent={renderArrowDownIcon}
              ArrowUpIconComponent={renderArrowUpIcon}
              style={styles(theme).dropDownContainer}
              renderListItem={renderItem}
              dropDownContainerStyle={styles(theme).listItemContainer}
              labelStyle={styles(theme).labelDeopDown}
              closeAfterSelecting={true}
            />
            <TouchableOpacity
              style={styles(theme).ctaContainer}
              onPress={changeLanguageHandler}
            >
              <Text style={styles(theme).ctaText}>{CONFIRM_BUTTON[value]}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default ModalFirstTimeLanguage;
