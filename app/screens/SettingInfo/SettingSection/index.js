import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { useHooks } from '../hook';
import i18next from 'i18next';

const SettingSection = ({ labelData, navigation }) => {
  const { theme, Icon, userInfoData, userAddressInfo } = useHooks();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('ProfileStack', {
          screen: labelData.linkTo,
          params: {
            editType: labelData.type,
          },
        });
      }}
    >
      <View style={styles(theme).SettingSection}>
        <View style={styles(theme).category}>
          <View>
            {labelData.type === 'ProviderOrganize' ? (
              <View style={styles(theme).RowInfo}>
                <Text style={styles(theme).cText}>{labelData.header}</Text>
                <View style={styles(theme).chevronRight}>
                  <Icon
                    name="chevron-right"
                    color={theme.colors.grey4}
                    size={40}
                  />
                </View>
              </View>
            ) : (
              <View style={styles(theme).RowInfo}>
                <Text style={styles(theme).cText}>{labelData.header}</Text>
                <Text style={styles(theme).textSide}>
                  {i18next.t('SETTINGINFO_EDIT')}
                </Text>
              </View>
            )}
            <View>
              {labelData.infoTitle?.map((item, index) => {
                return (
                  <View key={index} style={styles(theme).RowInfo}>
                    <Text style={styles(theme).cText2}>
                      {userInfoData[index]?.isEmail
                        ? i18next.t('SETTINGINFO_EMAIL')
                        : item.title}
                    </Text>
                    <Text
                      ellipsizeMode="middle"
                      lineBreakMode="middle"
                      numberOfLines={1}
                      style={styles(theme).cText3}
                    >
                      {labelData.type !== 'address'
                        ? userInfoData[index].userInfo
                        : userAddressInfo[index].userInfo}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingSection;
