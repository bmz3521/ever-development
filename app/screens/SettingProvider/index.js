import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BaseStyle } from '@config';
import { Button } from 'react-native-elements';
import { Header, SafeAreaView, ModalUI, CustomBottomSheet } from '@components';
import { useHooks } from './hook';
import i18next from 'i18next';
import styles from './styles';

function SettingProvider({ navigation }) {
  const {
    theme,
    RightHeader,
    Icon,
    listUserOrg,
    isModalVisible,
    bottomSheetRef,
    actions,
  } = useHooks({
    navigation,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <View style={{ backgroundColor: '#E5E5E545', flex: 1 }}>
        <Header
          text={i18next.t('PROFILE_EDIT_ORGANIZATION')}
          onPressLeft={() => {
            navigation.pop();
          }}
          renderRight={() => <RightHeader />}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {listUserOrg.map(value => (
            <ProviderSession
              key={value.id}
              labelData={value}
              theme={theme}
              Icon={Icon}
              onPress={actions.onSelectOrganization.bind(this, value.id)}
            />
          ))}
        </ScrollView>
      </View>
      <CustomBottomSheet ref={bottomSheetRef}>
        <Button
          onPress={actions.onDeleteBottomSheet}
          title={'ลบข้อมูล'}
          style={{ marginBottom: 20 }}
          buttonStyle={{
            backgroundColor: theme.colors.danger,
            borderRadius: 15,
          }}
          titleStyle={{
            fontFamily: theme.fontFamilyBold,
            fontSize: theme.fontSizeDefault,
            paddingVertical: 5,
          }}
        />
      </CustomBottomSheet>
      <ModalUI onCustomUI onOpenModal={isModalVisible}>
        <Text style={styles(theme).modalTitle}>
          {i18next.t('PROFILE_EDIT_DELETEDTITLE')}
        </Text>
        <TouchableOpacity
          style={[
            styles(theme).modalButtonContainer,
            {
              marginTop: 20,
              backgroundColor: theme.colors.danger,
            },
          ]}
          onPress={actions.cacelOrganizationSub}
        >
          <Text style={styles(theme).buttonTextAdd}>
            {i18next.t('PROFILE_EDIT_DELETED_CTA')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(theme).modalButtonContainer,
            {
              marginVertical: 10,
              backgroundColor: theme.colors.greyOutline,
            },
          ]}
          onPress={() => actions.setIsModalVisible(false)}
        >
          <Text style={styles(theme).buttonTextAdd}>
            {i18next.t('CANCEL_BUTTON')}
          </Text>
        </TouchableOpacity>
      </ModalUI>
    </SafeAreaView>
  );
}

const ProviderSession = ({ labelData, theme, Icon, onPress }) => {
  return (
    <View style={styles(theme).SettingSection}>
      <View style={styles(theme).category}>
        <View>
          <View style={styles(theme).RowInfo}>
            <Text style={styles(theme).cText}>{labelData.header}</Text>
            {/** TODO ปิดไว้ก่อนจะเป็น new feature ในอนาคต */}
            {/* <TouchableOpacity onPress={onPress}>
              <Icon
                type="ionicon"
                name="ellipsis-horizontal"
                color={theme.colors.grey2}
                size={25}
              />
            </TouchableOpacity> */}
          </View>
          <View>
            <Text style={styles(theme).cText2}>{labelData.message}</Text>
            <View style={styles(theme).RowText}>
              <Text
                style={[
                  styles(theme).secondCText2,
                  {
                    color:
                      labelData.statusCode === 'pending'
                        ? 'orange'
                        : labelData.statusCode === 'rejected'
                        ? theme.colors.error
                        : theme.colors.secondary,
                  },
                ]}
              >
                {labelData.status}
              </Text>
              {labelData.statusCode === 'pending' && (
                <Text style={styles(theme).cText3}>
                  {' on '} {labelData.updatedAt}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};
export default SettingProvider;
